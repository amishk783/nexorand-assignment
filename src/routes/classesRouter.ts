import express from "express";

import {
  createClasses,
  deleteClasses,
  getAllClasses,
  updateClasses,
} from "@/controllers/classes";

const router = express.Router();

router.post("/", createClasses);
router.put("/:id", updateClasses);
router.get("/", getAllClasses);
router.delete("/:id", deleteClasses);

export const classesRouter = router;
