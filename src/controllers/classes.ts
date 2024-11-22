import { Response, Request, NextFunction } from "express";

import { classesScehma } from "@/utils/validationSchema";

import Classes from "@/db/schema/Class";
import Logger from "@/utils/logger";
import { z } from "zod";

export const createClasses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validatedData = classesScehma.parse(req.body);

  try {
    const newCard = new Classes({
      ...validatedData,
    });
    const data = await newCard.save();

    Logger.silly("Student created succesfully");
    res.status(201).json({ message: "Student created succesfully", data });
  } catch (error) {
    Logger.error("Error in createStudent:", error);
    next(error);
  }
};
export const getAllClasses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;
    const totalClasses = await Classes.countDocuments();

    const classes = await Classes.find().skip(skip).limit(limit);
    if (!classes) {
      return res.status(404).json({ message: "Classes not found" });
    }
    res.json({
      data: classes,
      totalClasses,
      totalPages: Math.ceil(totalClasses / limit),
      currentPage: page,
    });
  } catch (error) {
    Logger.error("Error in getAllClasses:", error);
    next(error);
  }
};
export const updateClasses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validatedData = classesScehma.parse(req.body);

  const { id } = req.params;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const updatedClasses = await Classes.findOneAndUpdate(
      { _id: id },
      { ...validatedData },
      { new: true, runValidators: true }
    );
    if (!updatedClasses) {
      return res.status(404).json({ message: "Classes not found" });
    }
    res.json(updatedClasses);
  } catch (error) {
    Logger.error("Error in login:", error);
    next(error);
  }
};

export const deleteClasses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const deletedClasses = await Classes.findOneAndDelete({
      _id: id,
    });
    if (!deletedClasses) {
      return res.status(404).json({ message: "Classes not found" });
    }
    res.json({ message: "Classes deleted successfully", deletedClasses });
  } catch (error) {
    Logger.error("Error in deleteClasses:", error);
    next(error);
  }
};
