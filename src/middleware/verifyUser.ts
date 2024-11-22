import jwt, { decode, JwtPayload } from "jsonwebtoken";
import config from "@/config";
import { Response, NextFunction } from "express";
import Logger from "@/utils/logger";
import { AuthenticatedRequest } from "@/types";
import { AppError } from "@/utils/AppError";

export const verifyUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    Logger.error("No token provided");
    throw new AppError("Unauthorized: No token provided", 401);
  }
  jwt.verify(
    token,
    config.accessTokenSecret,
    (
      error: jwt.VerifyErrors | null,
      decoded: jwt.JwtPayload | string | undefined
    ) => {
      console.log(error);
      if (error) {
        Logger.error("Invalid token");
        throw new AppError("Forbidden: Invalid token", 403);
      }

      const { userId } = decoded as JwtPayload;

      req.user = userId;

      Logger.silly("User authenticated successfully");
      next(error);
    }
  );
};
