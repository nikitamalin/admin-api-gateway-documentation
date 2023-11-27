import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import Auth0Provider from "next-auth/providers/auth0";
import prisma from "@/lib/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

export default NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL
    })
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      if (user && user.email) {
        const whiteList = ["@gocariq.com"];
        for (const domain of whiteList) {
          if (user.email.endsWith(domain)) {
            return true;
          }
        }

        // const isAllowedUser = await prisma.admin.findUnique({
        //   where: {
        //     email: user.email
        //   }
        // });
        // if (isAllowedUser == undefined) {
        //   return "/not-authorized";
        // }
        return true;
      }
      return "/not-authorized";
    },
    async session({ session, token, user }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
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
