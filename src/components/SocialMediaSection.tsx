import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import {
  RiFacebookBoxLine,
  RiLinkedinBoxLine,
  RiYoutubeLine,
} from "react-icons/ri";

interface SocialMediaSectionProps {}

export const SocialMediaSection: React.FC<SocialMediaSectionProps> = ({}) => {
  return (
    <Stack color="blue.500">
      <Stack direction="row" justifyContent="center">
        <Box>
          <Link
            href="https://www.facebook.com/ASCI-Per%C3%BA-Asesor%C3%ADa-Consultor%C3%ADa-e-Investigaci%C3%B3n-111100243896427"
            isExternal
          >
            <Icon as={RiFacebookBoxLine} fontSize="xx-large" />
          </Link>
        </Box>
        <Box>
          <Link
            href="https://www.linkedin.com/company/65478132/admin/"
            isExternal
          >
            <Icon as={RiLinkedinBoxLine} fontSize="xx-large" />
          </Link>
        </Box>
        <Box>
          <Link
            href="https://www.youtube.com/channel/UC3YDqzRDAq5l6V9tTZKLB5A"
            isExternal
          >
            <Icon as={RiYoutubeLine} fontSize="xx-large" />
          </Link>
        </Box>
      </Stack>
      <Text color="gray.500">www.asciperu.com</Text>
    </Stack>
  );
};
