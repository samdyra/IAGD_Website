import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const voteRouter = createTRPCRouter({
  validateVoterToken: publicProcedure
    .input(z.object({ phoneNumber: z.string(), voterToken: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const voter = await ctx.prisma.voter.findUnique({
        where: { phoneNumber: input.phoneNumber },
      });
      if (!voter) {
        throw new Error("Phone number not found!");
      }
      if (voter.voterToken !== input.voterToken) {
        throw new Error("Token not match, please check your token again!");
      }
      if (voter.hasVoted) {
        throw new Error("You have already voted!");
      }
      return {
        isVoterExist: Boolean(voter),
        isVoterHasVoted: voter.hasVoted,
      };
    }),

  vote: publicProcedure
    .input(
      z.object({
        voterToken: z.string(),
        headCandidateNum: z.number().int(),
        viceHeadCandidateNum: z.number().int(),
        phoneNumber: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const voter = await ctx.prisma.voter.findUnique({
        where: { phoneNumber: input.phoneNumber },
      });
      if (!voter) {
        throw new Error("Voter phone number not found!");
      }
      if (voter.voterToken !== input.voterToken) {
        throw new Error("Token not match");
      }
      if (voter.hasVoted) {
        throw new Error("You have already voted!");
      }
      const updatedVoter = await ctx.prisma.voter.update({
        where: { id: voter.id },
        data: {
          hasVoted: true,
          choseHeadCandidateNum: input.headCandidateNum,
          choseViceHeadCandidateNum: input.viceHeadCandidateNum,
        },
      });
      return { voter: updatedVoter };
    }),
});
