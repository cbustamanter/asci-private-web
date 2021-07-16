import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

export const LoadingMask: React.FC<{}> = ({}) => {
  return (
    <Flex
      position="absolute"
      backgroundColor="rgba(255,255,255,0.7)"
      height="100%"
      width="100%"
      rounded="2xl"
      top={0}
      left={0}
      zIndex={9999}
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        position="absolute"
        zIndex={9998}
        flexDirection="column"
        alignItems="center"
      >
        <Spinner
          thickness="4px"
          speed="0.75s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text>Cargando...</Text>
      </Flex>
    </Flex>
  );
};
