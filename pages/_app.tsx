import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/styles";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { ProfileContextWrapper } from "@/components/Context/ProfileContext";
import { DriverContextWrapper } from "@/components/Context/DriverContext";
import Script from "next/script";

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <ProfileContextWrapper>
          <DriverContextWrapper>
            <Head>
              <title>Vote | Fabfour</title>
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
              <link
                rel="shortcut icon"
                href="/pfavico.ico"
                type="image/x-icon"
              />
              <meta property="og:title" content="Car IQ Pay" />
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
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-MY6QZ342ZC"
            ></Script>
            <Script id="google-analytics">
              {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-MY6QZ342ZC');`}
            </Script>
            <Script id="heap" type="text/javascript">
              {`
  window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
  heap.load("752942822");`}
            </Script>
          </DriverContextWrapper>
        </ProfileContextWrapper>
      </ChakraProvider>
    </SessionProvider>
  );
}
