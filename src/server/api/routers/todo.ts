import { z } from "zod";
import { TodoCreateSchema } from "~/lib/schemas/TodoCreateSchema";

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

  // getTodoById: protectedProcedure
  //   .input(z.string())
  //   .query(async ({ ctx, input }) => {
  //   const todo = await ctx.prisma.todo.findFirst({
  //     where: {
  //       id: input
  //     },
  //     select: {
  //       id: true,
  //       title: true,
  //       completed: true,
  //       image: true,
  //       // subTask: {
  //       //   select: {
  //       //     title: true
  //       //   }
  //       // },
  //       // tags: {
  //       //   select: {
  //       //     title: true
  //       //   }
  //       // }
  //     }
  //   });
  //     return todo;
  // }),

  // updateTodo: protectedProcedure
  //   .input(todoInput)
  //   .mutation(async ({ ctx, input: { title, image, id } }) => {
  //   const todo = await ctx.prisma.todo.update({
  //     data: {
  //       title,
  //       image
  //     },
  //     where: {
  //       id
  //     },
  //   });

  //     return todo;
  // }),

  // deleteTodo: protectedProcedure
  //   .input(z.string())
  //   .mutation(async ({ ctx, input }) => {
  //   return await ctx.prisma.todo.delete({
  //     where: {
  //       id: input
  //     },
  //   });
  //   }),

  toggleCompleteTodo: protectedProcedure
    .input(z.object({ id: z.string(), completed: z.boolean()}))
    .mutation(async ({ ctx, input: { id, completed } }) => {
    return await ctx.prisma.todo.update({
      where: {
        id
      },
      data: {
        completed
      }
    });
    }),
});
