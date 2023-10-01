import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  validateVoterToken: publicProcedure
    .input(z.object({ voterToken: z.string() }))
    .query(async ({ input, ctx }) => {
      // Attempt to find a voter with the given voterToken
      const voter = await ctx.prisma.voter.findUnique({
        where: { voterToken: input.voterToken },
      });

      if (!voter) {
        // Voter token doesn't exist in the database
        throw new Error("Voter token not found");
      }

      const response = {
        isVoterExist: Boolean(voter),
        isVoterHasVoted: voter.hasVoted,
      };

      // Voter token exists
      return response;
    }),

  vote: publicProcedure
    .input(
      z.object({
        voterToken: z.string(),
        voteNumber: z.number().int(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Attempt to find a voter with the given voterToken
      const voter = await ctx.prisma.voter.findUnique({
        where: { voterToken: input.voterToken },
      });

      if (!voter) {
        // Voter token doesn't exist in the database
        throw new Error("Token invalid");
      }

      if (voter.hasVoted) {
        // User has already voted
        throw new Error("User already voted");
      }

      // Update the voter's hasVoted and choseCandidateNum
      const updatedVoter = await ctx.prisma.voter.update({
        where: { id: voter.id },
        data: {
          hasVoted: true,
          choseCandidateNum: input.voteNumber,
        },
      });

      return { voter: updatedVoter };
    }),
});
