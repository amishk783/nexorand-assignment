import { Response, Request } from "express";
import { teacherValidationSchema } from "@/utils/validationSchema";

import Logger from "@/utils/logger";

import Teachers from "@/db/schema/Teachers";
import { CloudinaryFile, uploadOnCloudinary } from "@/utils/cloudinary";

export const createTeacher = async (req: Request, res: Response) => {
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
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTeacherById = async (req: Request, res: Response) => {
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
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await Teachers.find();
    if (!teachers) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.json(teachers);
  } catch (error) {
    Logger.error("Error in getTeacherById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTeacher = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const validateData = teacherValidationSchema.parse(req.body);
    console.log("🚀 ~ updateTeacher ~ req:", req.file);
    const file = req.file as CloudinaryFile;
    // console.log("🚀 ~ updateTeacher ~ file:", file);
    // console.log("🚀 ~ updateTeacher ~ validateData:", validateData);

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
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTeacher = async (req: Request, res: Response) => {
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
    res.status(500).json({ message: "Internal server error" });
  }
};
