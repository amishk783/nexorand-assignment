import { NextFunction, Request, Response } from "express";

import Logger from "@/utils/logger";

import { studentSchema } from "@/utils/validationSchema";
import Student from "@/db/schema/Student";
import { z } from "zod";
import { CloudinaryFile, uploadOnCloudinary } from "@/utils/cloudinary";

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validatedData = studentSchema.parse(req.body);
  try {
    const file = req.file as CloudinaryFile;

    const cloudinaryUrl = await uploadOnCloudinary(file);

    const newCard = new Student({
      ...validatedData,

      profileImageUrl: cloudinaryUrl,
    });
    const data = await newCard.save();

    Logger.silly("Student created succesfully");
    res.status(201).json({ message: "Student created succesfully", data });
  } catch (error) {
    Logger.error("Error in createStudent:", error);
    next(error);
  }
};
export const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;
    const totalStudents = await Student.countDocuments();
    const students = await Student.find().skip(skip).limit(limit);

    res.json({
      data: students,
      totalStudents,
      totalPages: Math.ceil(totalStudents / limit),
      currentPage: page,
    });
  } catch (error) {
    Logger.error("Error in getAllStudent:", error);
    next(error);
  }
};

export const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const student = await Student.findOne({ _id: id });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    Logger.error("Error in getStudentById:", error);
    next(error);
  }
};

export const updateStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const file = req.file as CloudinaryFile;

    const validateData = studentSchema.parse(req.body);

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const cloudinaryUrl = await uploadOnCloudinary(file);

    const updatedStudent = await Student.findOneAndUpdate(
      { _id: id },
      { ...validateData, profileImageUrl: cloudinaryUrl },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(updatedStudent);
  } catch (error) {
    Logger.error("Error in updateStudent:", error);
    next(error);
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const deletedStudent = await Student.findOneAndDelete({
      _id: id,
    });
    if (!deletedStudent) {
      return res.status(404).json({ message: "Teachernot found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    Logger.error("Error in deleteStudent:", error);
    next(error);
  }
};
