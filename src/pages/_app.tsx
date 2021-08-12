import { ChakraProvider } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { AppProps } from "next/app";
import React from "react";
import { IntranetLayout } from "../components/intranet/IntranetLayout";
import { AdminLayout } from "../components/layouts/AdminLayout";
import "../styles/global.scss";
import theme from "../theme";
import { createUrqlClient } from "../utils/createUrqlClient";
import { store } from "../redux/store/store";
import { Provider } from "react-redux";

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
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

//@ts-ignore
export default withUrqlClient(createUrqlClient)(MyApp);
