import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import config from "./config/index";
import Logger from "./utils/logger";
import { verifyUser } from "./middleware/verifyUser";
import { classesRouter } from "./routes/classesRouter";
import { studentRouter } from "./routes/studentRouter";
import { main } from "./db";
import { teacherRouter } from "./routes/teacherRouter";

const app = express();

if (config.nodeEnv === "production") {
  app.use(helmet());
}

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

if (config.nodeEnv !== "test") {
  app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));
}

// app.use(config.apiBasePath);

// app.use("/auth", authRouter);
app.use("/teacher", teacherRouter);
app.use("/classes", classesRouter);

app.use("/student", studentRouter);

app.listen(config.port, () => {
  main().catch((error) => error);
  Logger.info(
    `
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################`
  ).on("error", (err) => {
    Logger.error(err);
    process.exit(1);
  });
});
