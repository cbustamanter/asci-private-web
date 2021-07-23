import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { LoadingMask } from "../components/LoadingMask";
import { useIsAuth } from "../utils/useIsAuth";

const Index: React.FC<{}> = ({}) => {
  useIsAuth();
  const router = useRouter();
  useEffect(() => {
    router.replace("/intranet/");
  }, [router]);

  return (
    <Flex minHeight="100vh">
      <LoadingMask />
    </Flex>
  );
};
export default Index;
