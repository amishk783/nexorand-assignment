"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const sessionSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    refreshToken: {
        type: String,
        required: true,
        validUpto: Date,
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
sessionSchema.pre("save", function (next) {
    this.updatedAt = new Date(Date.now());
    next();
});
const Session = model("Session", sessionSchema);
exports.default = Session;
//# sourceMappingURL=index.js.map