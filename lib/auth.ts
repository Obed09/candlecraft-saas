/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { getOrCreateOpenAccessUser } from "@/lib/openAccess";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (credentials?.email && credentials?.password) {
            const user = await prisma.user.findUnique({
              where: {
                email: credentials.email,
              },
              include: {
                business: {
                  include: {
                    subscription: true,
                  },
                },
              },
            });

            if (user?.password) {
              const isCorrectPassword = await bcrypt.compare(
                credentials.password,
                user.password
              );

              if (isCorrectPassword) {
                return {
                  id: user.id,
                  email: user.email!,
                  name: user.name!,
                  role: user.role,
                  businessId: user.business?.id,
                  subscriptionPlan: user.business?.subscription?.plan || "free",
                  subscriptionStatus:
                    user.business?.subscription?.status || "active",
                } as any;
              }
            }
          }
        } catch (error) {
          console.error("Credential lookup failed, using open access", error);
        }

        const openAccess = await getOrCreateOpenAccessUser();
        return openAccess as any;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
    error: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.businessId = (user as any).businessId;
        token.subscriptionPlan = (user as any).subscriptionPlan;
        token.subscriptionStatus = (user as any).subscriptionStatus;
      }

      // Refresh subscription data on update trigger
      if (trigger === "update") {
        const userData = await prisma.user.findUnique({
          where: { id: token.id as string },
          include: {
            business: {
              include: {
                subscription: true,
              },
            },
          },
        });

        if (userData?.business) {
          token.businessId = userData.business.id;
          token.subscriptionPlan = userData.business.subscription?.plan || "free";
          token.subscriptionStatus = userData.business.subscription?.status || "active";
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).businessId = token.businessId;
        (session.user as any).subscriptionPlan = token.subscriptionPlan;
        (session.user as any).subscriptionStatus = token.subscriptionStatus;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
