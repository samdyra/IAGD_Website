import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const voteRouter = createTRPCRouter({
  validateVoterToken: publicProcedure
    .input(z.object({ phoneNumber: z.string(), voterToken: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Attempt to find a voter with the given voterToken
      const voter = await ctx.prisma.voter.findUnique({
        where: { phoneNumber: input.phoneNumber },
      });

      if (!voter) {
        // Voter token doesn't exist in the database
        throw new Error("Voter phone number not found!");
      }

      if (voter.voterToken !== input.voterToken) {
        throw new Error("Token not match");
      }

      if (voter.hasVoted) {
        // User has already voted
        throw new Error("You have already voted!");
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
        throw new Error("Voter phone number not found!");
      }

      if (voter.voterToken !== input.voterToken) {
        throw new Error("Token not match");
      }

      if (voter.hasVoted) {
        // User has already voted
        throw new Error("You have already voted!");
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
