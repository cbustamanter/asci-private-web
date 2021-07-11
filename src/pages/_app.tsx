import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import React from "react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { AdminLayout } from "../components/layouts/AdminLayout";
import "../styles/global.css";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

function MyApp({ Component, pageProps, router }: AppProps) {
  const EmptyLayout = ({ children }: any) => {
    return <>{children}</>;
  };
  const Layout = router.pathname.startsWith("/admin")
    ? AdminLayout
    : EmptyLayout;
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <DarkModeSwitch />
    </ChakraProvider>
  );
}

//@ts-ignore
export default withUrqlClient(createUrqlClient)(MyApp);
