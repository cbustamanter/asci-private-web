import { HStack, Icon, Box, Avatar, Text } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";

interface BackButtonProps {
  text: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ text }) => {
  return (
    <HStack spacing="auto" w="full">
      <HStack
        justifyContent="center"
        fontWeight="bold"
        cursor="pointer"
        onClick={() => router.back()}
      >
        <Icon as={RiArrowLeftSLine} fontSize="md" />
        <Text textTransform="uppercase" fontSize="xs">
          {text}
        </Text>
      </HStack>
      <Box>
        <Avatar h="32px" w="32px" />
      </Box>
    </HStack>
  );
};
