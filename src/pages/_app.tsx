import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import React from "react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { AdminLayout } from "../components/layouts/AdminLayout";
import "../styles/global.scss";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { IntranetLayout } from "../components/intranet/IntranetLayout";

function MyApp({ Component, pageProps, router }: AppProps) {
  const EmptyLayout = ({ children }: any) => {
    return <>{children}</>;
  };
  let Layout: any = EmptyLayout;

  if (router.pathname.startsWith("/admin")) {
    Layout = AdminLayout;
  } else if (router.pathname.startsWith("/intranet")) {
    Layout = IntranetLayout;
  }
  // const Layout =
  //   ? AdminLayout
  //   : IntranetLayout;
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

//@ts-ignore
export default withUrqlClient(createUrqlClient)(MyApp);
