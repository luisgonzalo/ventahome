import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      NProgress.start();
    });

    Router.events.on("routeChangeComplete", () => {
      NProgress.done(false);
    });

    Router.events.on("routeChangeError", () => {
      NProgress.done(false);
    });
  }, []);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
