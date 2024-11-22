"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = __importDefault(require("express"));
const profile_1 = require("@/controllers/profile");
const router = express_1.default.Router();
router.get("/", profile_1.getProfile);
router.put("/", profile_1.updateProfile);
exports.profileRouter = router;
//# sourceMappingURL=profileRouter.js.map