import { Box, Icon, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { RiFacebookBoxLine, RiLinkedinBoxLine } from "react-icons/ri";

interface SocialMediaSectionProps {}

export const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({}) => {
  return (
    <Stack color="blue.500">
      <Stack direction="row" justifyContent="center">
        <Box>
          <Icon as={RiFacebookBoxLine} fontSize="xx-large" />
        </Box>
        <Box>
          <Icon as={RiLinkedinBoxLine} fontSize="xx-large" />
        </Box>
      </Stack>
      <Text color="gray.500">www.asciperu.com</Text>
    </Stack>
  );
};
