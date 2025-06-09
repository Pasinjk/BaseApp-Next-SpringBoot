import { z } from "zod";

export const forgetDataValidate = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(1, "Username is required"),
});
