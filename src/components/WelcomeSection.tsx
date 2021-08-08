import { Stack, Box, Heading } from "@chakra-ui/react";
import React from "react";

interface WelcomeSectionProps {}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({}) => {
  return (
    <Stack color="white" alignItems="center">
      <Box>
        <Heading fontSize="18px" lineHeight="24px" fontWeight="400">
          Bienvenido a
        </Heading>
      </Box>
      <Box>
        <Heading fontSize="32px" lineHeight="40px">
          ASCI PERÚ
        </Heading>
      </Box>
      <Box w="44px" h="4px" bg="blue.500"></Box>
    </Stack>
  );
};
