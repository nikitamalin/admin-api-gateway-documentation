import Head from "next/head";
import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/Auth/LoadingSpinner";
import Unauthenticated from "../Auth/Unauthenticated";
import Navbar from "../Navbar";
import { useRouter } from "next/router";
// import { isValidToken } from "@/utils/auth";
interface Props {
  children?: ReactNode;
}

export default function MainLayout({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  /*
  if (
    session &&
    session.user &&
    session.user.email &&
    !isValidToken(session.user.email, session.idToken)
  ) {
    signOut({ callbackUrl: "/" });
  }*/

  return (
    <div className="flex flex-col relative">
      <Head>
        <meta charSet="utf-8" />
        <title>Car IQ API Documentation</title>
        <base href="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="favicon.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        {/* <title>Vote | Fabfour</title>
          <meta charSet="UTF-8" />
          <meta name="application-name" content="Fab Four Voting" />
          <meta
            name="keywords"
            content="fleet, go cariq, car iq, payments, vehicles"
          />
          <meta name="author" content="Sterling Pratz" />
          <meta
            name="description"
            content="Car IQ has created a payment solution for fleet vehicles that enables fleets to pay for goods without a credit card. Vehicles autonomously initiate and complete payments for services such as fuel, tolls, parking, and more."
          />
          <meta property="image" content="/cariq.png" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="shortcut icon" href="/favico.ico" type="image/x-icon" />
          <meta property="og:title" content="Car IQ Pay" />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Car IQ has created a payment solution for fleet vehicles that enables fleets to pay for goods without a credit card. Vehicles autonomously initiate and complete payments for services such as fuel, tolls, parking, and more."
          />
          <meta property="og:image" content="/cariq.png" /> */}
      </Head>
      {router.pathname !== "/documentation" && <Navbar />}
      {status === "loading" ? (
        <LoadingSpinner />
      ) : (
        <>
          {status === "unauthenticated" &&
          router.pathname !== "/not-authorized" ? (
            <Unauthenticated />
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </div>
  );
}
