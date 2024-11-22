"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("@/controllers/auth");
const router = express_1.default.Router();
router.post("/register", auth_1.registerController); // register the user
router.post("/login", auth_1.loginController);
router.post("/refresh-token", auth_1.refreshTokenController);
exports.authRouter = router;
//# sourceMappingURL=authRouters.js.map