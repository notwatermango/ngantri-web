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
});