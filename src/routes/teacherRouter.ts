import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
} from "@/controllers/teacher";
import { upload } from "@/utils/cloudinary";

import express from "express";

const router = express.Router();

router.post("/", upload.single("image"), createTeacher);
router.get("/:id", getTeacherById);
router.put("/:id", upload.single("image"), updateTeacher);
router.delete("/:id", deleteTeacher);
router.get("/", getAllTeachers);

export const teacherRouter = router;
