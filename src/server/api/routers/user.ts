import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserWithTicketList: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          accountId: ctx.session.user.id,
        },
        include: {
          tickets: {
            select: {
              merchant: {
                select: {
                  id: true,
                  name: true,
                },
              },
              createdAt: true,
              status: true,
              id: true,
              message: true,
              display: true,
            },
            orderBy: {
              status: "asc",
            },
          },
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No user found'`,
        });
      }
      return user;
    }),
});
