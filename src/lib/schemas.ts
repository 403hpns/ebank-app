import { z } from "zod";

// Login

export const loginFormSchema = z.object({
  login: z.string().min(4, "Login must be at least 4 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Register
export const registerSchema = z
  .object({
    login: z
      .string()
      .min(4, "Login must be at least 4 characters")
      .max(12, "Max length must be less than 12 characters")
      .trim(),
    email: z.string().email(),
    password: z.string().min(8, "Passwords must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Passwords must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Bank account

export const accountSchema = z.object({
  accountName: z.string().min(1, "This field is required"),
});

// Card

export const cardSchema = z.object({
  name: z
    .string()
    .min(2, { message: "This field must contain at least 2 characters" })
    .max(20, { message: "This field can contain up to 20 characters" }),
  ccv: z.string(),
  color: z.enum(["black", "purple", "blue"]),
  number: z.string(),
  expiryDate: z.date(),
  active: z.boolean(),
  bankAccount: z.string(),
});

export const newCardSchema = z.object({
  bankAccount: z.string(),
  name: z
    .string()
    .min(2, { message: "This field must contain at least 2 characters" })
    .max(20, { message: "This field can contain up to 20 characters" }),
});

export type NewCardSchema = z.infer<typeof newCardSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type RegisterFormSchema = z.infer<typeof registerSchema>;
export type AccountSchema = z.infer<typeof accountSchema>;
export type CardDetails = z.infer<typeof cardSchema>;
