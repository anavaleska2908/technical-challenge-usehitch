// import { z } from "zod";

// import {
//   createTRPCRouter,
//   protectedProcedure,
// } from "~/server/api/trpc";
// import { tagInput } from "~/types";

// export const tagRouter = createTRPCRouter({
//   getTags: protectedProcedure
//     .query(async ({ ctx }) => {
//       const tags = await ctx.prisma.tag.findMany({
//         orderBy: [
//           {
//             createdAt: "desc"
//           },
//           {
//             title: "asc"
//           }
//         ],
//       })
//       return tags.map(({ id, title, todoId}) => ({id, title, todoId}));
//     }),

//   createTag: protectedProcedure
//     .input(tagInput)
//     .mutation( async ({ ctx, input: { title } }) => {
//       const tag = await ctx.prisma.tag.create({
//         data: {
//           title,
//         },
//       });

//       return tag;
//     }),

//   getTagById: protectedProcedure
//     .input(z.string())
//     .query(async ({ ctx, input }) => {
//     const tag = await ctx.prisma.tag.findFirst({
//       where: {
//         id: input
//       },
//       select: {
//         id: true,
//         title: true,
//         todos: {
//           select: {
//             title: true,
//             id: true
//           }
//         },
//       }
//     });

//       return tag;
//   }),

//   updateTag: protectedProcedure
//     .input(tagInput)
//     .mutation(async ({ ctx, input: { title, id } }) => {
//     const tag = await ctx.prisma.tag.update({
//       data: {
//           title,
//         },
//       where: {
//         id
//       },
//     });

//       return tag;
//   }),

//   deleteTag: protectedProcedure
//     .input(z.string())
//     .mutation( async ({ ctx, input }) => {
//     return ctx.prisma.tag.delete({
//       where: {
//         id: input
//       },
//     });
//   }),
// });
