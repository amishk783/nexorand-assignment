"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCard = exports.updateCard = exports.getCardById = exports.getAllCards = exports.createStudent = void 0;
const logger_1 = __importDefault(require("@/utils/logger"));
const validationSchema_1 = require("@/utils/validationSchema");
const Student_1 = __importDefault(require("@/db/schema/Student"));
const zod_1 = require("zod");
const cloudinary_1 = require("@/utils/cloudinary");
const createStudent = async (req, res) => {
    const validatedData = validationSchema_1.studentSchema.parse(req.body);
    try {
        const file = req.file;
        const cloudinaryUrl = await (0, cloudinary_1.uploadOnCloudinary)(file);
        console.log("🚀 ~ createStudent ~ cloudinaryUrl:", cloudinaryUrl);
        const newCard = new Student_1.default(Object.assign({}, validatedData));
        const data = await newCard.save();
        logger_1.default.silly("Student created succesfully");
        res.status(201).json({ message: "Student created succesfully", data });
    }
    catch (error) {
        logger_1.default.error("Error in createStudent:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createStudent = createStudent;
const getAllCards = async (req, res) => {
    const { boardId } = req.query;
    console.log("🚀 ~ getAllCards~ board:", boardId);
    try {
        const cards = await Card.find({ user_id: req.user, board_id: boardId });
        console.log("🚀 ~ getAllCards ~ tasks:", cards);
        res.json(cards);
    }
    catch (error) {
        logger_1.default.error("Error in getAllCards:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllCards = getAllCards;
const getCardById = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await Card.findOne({ _id: id, user_id: req.user });
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.json(card);
    }
    catch (error) {
        logger_1.default.error("Error in getCardById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getCardById = getCardById;
const updateCard = async (req, res) => {
    try {
        const validateData = validationSchema_1.updateTaskSchema.parse(req.body);
        const updatedCard = await Card.findOneAndUpdate({ _id: validateData._id, user_id: req.user }, Object.assign(Object.assign({}, validateData), { list_id: validateData.listId }), { new: true, runValidators: true });
        if (!updatedCard) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.json(updatedCard);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            logger_1.default.error("Validation error in updateCard :", error.errors);
            return res.status(400).json({ errors: error.errors });
        }
        logger_1.default.error("Error in updateCard:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateCard = updateCard;
const deleteCard = async (req, res) => {
    try {
        const deletedCard = await Card.findOneAndDelete({
            _id: req.params.id,
            user_id: req.user,
        });
        if (!deletedCard) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.json({ message: "Card deleted successfully" });
    }
    catch (error) {
        logger_1.default.error("Error in deleteCard:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteCard = deleteCard;
//# sourceMappingURL=student.js.map