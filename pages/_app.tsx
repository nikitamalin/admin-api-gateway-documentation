import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/styles";
import MainLayout from "@/components/Layouts/main";
import { AnimatePresence } from "framer-motion";
import { IframeContextWrapper } from "@/components/Context/iframe";

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <IframeContextWrapper>
          <MainLayout>
            <AnimatePresence initial={true}>
              <div className={`font-sans`}>
                <Component {...pageProps} />
              </div>
            </AnimatePresence>
          </MainLayout>
        </IframeContextWrapper>
      </ChakraProvider>
    </SessionProvider>
  );
}

// iframe and be able to update the link in iframe using use context
