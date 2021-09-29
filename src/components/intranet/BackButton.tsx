import { HStack, Icon, Box, Avatar, Text } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { StudentAvatar } from "./StudentAvatar";

interface BackButtonProps {
  text: string;
  route: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ text, route }) => {
  return (
    <HStack spacing="auto" w="full">
      <HStack
        justifyContent="center"
        fontWeight="bold"
        cursor="pointer"
        onClick={() => router.push(route)}
      >
        <Icon as={RiArrowLeftSLine} fontSize="md" />
        <Text textTransform="uppercase" fontSize="xs">
          {text}
        </Text>
      </HStack>
      <Box>
        <StudentAvatar />
      </Box>
    </HStack>
  );
};
