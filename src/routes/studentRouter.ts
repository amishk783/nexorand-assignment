import express from "express";
import { upload, uploadOnCloudinary } from "@/utils/cloudinary";
import { createStudent } from "@/controllers/student";
const router = express.Router();

router.post("/", upload.single("image"), createStudent);

// router.get("/", getAllCards);
// router.get("/:id", getCardById);
// router.put("/", updateCard);
// router.delete("/:id", deleteCard);

export const studentRouter = router;
