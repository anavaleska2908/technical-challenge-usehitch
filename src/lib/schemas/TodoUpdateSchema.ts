import { z } from "zod";

export const TodoUpdateSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(50).optional(),
  image: z.string().optional(),
  completed: z.boolean().optional(),
})

export type TodoUpdateData = z.infer<typeof TodoUpdateSchema>;
