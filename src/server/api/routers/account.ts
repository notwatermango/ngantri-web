import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
});
