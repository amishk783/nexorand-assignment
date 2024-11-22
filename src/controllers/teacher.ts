import { Response, Request, NextFunction } from "express";
import { teacherValidationSchema } from "@/utils/validationSchema";

import Logger from "@/utils/logger";

import Teachers from "@/db/schema/Teachers";
import { CloudinaryFile, uploadOnCloudinary } from "@/utils/cloudinary";

export const createTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateData = teacherValidationSchema.parse(req.body);

  try {
    const file = req.file as CloudinaryFile;
    const cloudinaryUrl = await uploadOnCloudinary(file);
    const newTeacher = new Teachers({
      ...validateData,
      profileImageUrl: cloudinaryUrl,
    });
    const savedTeacher = await newTeacher.save();

    Logger.silly("Teacher created succesfully");
    res
      .status(201)
      .json({ message: "Teacher created succesfully", savedTeacher });
  } catch (error) {
    Logger.error("Error in createTeacher:", error);
    next(error);
  }
};

export const getTeacherById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const teacher = await Teachers.findOne({ _id: id });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(teacher);
  } catch (error) {
    Logger.error("Error in getTeacherById:", error);
    next(error);
  }
};
export const getAllTeachers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;
    const totalTeachers = await Teachers.countDocuments();
    const teachers = await Teachers.find().skip(skip).limit(limit);
    if (!teachers) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json({
      data: teachers,
      totalTeachers,
      totalPages: Math.ceil(totalTeachers / limit),
      currentPage: page,
    });
  } catch (error) {
    Logger.error("Error in getTeacherById:", error);
    next(error);
  }
};

export const updateTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const validateData = teacherValidationSchema.parse(req.body);

    const file = req.file as CloudinaryFile;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const cloudinaryUrl = await uploadOnCloudinary(file);

    const updatedTeacher = await Teachers.findOneAndUpdate(
      { _id: id },
      { ...validateData, profileImageUrl: cloudinaryUrl },
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(updatedTeacher);
  } catch (error) {
    Logger.error("Error in updateTeacher:", error);
    next(error);
  }
};

export const deleteTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const deletedTeacher = await Teachers.findOneAndDelete({
      _id: id,
    });
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teachernot found" });
    }
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    Logger.error("Error in deleteTeacher:", error);
    next(error);
  }
};
