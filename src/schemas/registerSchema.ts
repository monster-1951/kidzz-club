import { z } from "zod";
import { passwordSchema } from "./loginSchema"; // Ensure you have a valid passwordSchema for reuse

export const registerSchema = z
  .object({
    UserName: z.string().min(1, "Username is required"),
    Location: z.string().min(1, "Where are you from?"),
    ParentName: z.string().min(1, "Parent name is required"),
    Gender: z.enum(["Male", "Female"]),
    ParentGender: z.enum(["Male", "Female"]),
    ParentEmail: z.string().email("Invalid email format"),
    ParentMobileNumber: z
      .string()
      .length(10, "Enter a valid mobile number")
      .optional(),
    Password: passwordSchema,
    ConfirmPassword: passwordSchema,
    DateOfBirth: z.string({
      required_error: "When did your child enter your life?",
    }),
    ParentPassword: passwordSchema,
    ConfirmParentPassword: passwordSchema,
    ParentDateOfBirth: z
      .string({ required_error: "How long have you been on this Earth?" })
      .optional(),
    HobbiesAndInterests: z.string(),
  })
  .refine(
    (data) =>
      data.Password === data.ConfirmPassword &&
      data.ParentPassword === data.ConfirmParentPassword,
    {
      message: "Password and confirm password must be the same",
      path: ["ConfirmPassword"],
    }
  );
