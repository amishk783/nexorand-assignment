"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspaceRouter = void 0;
const workspace_1 = require("@/controllers/board/workspace");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/", workspace_1.createWorkspace);
router.get("/", workspace_1.getAllWorkspaces);
router.get("/:id", workspace_1.getBoardById);
router.put("/:id", workspace_1.updateBoard);
router.delete("/:id", workspace_1.deleteBoard);
exports.workspaceRouter = router;
//# sourceMappingURL=workspaceRouter.js.map