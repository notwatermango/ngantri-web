import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserWithTicketList: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input: { userId }, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
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
  editUserProfile: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        email: z.string(),
        name: z.string(),
        phone: z.string(),
        address: z.string(),
      })
    )
    .mutation(
      async ({ input: { userId, email, name, phone, address }, ctx }) => {
        const user = await ctx.prisma.user.findUnique({
          where: {
            id: userId,
          },
        });
        await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            email: email,
            name: name,
            phone: phone,
            address: address,
          },
        });
      }
    ),
});
