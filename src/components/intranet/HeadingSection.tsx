import { HStack, Box, Heading, Avatar, Text } from "@chakra-ui/react";
import React from "react";

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
        <Avatar h="32px" w="32px" />
      </Box>
    </HStack>
  );
};
