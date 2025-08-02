import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
