import { z } from "zod";
import { TodoCreateSchema } from "~/lib/schemas/TodoCreateSchema";
import { TodoUpdateSchema } from "~/lib/schemas/TodoUpdateSchema";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
// import { todoInput } from "~/types";

export const todoRouter = createTRPCRouter({
  getAll: protectedProcedure
    .query (async({ ctx }) => {
      return await ctx.prisma.todo.findMany({
        where: {
          createdById: ctx.session.user.id
        },
        orderBy: [
          {
            completed: "asc",
          }
        ]
      })
    }),

  create: protectedProcedure
    .input(TodoCreateSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.create({
        data: {
          title: input.title,
          image: input?.image,
          createdById: ctx.session.user.id
        }
      })
    }),

  getTodoById: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
    return ctx.prisma.todo.findFirst({
      where: {
        createdById: ctx.session.user.id,
        id: input
      },
      select: {
        id: true,
        title: true,
        completed: true,
        image: true
      }
    });
  }),

  update: protectedProcedure
    .input(TodoUpdateSchema)
    .mutation(async ({ ctx, input: { title, image, id, completed } }) => {
    return ctx.prisma.todo.update({
      data: {
        title,
        image,
        completed
      },
      where: {
        id,
        createdById: ctx.session.user.id
      },
    });
  }),

  deleteTodo: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
    return ctx.prisma.todo.delete({
      where: {
        id: input,
        createdById: ctx.session.user.id
      },
    });
    }),

  toggleCompleteTodo: protectedProcedure
    .input(z.object({ id: z.string(), completed: z.boolean()}))
    .mutation(({ ctx, input: { id, completed } }) => {
    return ctx.prisma.todo.update({
      where: {
        id
      },
      data: {
        completed
      }
    });
    }),
});
