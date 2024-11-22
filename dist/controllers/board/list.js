"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteList = exports.updateList = exports.getListById = exports.getAllList = exports.createList = void 0;
const validationSchema_1 = require("@/utils/validationSchema");
const List_1 = __importDefault(require("@/db/schema/List"));
const logger_1 = __importDefault(require("@/utils/logger"));
const zod_1 = require("zod");
const createList = async (req, res) => {
    const validateData = validationSchema_1.listValidationSchema.parse(Object.assign({}, req.body));
    try {
        const newList = new List_1.default(Object.assign({ board_id: validateData.boardId }, validateData));
        const savedList = await newList.save();
        logger_1.default.silly("List created succesfully");
        res.status(201).json({ message: "List created succesfully", savedList });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            logger_1.default.error("Validation error in createList:", error.errors);
            return res.status(400).json({ errors: error.errors });
        }
        logger_1.default.error("Error in createList:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createList = createList;
const getAllList = async (req, res) => {
    const { boardId } = req.query;
    try {
        const lists = await List_1.default.find({ board_id: boardId });
        res.json(lists);
    }
    catch (error) {
        logger_1.default.error("Error in getAllList:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllList = getAllList;
const getListById = async (req, res) => {
    try {
        const { ListId, boardId } = req.query;
        console.log("🚀 ~ getListById ~ boardId:", boardId);
        const list = await List_1.default.findOne({ _id: ListId, board_id: boardId });
        if (!list) {
            return res.status(404).json({ message: "List not found" });
        }
        res.json(list);
    }
    catch (error) {
        logger_1.default.error("Error in getListById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getListById = getListById;
const updateList = async (req, res) => {
    try {
        const { id } = req.params;
        const validateData = validationSchema_1.listValidationSchema.parse(req.body);
        const updatedList = await List_1.default.findOneAndUpdate({ _id: id, board_id: validateData.boardId }, validateData, { new: true, runValidators: true });
        if (!updatedList) {
            return res.status(404).json({ message: "List not found" });
        }
        res.json(updatedList);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            logger_1.default.error("Validation error in updateTask:", error.errors);
            return res.status(400).json({ errors: error.errors });
        }
        logger_1.default.error("Error in updateList:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateList = updateList;
const deleteList = async (req, res) => {
    const { boardId, ListId } = req.query;
    try {
        const deletedList = await List_1.default.findOneAndDelete({
            _id: ListId,
            board_id: boardId,
        });
        if (!deletedList) {
            return res.status(404).json({ message: "List not found" });
        }
        res.json({ message: "List deleted successfully" });
    }
    catch (error) {
        logger_1.default.error("Error in deleteList:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteList = deleteList;
//# sourceMappingURL=list.js.map