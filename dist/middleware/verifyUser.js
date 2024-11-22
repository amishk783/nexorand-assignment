"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("@/config"));
const logger_1 = __importDefault(require("@/utils/logger"));
const verifyUser = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("🚀 ~ authHeader:", authHeader);
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        logger_1.default.error("No token provided");
        return res.status(401).send("Unauthorized: No token provided");
    }
    console.log("tokenansas", token);
    jsonwebtoken_1.default.verify(token, config_1.default.accessTokenSecret, (error, decoded) => {
        console.log(error);
        if (error) {
            logger_1.default.error("Invalid token");
            return res.status(403).send("Forbidden: Invalid token");
        }
        console.log("decoded", decoded);
        const { userId } = decoded;
        req.user = userId;
        logger_1.default.silly("User authenticated successfully");
        next();
    });
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=verifyUser.js.map