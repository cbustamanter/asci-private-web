import { HStack, Box, Heading, Avatar, Text } from "@chakra-ui/react";
import React from "react";
import { StudentAvatar } from "./StudentAvatar";

interface HeadingSectionProps {
  title: string;
  subtitle: string;
}

export const HeadingSection: React.FC<HeadingSectionProps> = ({
  title,
  subtitle,
}) => {
  return (
    <HStack spacing="auto">
      <Box>
        <Heading color="white" fontSize="28px" mb={3}>
          {title}
        </Heading>
        <Text>{subtitle}</Text>
      </Box>
      <Box>
        <StudentAvatar />
      </Box>
    </HStack>
  );
};
