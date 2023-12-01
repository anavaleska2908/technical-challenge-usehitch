// import { z } from "zod";
// import type { inferRouterOutputs } from "@trpc/server";
// import type { AppRouter } from "~/server/api/root";

// type RouterOutputs = inferRouterOutputs<AppRouter>;
// // type allTodosOutput = RouterOutputs["todo"]["getTodos"];

// // export type Todo = allTodosOutput[number];

// export const todoInput = z.object({
//   id: z.string().optional(),
//   title: z.string().min(1).max(50),
//   image: z.string().url().optional(),
//   // createdById: z.string(),
//   completed: z.boolean(),
//   subTaskId: z.string().array().optional(),
//   tagId: z.string().array().optional()
// })

// export const subTaskInput = z.object({
//   id: z.string(),
//   title: z.string(),
//   todoId: z.string(),
// })

// export const tagInput = z.object({
//   id: z.string(),
//   title: z.string(),
//   todoId: z.string(),
// })
