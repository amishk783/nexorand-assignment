"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const studentSchema = new Schema({
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
    classID: { type: Schema.Types.ObjectId, ref: "Class", required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
studentSchema.pre("save", function (next) {
    this.updatedAt = new Date(Date.now());
    next();
});
const Student = model("Students", studentSchema);
exports.default = Student;
//# sourceMappingURL=index.js.map