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
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.todo.findMany({
        orderBy: [
          {
            completed: "asc",
          },
          {
            title: "asc"
          }
        ]
      })
    }),

  create: publicProcedure
    .input(TodoCreateSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.create({
        data: {
          title: input.title,
          image: input?.image
        }
      })
    }),

  getTodoById: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
    return ctx.prisma.todo.findFirst({
      where: {
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

  update: publicProcedure
    .input(TodoUpdateSchema)
    .mutation(async ({ ctx, input: { title, image, id, completed } }) => {
    return ctx.prisma.todo.update({
      data: {
        title,
        image,
        completed
      },
      where: {
        id
      },
    });
  }),

  deleteTodo: publicProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
    return ctx.prisma.todo.delete({
      where: {
        id: input
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
