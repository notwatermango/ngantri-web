import { type GetServerSidePropsContext } from "next";
import { compare } from "bcryptjs";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/db";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Account } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      // ...other properties
      role: number;
    } & DefaultSession["user"];
  }

  // interface User {
  // ...other properties
  // TODO: migrate Postgre
  // role: UserRole;
  // }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: Account;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      // session.user. = user.role; // <-- put other properties on the session here
      return Promise.resolve(session);
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user as Account;
        console.log(token.user);
      }
      return Promise.resolve(token);
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "wow@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Any object returned will be saved in `user` property of the JWT
        // If you return null then an error will be displayed advising the user to check their details.
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        if (!credentials) return null;
        const user = await prisma.account.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        }
        if (await compare(credentials.password, user.password)) return user;
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
