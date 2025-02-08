import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(2, "Password must be atleast 8 characters long");

export const loginSchema = z.object({
    identifier : z.string({ message: "Enter valid email address or UserName" }),
    password:passwordSchema,
})