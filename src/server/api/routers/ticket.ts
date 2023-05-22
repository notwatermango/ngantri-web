import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const ticketRouter = createTRPCRouter({
  createTicket: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        merchantId: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ input: { merchantId, userId, message }, ctx }) => {
      const latestTickets = await ctx.prisma.ticket.findMany({
        where: {
          merchantId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });
      const latestTicketDisplay = latestTickets?.at(0)?.display;
      let ticketNumber = 1;
      if (latestTicketDisplay) {
        const latestTicketNumber = parseInt(latestTicketDisplay);
        ticketNumber = latestTicketNumber + 1;
      }
      try {
        await ctx.prisma.ticket.create({
          data: {
            merchantId,
            userId,
            message,
            display: ticketNumber.toString(),
            status: 1,
          },
        });
      } catch (e) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Error creating ticket'`,
        });
      }
    }),
  seeTicketDetail: protectedProcedure
    .input(
      z.object({
        ticketId: z.string(),
      })
    )
    .query(async ({ input: { ticketId }, ctx }) => {
      const ticket = await ctx.prisma.ticket.findUnique({
        where: {
          id: ticketId,
        },
      });
      const merchantId = ticket?.merchantId;
      const ticketDisplay = ticket?.display;
      const createdAt = ticket?.createdAt;
      const peopleAhead = await ctx.prisma.ticket.count({
        where: {
          merchantId,
          status: 1,
          display: {
            not: { equals: ticketDisplay },
          },
          createdAt: { lt: createdAt },
        },
      });

      return { peopleAhead: peopleAhead, ticketDisplay: ticketDisplay };
    }),
  cancelTicket: protectedProcedure
    .input(
      z.object({
        ticketId: z.string(),
      })
    )
    .mutation(async ({ input: { ticketId }, ctx }) => {
      await ctx.prisma.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          status: 3,
        },
      });
    }),
  callTicketCustomer: protectedProcedure
    .input(
      z.object({
        ticketId: z.string(),
      })
    )
    .mutation(async ({ input: { ticketId }, ctx }) => {
      await ctx.prisma.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          status: 4, // call customer
        },
      });
      // TODO: notify customer
    }),
  finishTicket: protectedProcedure
    .input(
      z.object({
        ticketId: z.string(),
      })
    )
    .mutation(async ({ input: { ticketId }, ctx }) => {
      await ctx.prisma.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          status: 2, // finish
        },
      });
    }),
});
