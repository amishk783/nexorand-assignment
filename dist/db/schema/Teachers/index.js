"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const teacherSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: { type: Schema.Types.ObjectId, unique: true, required: true },
    profileImageUrl: {
        type: String,
        trim: true,
        default: null,
    },
    subject: {
        type: String,
        trim: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
teacherSchema.pre("save", function (next) {
    this.updatedAt = new Date(Date.now());
    next();
});
const Teachers = model("Teachers", teacherSchema);
exports.default = Teachers;
//# sourceMappingURL=index.js.map