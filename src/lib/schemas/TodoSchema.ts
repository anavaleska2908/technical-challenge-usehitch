import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(50),
  image: z.string().url().optional(),
  completed: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
})

const TodoListSchema = TodoSchema.array();

export type TodoListData = z.infer<typeof TodoListSchema>;
export type TodoData = z.infer<typeof TodoSchema>;
