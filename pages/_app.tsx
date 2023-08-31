import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/styles";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { ProfileContextWrapper } from "@/components/Context/ProfileContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <ProfileContextWrapper>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="application-name" content="Car IQ" />
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
            <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
            <meta property="og:title" content="Go Car IQ" />
            <meta property="og:type" content="website" />
            <meta
              property="og:description"
              content="Car IQ has created a payment solution for fleet vehicles that enables fleets to pay for goods without a credit card. Vehicles autonomously initiate and complete payments for services such as fuel, tolls, parking, and more."
            />
            <meta property="og:image" content="/cariq.png" />
          </Head>
          <Analytics />
          <Navbar />
          <Component {...pageProps} />
        </ProfileContextWrapper>
      </ChakraProvider>
    </SessionProvider>
  );
}
