import express from "express";
import { upload, uploadOnCloudinary } from "@/utils/cloudinary";
import {
  createStudent,
  deleteStudent,
  getAllStudent,
  getStudentById,
  updateStudent,
} from "@/controllers/student";
const router = express.Router();

router.post("/", upload.single("image"), createStudent);

router.get("/", getAllStudent);
router.get("/:id", getStudentById);
router.put("/:id", upload.single("image"), updateStudent);
router.delete("/:id", deleteStudent);

export const studentRouter = router;
