import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const paginationSchema = z.object({
  page: z.number().min(1),
});

export const countRouter = createTRPCRouter({
  getVotersForCandidateOne: publicProcedure.query(async ({ ctx }) => {
    const countCandidateOne = await ctx.prisma.voter.count({
      where: {
        choseCandidateNum: 1,
      },
    });

    const countCandidateTwo = await ctx.prisma.voter.count({
      where: {
        choseCandidateNum: 2,
      },
    });

    return { countCandidateOne, countCandidateTwo };
  }),

  getAllPaginated: publicProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      const { page } = input;
      const pageSize = 50; // Static page size
      const skip = (page - 1) * pageSize; // calculate the offset

      const voters = await ctx.prisma.voter.findMany({
        // take: pageSize,
        // skip: skip,
      });

      return voters;
    }),
});
