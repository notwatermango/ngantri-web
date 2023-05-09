import { createTRPCRouter } from "~/server/api/trpc";
import { accountRouter } from "~/server/api/routers/account";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  account: accountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
