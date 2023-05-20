import { createTRPCRouter } from "~/server/api/trpc";
import { accountRouter } from "~/server/api/routers/account";
import { merchantRouter } from "~/server/api/routers/merchant";
import { ticketRouter } from "./routers/ticket";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  account: accountRouter,
  merchant: merchantRouter,
  ticket: ticketRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
