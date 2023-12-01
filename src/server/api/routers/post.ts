import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: protectedProcedure
    .query(({ctx}) => {
      return ctx.prisma.post.findMany();
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string(), text: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          name: input.name,
          text: input.text
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
