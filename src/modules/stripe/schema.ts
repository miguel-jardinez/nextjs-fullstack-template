import { z } from "zod";

export const getOneSchema = z.object({
  id: z.string(),
});

export const createSchema = z.object({
  pricing: z.number(),
  type: z.enum(["monthly", "yearly"]),
  plan: z.string(),
});

export const updateSchema = z
  .object({
    id: z.string(),
  })
  .extend(createSchema.shape);

export const deleteSchema = z.object({
  id: z.string(),
});

export type CreateSchema = z.infer<typeof createSchema>;
export type UpdateSchema = z.infer<typeof updateSchema>;
export type DeleteSchema = z.infer<typeof deleteSchema>;
export type GetOneSchema = z.infer<typeof getOneSchema>;
