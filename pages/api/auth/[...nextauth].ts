import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      })
    ],
    callbacks: {
      async signIn({ user, profile, account }) {
        if (user && user.email) {
          const email = user.email;

          // const domain = email.split("@")[-1];

          // const domainExists = await axios.get("/api/domains/get-value", {
          //   params: { domain: domain }
          // });
          // console.log("DD: ", domainExists);
          // if (domainExists) {
          //   return true;
          // }

          const whiteList = ["@gocariq.com", "@cariqpay.com"];
          for (const domain of whiteList) {
            if (email.endsWith(domain)) {
              return true;
            }
          }
          const emailList = [
            "nikita@malinovsky.net",
            "mbolgar@fluidtruck.com",
            "ben.whan@gm.com",
            "jordan.kravitz@gm.com",
            "mihai.moldoveanu@gm.com"
          ];
          if (emailList.includes(email)) {
            return true;
          }
        }
        return "/not-authorized";
      },
      async session({ session, token, user }) {
        session.idToken = token.idToken || "";
        return session;
      },
      async jwt({ token, account }) {
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
}
