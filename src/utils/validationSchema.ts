import * as z from "zod";

export const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});
export const studentSchema = z.object({
  name: z.string().min(1, "Student Name is required"),
  profileImage: z.string().optional(),
  classId: z.string().optional(),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
});

export const updateStudentSchema = z.object({
  name: z.string().min(1, "Student Name is required"),
  profileImage: z.string().optional(),
  classID: z.string().optional(),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
});
export const classesScehma = z.object({
  name: z.string().min(1, "Class name is required"),
  teacherId: z.string().min(1, "Teacher Id is required"),
  studentCount: z.string().min(1, "student count is required"),
});

export const teacherValidationSchema = z.object({
  name: z.string().min(1, "Teacher Name is required"),
  email: z.string().min(1, "Teacher email is required"), // Fixed typo
  profileImage: z.string().optional(),
  subject: z.string().min(1, "Teacher subject is required"),
});
