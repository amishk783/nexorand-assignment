"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRouter = void 0;
const list_1 = require("@/controllers/board/list");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/", list_1.createList);
router.get("/", list_1.getAllList);
router.get("/:id", list_1.getListById);
router.put("/:id", list_1.updateList);
router.delete("/:id", list_1.deleteList);
exports.listRouter = router;
//# sourceMappingURL=listRouter.js.map