import config from "@/config";

import mongoose, { ConnectOptions } from "mongoose";

export const main = async () => {
  try {
    await mongoose.connect(config.databaseURL);

    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};
