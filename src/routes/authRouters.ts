import express from "express";

import {
  loginController,
  refreshTokenController,
  registerController,
} from "@/controllers/auth";
const router = express.Router();

router.post("/register", registerController); // register the user
router.post("/login", loginController);
router.post("/refresh-token", refreshTokenController);

export const authRouter = router;
