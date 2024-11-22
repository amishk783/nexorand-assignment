"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardRouter = void 0;
const board_1 = require("@/controllers/board/board");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/", board_1.createBoard);
router.get("/", board_1.getAllBoards);
router.get("/:id", board_1.getBoardById);
router.put("/:id", board_1.updateBoard);
router.delete("/:id", board_1.deleteBoard);
exports.boardRouter = router;
//# sourceMappingURL=boardRouter.js.map