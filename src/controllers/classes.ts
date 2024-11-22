import { Response, Request } from "express";

import { classesScehma } from "@/utils/validationSchema";
import { AuthenticatedRequest } from "@/types";
import { z } from "zod";
import Classes from "@/db/schema/Class";
import Logger from "@/utils/logger";

export const createClasses = async (req: Request, res: Response) => {
  const validatedData = classesScehma.parse(req.body);

  try {
    const newCard = new Classes({
      ...validatedData,
    });
    const data = await newCard.save();

    Logger.silly("Student created succesfully");
    res.status(201).json({ message: "Student created succesfully", data });
  } catch (error) {
    Logger.error("Error in createStudent:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


