"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = __importDefault(require("express"));
const cloudinary_1 = require("@/utils/cloudinary");
const student_1 = require("@/controllers/student");
const router = express_1.default.Router();
router.post("/", cloudinary_1.upload.single("image"), student_1.createStudent);
// router.get("/", getAllCards);
// router.get("/:id", getCardById);
// router.put("/", updateCard);
// router.delete("/:id", deleteCard);
exports.studentRouter = router;
//# sourceMappingURL=studentRouter.js.map