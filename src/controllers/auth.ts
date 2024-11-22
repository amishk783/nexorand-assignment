import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "@/utils/validationSchema";
import Logger from "@/utils/logger";
import User from "@/db/schema/User";
import config from "@/config";
import Session from "@/db/schema/Session";
import { z } from "zod";

export const register = async (req: Request, res: Response) => {
  try {
    console.log("🚀 ~ register ~ req:", req.body);
    const validatedData = registerSchema.parse(req.body);

    const exisitngUser = await User.findOne({ email: validatedData.email });
    if (exisitngUser) {
      Logger.error("User Alreaddy exits");
      return res.status(400).json({ message: "User already exits" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    const newUser = await new User({
      username: validatedData.username,
      email: validatedData.email,
      hashedPassword,
    });

    const user = await newUser.save();

    const accessToken = jwt.sign(
      { userId: newUser._id },
      config.accessTokenSecret,
      { expiresIn: config.accessTokenExpiry }
    );
    const refreshToken = jwt.sign(
      { userId: newUser._id },
      config.refreshTokenSecret,
      { expiresIn: config.refreshTokenExpiry }
    );

    const session = new Session({ userId: newUser._id, refreshToken });
    const mutatedUser = {
      username: user.username,
      email: user.email,
    };
    Logger.silly("User created Successfully");
    res.status(200).json({
      message: "User created successfully",
      session: { refreshToken: session.refreshToken, accessToken: accessToken },
      user: mutatedUser,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      Logger.error("Validation error in singup:", error.errors);
      res.status(400).json({ errors: error.errors, message: error.message });
    } else {
      Logger.error("Error in login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await User.findOne({ email: validatedData.email });

    if (!user) {
      Logger.error("User does not exits");
      return res.status(400).json({ message: "User does not exits" });
    }
    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.hashedPassword
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      config.accessTokenSecret,
      { expiresIn: config.accessTokenExpiry }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      config.refreshTokenSecret,
      { expiresIn: config.refreshTokenExpiry }
    );

    const session = new Session({ userId: user._id, refreshToken });

    res.status(200).json({
      message: "Login successful",
      session: {
        refreshToken: session.refreshToken,
        accessToken: accessToken,
      },
      user: { email: user.email, username: user.username },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      Logger.error("Validation error in login:", error.errors);
      res.status(400).json({ errors: error.errors });
    } else {
      Logger.error("Error in login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken;
    await Session.findOneAndDelete({ refreshToken });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    Logger.error("Error in logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = refreshTokenSchema.parse(req.body);

    const session = await Session.findOne({ refreshToken });

    if (!session) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
      const payload = decoded as JwtPayload;
      if (!payload.userId) {
        return res.status(403).json({ message: "Invalid token payload" });
      }
      const accessToken = jwt.sign(
        { userId: payload.userId },
        config.accessTokenSecret,
        { expiresIn: config.accessTokenExpiry }
      );
      res.json({ accessToken });
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      Logger.error("Validation error in refreshToken:", error.errors);
      res.status(400).json({ errors: error.errors });
    } else {
      Logger.error("Error in refreshToken:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
