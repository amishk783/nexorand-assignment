"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const classSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    teacerId: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
    profileImageUrl: {
        type: String,
        trim: true,
        default: null,
    },
    studentCount: { type: Schema.Types.ObjectId, default: 0 },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
classSchema.pre("save", function (next) {
    this.updatedAt = new Date(Date.now());
    next();
});
const Classes = model("Classes", classSchema);
exports.default = Classes;
//# sourceMappingURL=index.js.map