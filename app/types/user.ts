import z from "zod";
import { PrimaryKey, Timestamp } from "./definitions";

export const UserSchema = z.object({
  userId: PrimaryKey,
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),
  email: z.email().min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d).+$/,
      "Password must contain at least one letter and one number",
    )
    .max(100, "Password must be at most 100 characters long"),
  bio: z.string().max(1000).nullable(),
  avatarUrl: z.url().max(255).nullable(),
  createdAt: Timestamp,
  updatedAt: Timestamp,
});

// Used for validating a new user registration input.
export const UserSignUpSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
});

export const UserSignInSchema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const UserUpdateSchema = UserSchema.pick({
  name: true,
  email: true,
  bio: true,
  avatarUrl: true,
});

export type User = z.infer<typeof UserSchema>;
export type UserSignUp = z.infer<typeof UserSignUpSchema>;
export type UserSignIn = z.infer<typeof UserSignInSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
