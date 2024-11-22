import jwt, { decode, JwtPayload } from "jsonwebtoken";
import config from "@/config";
import { Response, NextFunction } from "express";
import Logger from "@/utils/logger";
import { AuthenticatedRequest } from "@/types";

export const verifyUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  console.log("🚀 ~ authHeader:", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    Logger.error("No token provided");
    return res.status(401).send("Unauthorized: No token provided");
  }
  console.log("tokenansas", token);
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
        return res.status(403).send("Forbidden: Invalid token");
      }
      console.log("decoded", decoded);
      const { userId } = decoded as JwtPayload;

      req.user = userId;

      Logger.silly("User authenticated successfully");
      next();
    }
  );
};
