import { withUrqlClient } from "next-urql";
import React from "react";
import { Container } from "../components/Container";
import { Sidebar } from "../components/Sidebar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const Index: React.FC<{}> = ({}) => {
  useIsAuth();
  return <Container minHeight="100vh">Esto sera la intranet</Container>;
};
export default withUrqlClient(createUrqlClient)(Index);
