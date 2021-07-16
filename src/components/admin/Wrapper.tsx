import { Flex } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <Flex px={[8, 10]} py={[4, 10]} flexDirection="column" position="relative">
      {children}
    </Flex>
  );
};
