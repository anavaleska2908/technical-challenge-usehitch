// import { subTaskRouter } from "./routers/subtask";
import { todoRouter } from "./routers/todo";
// import { tagRouter } from "./routers/tag";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "~/server/api/trpc";

import { postRouter } from "./routers/post";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  todo: todoRouter,
  // subTask: subTaskRouter,
  // tag: tagRouter,
  // user: userRouter,

  post: postRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
