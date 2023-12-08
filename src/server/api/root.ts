import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { voteRouter } from "./routers/vote";
import { countRouter } from "./routers/count";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  vote: voteRouter,
  count: countRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
