import express from "express";

import { loginController, register } from "@/controllers/auth";
const router = express.Router();

router.post("/register", register); // register the user
router.post("/login", loginController);
// router.post("/refresh-token", refreshTokenController);

export const authRouter = router;
