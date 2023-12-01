// import { z } from "zod";

// import {
//   createTRPCRouter,
//   protectedProcedure,
// } from "~/server/api/trpc";
// import { subTaskInput } from "~/types";

// export const subTaskRouter = createTRPCRouter({
//   getSubTasks: protectedProcedure
//     .input(subTaskInput)
//     .query(async ({ ctx, input: { todoId } }) => {
//       const subTask = await ctx.prisma.subTask.findMany({
//         where: {
//           todoId,
//         },
//         orderBy: {
//           title: "asc"
//         }
//       })

//       return subTask.map(({ id, title, todoId}) => ({id, title, todoId}));
//     }),

//   createSubTask: protectedProcedure
//     .input(subTaskInput)
//     .mutation(async ({ ctx, input: { title, todoId } }) => {
//       const subTask = await ctx.prisma.subTask.create({
//         data: {
//           title,
//           todoId
//         },
//       });

//       return subTask;
//     }),

//   getSubTaskById: protectedProcedure
//     .input(z.string())
//     .query(async ({ ctx, input }) => {
//     const subTask = await ctx.prisma.subTask.findFirst({
//       where: {
//         id: input
//       },
//       select: {
//         id: true,
//         title: true,
//         todo: {
//           select: {
//             title: true,
//             id: true
//           }
//         },
//       }
//     });
//       return subTask;
//   }),

//   updateSubTask: protectedProcedure
//     .input(subTaskInput)
//     .mutation(async ({ ctx, input: { title, id } }) => {
//     const subTask = await ctx.prisma.subTask.update({
//       data: {
//           title
//         },
//       where: {
//         id
//       },
//     });
//       return subTask;
//   }),

//   deleteSubTask: protectedProcedure
//     .input(z.string())
//     .mutation( async ({ ctx, input }) => {
//     return await ctx.prisma.subTask.delete({
//       where: {
//         id: input
//       },
//     });
//   }),
// });
