"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workspaceValidationSchema = exports.profileValidationSchema = exports.updatedListValidationSchema = exports.listValidationSchema = exports.boardScehma = exports.updateTaskSchema = exports.studentSchema = exports.refreshTokenSchema = exports.loginSchema = exports.registerSchema = void 0;
const z = __importStar(require("zod"));
exports.registerSchema = z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(8),
});
exports.loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
exports.refreshTokenSchema = z.object({
    refreshToken: z.string(),
});
exports.studentSchema = z.object({
    name: z.string().min(1, "Name is required"),
    profileImage: z.string().optional(),
    classId: z.string().optional(),
    email: z.string().min(1, "Email is required"),
});
exports.updateTaskSchema = z.object({
    _id: z.string().min(1, "Task Id is required"),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.string().optional(),
    boardId: z.string().min(1, "Board Id is required").optional(),
    listId: z.string().min(1, "List Id is required"),
    deadline: z.coerce.string().transform(Date).optional(),
    priority: z.string().optional(),
});
exports.boardScehma = z.object({
    name: z.string().min(1, "Board name is required"),
    workspaceId: z.string().min(1, "Workspace Id is required"),
});
exports.listValidationSchema = z.object({
    name: z.string().min(1, "List name is required"),
    position: z.number().optional(),
    boardId: z.string().min(1, "Board Id is required"),
});
exports.updatedListValidationSchema = z.object({
    name: z.string().min(1, "List name is required"),
    position: z.number().optional(),
    boardId: z.string().min(1, "Board Id is required"),
    listId: z.string().min(1, "List Id is required"),
});
exports.profileValidationSchema = z.object({
    name: z.string().optional(),
    avatar: z.string().optional(),
    bio: z.string().optional(),
    company: z.string().optional(),
    jobtitle: z.string().optional(),
    location: z.string().optional(),
    socialLinks: z
        .object({
        linkedin: z.string().url().optional(),
        twitter: z.string().url().optional(),
        github: z.string().url().optional(),
    })
        .optional(),
});
exports.workspaceValidationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
});
//# sourceMappingURL=validationSchema.js.map