import { NextFunction, Request, Response } from "express";

import Logger from "@/utils/logger";
import { AuthenticatedRequest } from "@/types";
import { studentSchema } from "@/utils/validationSchema";
import Student from "@/db/schema/Student";
import { z } from "zod";
import { CloudinaryFile, uploadOnCloudinary } from "@/utils/cloudinary";
import mongoose from "mongoose";

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validatedData = studentSchema.parse(req.body);

  try {
    const file = req.file as CloudinaryFile;
    const classID = new mongoose.Types.ObjectId("");
    const cloudinaryUrl = await uploadOnCloudinary(file);

    const newCard = new Student({
      ...validatedData,
      classID,
      profileImageUrl: cloudinaryUrl,
    });
    const data = await newCard.save();

    Logger.silly("Student created succesfully");
    res.status(201).json({ message: "Student created succesfully", data });
  } catch (error) {
    Logger.error("Error in createStudent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllCards = async (req: AuthenticatedRequest, res: Response) => {
  const { boardId } = req.query;
  console.log("🚀 ~ getAllCards~ board:", boardId);
  try {
    const cards = await Card.find({ user_id: req.user, board_id: boardId });
    console.log("🚀 ~ getAllCards ~ tasks:", cards);
    res.json(cards);
  } catch (error) {
    Logger.error("Error in getAllCards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

