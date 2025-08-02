import { z } from "zod";

export const ForgetPasswordSchema = z.object({
  email: z.email(),
});

export type ForgetPasswordSchemaType = z.infer<typeof ForgetPasswordSchema>;
