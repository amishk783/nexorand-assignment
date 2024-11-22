"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const config_1 = __importDefault(require("@/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const main = async () => {
    try {
        await mongoose_1.default.connect(config_1.default.databaseURL);
        console.log("Database connected successfully");
    }
    catch (err) {
        console.error("Database connection error:", err);
    }
};
exports.main = main;
//# sourceMappingURL=index.js.map