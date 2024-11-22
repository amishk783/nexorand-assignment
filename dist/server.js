"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./config/index"));
const logger_1 = __importDefault(require("./utils/logger"));
const studentRouter_1 = require("./routes/studentRouter");
const db_1 = require("./db");
const app = (0, express_1.default)();
if (index_1.default.nodeEnv === "production") {
    app.use((0, helmet_1.default)());
}
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
if (index_1.default.nodeEnv !== "test") {
    app.use((0, morgan_1.default)(index_1.default.nodeEnv === "production" ? "combined" : "dev"));
}
// app.use(config.apiBasePath);
// app.use("/auth", authRouter);
// app.use("/profile", verifyUser, profileRouter);
// app.use("/workspace", verifyUser, workspaceRouter);
app.use("/student", studentRouter_1.studentRouter);
const server = app.listen(index_1.default.port, () => {
    (0, db_1.main)().catch((error) => error);
    logger_1.default.info(`
      ################################################
      🛡️  Server listening on port: ${index_1.default.port} 🛡️
      ################################################`).on("error", (err) => {
        logger_1.default.error(err);
        process.exit(1);
    });
});
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log("New connection");
});
//# sourceMappingURL=server.js.map