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
          console.log("EM: ", email);
          // Domain check
          const domain = email.split("@").pop();
          console.log("DO: ", domain);

          const domainExists = await axios.get(
            `https://apidocs.stage.gocariq.com/api/domains/get-value`,
            {
              params: { domain: domain }
            }
          );

          console.log(domainExists);
          if (domainExists.data.isAllowed) {
            return true;
          }

          // Email Check
          const emailExists = await axios.get(
            `https://apidocs.stage.gocariq.com/api/emails/get-value`,
            {
              params: { email: email }
            }
          );
          console.log("EE: ", emailExists);
          if (emailExists.data.isAllowed) {
            return true;
          }
        }
        console.log("NOTTTT");
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
