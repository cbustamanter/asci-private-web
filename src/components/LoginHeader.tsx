import { Flex, Box, Text } from "@chakra-ui/react";
import React from "react";
import { LoginCard } from "../resources/icons/LoginCard";

interface LoginHeaderProps {}

export const LoginHeader: React.FC<LoginHeaderProps> = ({}) => {
  return (
    <Flex pb={6}>
      <Box mr={4}>
        <LoginCard boxSize={12} />
      </Box>
      <Flex flexDirection="column">
        <Text
          fontSize="20px"
          lineHeight="28px"
          fontWeight="bold"
          color="platedarker"
        >
          Aprende con nosotros
        </Text>
        <Text fontSize="14.5px" color="platedark">
          Inicia sesión para acceder a tus cursos.
        </Text>
      </Flex>
    </Flex>
  );
};
