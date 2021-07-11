import { Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useIsAdm } from "../../utils/useIsAdm";

const Index: React.FC<{}> = ({}) => {
  useIsAdm();
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/users");
  }, [router]);

  return <></>;
};

export default withUrqlClient(createUrqlClient)(Index);
