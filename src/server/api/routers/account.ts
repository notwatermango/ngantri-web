import { Prisma } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const accountRouter = createTRPCRouter({
  createUserAccount: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string(),
        phone: z.string(),
        address: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.account.create({
          data: {
            email: input.email,
            password: input.password,
            role: 1,
            user: {
              create: {
                name: input.name,
                phone: input.phone,
                address: input.address,
              },
            },
          },
        });
        return {
          status: "success",
          message: "Account has been created",
        };
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            return {
              status: "error",
              message: "Email has been taken",
            };
          }
        }
        return {
          status: "error",
          message: "Unknown error occurred",
        };
      }
    }),

  createMerchantAccount: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string(),
        phone: z.string(),
        address: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.account.create({
          data: {
            email: input.email,
            password: input.password,
            role: 2,
            merchant: {
              create: {
                name: input.name,
                address: input.address,
                phone: input.phone,
              },
            },
          },
        });
        return {
          status: "success",
          message: "Account has been created",
        };
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === "P2002") {
            return {
              status: "error",
              message: "Email has been taken",
            };
          }
        }
        return {
          status: "error",
          message: "Unknown error occurred",
        };
      }
    }),

  getMerchantId: protectedProcedure
    .input(
      z.object({
        accountId: z.string(),
      })
    )
    .query(async ({ ctx, input: { accountId } }) => {
      return await ctx.prisma.account.findUnique({
        where: {
          id: accountId,
        },
        select: {
          merchant: {
            select: {
              id: true,
            },
          },
        },
      });
    }),

  getUserId: protectedProcedure
    .input(
      z.object({
        accountId: z.string(),
      })
    )
    .query(async ({ ctx, input: { accountId } }) => {
      return await ctx.prisma.account.findUnique({
        where: {
          id: accountId,
        },
        select: {
          user: {
            select: {
              id: true,
            },
          },
        },
      });
    }),

  getUserData: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input: { userId } }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      const name = user?.name;
      const email = user?.email;
      const phone = user?.phone;
      const address = user?.address;

      return { name: name, email: email, phone: phone, address: address };
    }),

  getMerchantData: protectedProcedure
    .input(
      z.object({
        merchantId: z.string(),
      })
    )
    .query(async ({ ctx, input: { merchantId } }) => {
      const merchant = await ctx.prisma.merchant.findUnique({
        where: {
          id: merchantId,
        },
      });
      const storeName = merchant?.name;
      const email = merchant?.email;
      const phone = merchant?.phone;
      const address = merchant?.address;

      return { name: storeName, email: email, phone: phone, address: address };
    }),
});
