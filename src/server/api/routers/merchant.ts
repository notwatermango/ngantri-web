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
  getMerchantDashboardData: protectedProcedure.query(async ({ ctx }) => {
    const merchant = await ctx.prisma.merchant.findUnique({
      where: {
        accountId: ctx.session.user.id,
      },
      select: {
        id: true,
        name: true,
        isOpen: true,
      },
    });
    const ticketGroupData = await ctx.prisma.ticket.groupBy({
      by: ["status"],
      where: {
        merchantId: merchant?.id,
      },
      _count: {
        status: true,
      },
    });
    const ticketGroup = ticketGroupData.map((ticket) => ({
      status: ticket.status,
      count: ticket._count.status,
    }));
    return { ...merchant, ticketGroup };
  }),
  getMerchantProfile: protectedProcedure.query(async ({ ctx }) => {
    const merchant = await ctx.prisma.merchant.findUnique({
      where: {
        accountId: ctx.session.user.id,
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        email: true,
        phone: true,
        address: true,
      },
    });
    return merchant;
  }),
  openOrCloseStore: protectedProcedure
    .input(
      z.object({
        isOpen: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input: { isOpen } }) => {
      await ctx.prisma.merchant.update({
        where: {
          accountId: ctx.session.user.id,
        },
        data: {
          isOpen,
        },
      });
    }),
  getMerchantAndQueueList: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.merchant.findUnique({
      where: {
        accountId: ctx.session.user.id
      },
      select: {
        tickets: {
          select: {
            user: {
              select: {
                name: true,
                imageUrl: true,
              }
            },
            message: true,
            id: true,
          }
        }
      }
    })
  }),
});
