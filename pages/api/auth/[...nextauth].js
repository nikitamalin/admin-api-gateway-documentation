import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/client";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER_BASE_URL
    })
  ],
  callbacks: {
    async signIn({ user, profile }) {
      if (user && user.email && profile && profile.name) {
        await prisma.user.update({
          where: {
            email: user.email
          },
          data: {
            full_name: profile.name
          }
        });
      }
    }
  },
  /*pages: {
      //   error: '/auth/error',
    },*/
  debug: true,
  secret: process.env.NEXTAUTH_SECRET
});
