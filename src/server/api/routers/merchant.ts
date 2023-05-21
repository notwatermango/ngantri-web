import type { Merchant } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const merchantRouter = createTRPCRouter({
  getMerchantInfoOnTicketConfirmation: protectedProcedure
    .input(
      z.object({
        merchantId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (input.merchantId == "test") {
        const dummy = {} as Merchant;
        dummy.imageUrl = "https://i.ibb.co/BTGq4c4/borgir.png";
        dummy.name = "Borger Qhinks";
        dummy.id = "test";
        dummy.isOpen = true;
        return dummy;
      }

      const merchant = await ctx.prisma.merchant.findUnique({
        where: {
          id: input.merchantId,
        },
        select: {
          id: true,
          name: true,
          isOpen: true,
          imageUrl: true,
        },
      });
      if (!merchant) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No merchant found'`,
        });
      }
      return merchant;
    }),
  getMerchantDashboardData: protectedProcedure
    .input(
      z.object({
        merchantId: z.string(),
      })
    )
    .query(async ({ input: { merchantId }, ctx }) => {
      const merchant = await ctx.prisma.merchant.findUnique({
        where: {
          id: merchantId,
        },
      });
      const isOpen = merchant?.isOpen;
      const inQueue = await ctx.prisma.ticket.count({
        where: {
          merchantId: merchantId,
          status: 1,
        },
      });
      const finished = await ctx.prisma.ticket.count({
        where: {
          merchantId: merchantId,
          status: 2,
        },
      });
      const cancelled = await ctx.prisma.ticket.count({
        where: {
          merchantId: merchantId,
          status: 3,
        },
      });
      return {
        isOpen: isOpen,
        inQueue: inQueue,
        finished: finished,
        cancelled: cancelled,
      };
    }),
});
