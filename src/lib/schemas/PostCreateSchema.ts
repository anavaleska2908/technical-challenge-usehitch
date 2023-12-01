import { z } from "zod";

export const PostCreateSchema = z.object({
  name: z.string().min(1).max(50),
  text: z.string().min(1).max(50)
})

export type PostCreateSchema = z.infer<typeof PostCreateSchema>;
