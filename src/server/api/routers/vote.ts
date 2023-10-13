import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, "180 s"),
});

export const voteRouter = createTRPCRouter({
  validateVoterToken: publicProcedure
    .input(z.object({ phoneNumber: z.string(), voterToken: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const ip = ctx.ipAddress;
      const { success, reset } = await rateLimit.limit(ip ?? "");

      if (!success) {
        const now = Date.now();
        const retryAfter = Math.floor((reset - now) / 1000);
        throw new Error(`Too Many Request, retry after ${retryAfter} second`);
      }

      // Attempt to find a voter with the given voterToken
      const voter = await ctx.prisma.voter.findUnique({
        where: { phoneNumber: input.phoneNumber },
      });

      if (!voter) {
        // Voter token doesn't exist in the database
        throw new Error("Phone number not found!");
      }

      if (voter.voterToken !== input.voterToken) {
        throw new Error("Token not match, please check your token again!");
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
