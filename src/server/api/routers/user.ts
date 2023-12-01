import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { hash } from "bcryptjs";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(z.object({ name: z.string(), email: z.string().email() }))
    .mutation( async ({ ctx, input }) => {
      return ctx.prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
        },
      });
    }),

  // updateTodo: protectedProcedure.query(({ ctx }) => {
  //   return ctx.prisma.todo.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  // }),

  // deleteTodo: protectedProcedure.query(({ ctx }) => {
  //   return ctx.prisma.todo.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  // }),
});
