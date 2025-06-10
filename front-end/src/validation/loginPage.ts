import { z } from "zod";

export const forgetPasswordSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  detail: z.string().optional(),
});
