import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
const envFound = dotenv.config();

interface ServerConfig {
  nodeEnv: string;
  port: number;
  databaseURL: string;
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
  apiBasePath: string;
  logs: { level: string };
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const config: ServerConfig = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000"),
  databaseURL: process.env.DATABASE_URI || "",
  apiBasePath: process.env.API_BASE_PATH || "/api",
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "",
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || "",
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || "",
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
};
export default config;
