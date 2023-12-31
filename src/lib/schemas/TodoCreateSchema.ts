import { z } from "zod";

export const TodoCreateSchema = z.object({
  title: z.string().min(1).max(50),
  image: z.string().url(),
  completed: z.boolean(),
})

export type TodoCreateData = z.infer<typeof TodoCreateSchema>;
