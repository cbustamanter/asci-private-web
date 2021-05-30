import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import React from "react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { AdminLayout } from "../components/layouts/AdminLayout";

function MyApp({ Component, pageProps, router }: AppProps) {
  const Layout = router.pathname.startsWith("/admin")
    ? AdminLayout
    : AdminLayout;
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <DarkModeSwitch />
    </ChakraProvider>
  );
}

export default MyApp;
