import express from "express";

import { createClasses } from "@/controllers/classes";

const router = express.Router();

router.post("/", createClasses);
// router.put("/", updateProfile);

export const classesRouter = router;
