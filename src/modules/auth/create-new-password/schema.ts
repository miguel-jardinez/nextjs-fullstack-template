import { z } from "zod";

export const CreateNewPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    token: z.string().nonempty("Token is required"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CreateNewPasswordSchemaType = z.infer<
  typeof CreateNewPasswordSchema
>;
