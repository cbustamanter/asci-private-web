import { Box } from "@chakra-ui/layout";
import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAdm } from "../../utils/useIsAdm";

const Index: React.FC<{}> = ({}) => {
  useIsAdm();
  return <Box>ESTE ES EL ADMIN</Box>;
};

export default withUrqlClient(createUrqlClient)(Index);
