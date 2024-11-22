"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOnCloudinary = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const sharp_1 = __importDefault(require("sharp"));
const logger_1 = __importDefault(require("./logger"));
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage: storage });
const uploadOnCloudinary = async (file) => {
    try {
        if (!file) {
            throw new Error("No file provided");
        }
        const processedImage = await (0, sharp_1.default)(file.buffer)
            .toFormat("jpeg")
            .jpeg({ quality: 80 })
            .toBuffer();
        const cloudinaryResponse = await new Promise((resolve, reject) => {
            {
                cloudinary_1.v2.uploader
                    .upload_stream({ folder: "uploads" }, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else if (!result) {
                        reject(new Error("Upload failed, result is undefined"));
                    }
                    else {
                        resolve(result); // Ensure resolve only receives valid result
                    }
                })
                    .end(processedImage);
            }
        });
        logger_1.default.silly("File uploaded sccuessfully");
        return cloudinaryResponse.secure_url;
    }
    catch (error) {
        logger_1.default.error("Error uploading file:", error);
        throw new Error("Error uploading file");
    }
};
exports.uploadOnCloudinary = uploadOnCloudinary;
//# sourceMappingURL=cloudinary.js.map