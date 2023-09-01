import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/client";
import { Prisma } from "@prisma/client";
export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL
    })
  ],
  callbacks: {
    async signIn({ user, profile }) {
      if (profile && profile.name) {
        try {
          await prisma.userInfo.create({
            data: {
              phone_number: profile.name
            }
          });
        } catch (err) {
          if (!err instanceof Prisma.PrismaClientKnownRequestError) {
            console.error("Internal Server Error:", err.message);
          }
        }
      }
      return true;
    },
    async session({ session, token, user }) {
      session.idToken = token.idToken;
      return session;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.idToken = account.id_token;
      }
      return token;
    }
  },
  /*pages: {
      //   error: '/auth/error',
    },*/
  debug: true,
  secret: process.env.NEXTAUTH_SECRET
});
