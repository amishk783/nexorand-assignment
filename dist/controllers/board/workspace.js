"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.updateBoard = exports.getAllWorkspaces = exports.getBoardById = exports.createWorkspace = void 0;
const validationSchema_1 = require("@/utils/validationSchema");
const Board_1 = __importDefault(require("@/db/schema/Board"));
const logger_1 = __importDefault(require("@/utils/logger"));
const zod_1 = require("zod");
const Profile_1 = __importDefault(require("@/db/schema/Profile"));
const Workspace_1 = __importDefault(require("@/db/schema/Workspace"));
const createWorkspace = async (req, res) => {
    try {
        const validateData = validationSchema_1.workspaceValidationSchema.parse(req.body);
        const user = req.user;
        const profile = await Profile_1.default.findOne({
            user_id: req.user,
        });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        const newWorkspace = await new Workspace_1.default(Object.assign({}, validateData));
        newWorkspace.members.push({ role: "admin", profile: profile._id });
        const data = await newWorkspace.save();
        logger_1.default.silly("Workspace created succesfully");
        res.status(201).json({ message: "Workspace created succesfully", data });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            logger_1.default.error("Validation error in createWorkspace:", error.errors);
            return res.status(400).json({ errors: error.errors });
        }
        logger_1.default.error("Error in createWorkspace:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createWorkspace = createWorkspace;
const getBoardById = async (req, res) => {
    try {
        const { id: boardId } = req.params;
        const profile = await Profile_1.default.findOne({
            user_id: req.user,
        });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        const board = await Board_1.default.findById({
            _id: boardId,
            profile_id: profile._id,
        });
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }
        res.json(board);
    }
    catch (error) {
        logger_1.default.error("Error in getTaskById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getBoardById = getBoardById;
const getAllWorkspaces = async (req, res) => {
    try {
        const profile = await Profile_1.default.findOne({
            user_id: req.user,
        });
        console.log("🚀 ~ profile:", profile);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        const workspaces = await Workspace_1.default.find({ "members.profile": profile._id });
        console.log("🚀 ~ workspaces:", workspaces);
        res.json(workspaces);
    }
    catch (error) {
        logger_1.default.error("Error in getAllWorkspaces:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllWorkspaces = getAllWorkspaces;
const updateBoard = async (req, res) => {
    try {
        const { id: boardId } = req.params;
        const validateData = validationSchema_1.workspaceValidationSchema.parse(req.body);
        const profile = await Profile_1.default.findOne({
            user_id: req.user,
        });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        const updatedBoard = await Board_1.default.findOneAndUpdate({ _id: boardId, profile_id: profile._id }, validateData, { new: true, runValidators: true });
        if (!updatedBoard) {
            return res.status(404).json({ message: "Board not found" });
        }
        res.json(updatedBoard);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            logger_1.default.error("Validation error in updateBoard:", error.errors);
            return res.status(400).json({ errors: error.errors });
        }
        logger_1.default.error("Error in updateBoard:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateBoard = updateBoard;
const deleteBoard = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(500).json({ message: "Id is not provided" });
    }
    const profile = await Profile_1.default.findOne({
        user_id: req.user,
    });
    if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
    }
    try {
        const deletedBoard = await Board_1.default.findOneAndDelete({
            _id: id,
            profile_id: profile._id,
        });
        if (!deletedBoard) {
            return res.status(404).json({ message: "Board not found" });
        }
        res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        logger_1.default.error("Error in deleteTask:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteBoard = deleteBoard;
//# sourceMappingURL=workspace.js.map