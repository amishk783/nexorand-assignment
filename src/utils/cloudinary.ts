import multer, { Multer } from "multer";
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

import sharp from "sharp";

import Logger from "./logger";
import { AppError } from "./AppError";
const storage = multer.memoryStorage();
export interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer;
}
export const upload: Multer = multer({ storage: storage });

export const uploadOnCloudinary = async (file: CloudinaryFile) => {
  try {
    if (!file) {
      throw new AppError("No file provided", 401);
    }
    const processedImage: Buffer = await sharp(file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toBuffer();

    const cloudinaryResponse: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        {
          cloudinary.uploader
            .upload_stream({ folder: "uploads" }, (error, result) => {
              if (error) {
                reject(error);
              } else if (!result) {
                reject(new AppError("Error uploading file", 404));
              } else {
                resolve(result); // Ensure resolve only receives valid result
              }
            })
            .end(processedImage);
        }
      }
    );
    Logger.silly("File uploaded sccuessfully");
    return cloudinaryResponse.secure_url;
  } catch (error) {
    Logger.error("Error uploading file:", error);
    throw new AppError("Error uploading file", 403);
  }
};
