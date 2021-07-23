import {
  SimpleGrid,
  GridItem,
  Stack,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { S3_URL } from "../../utils/constant";

interface IntraCardProps {}

export const IntraCard: React.FC<IntraCardProps> = ({}) => {
  return (
    <SimpleGrid
      columns={12}
      mt={6}
      spacingX={2}
      p={4}
      //       maxWidth="896px"
      backgroundColor="blue.800"
      borderRadius="4px"
    >
      <GridItem colSpan={{ base: 12, md: 4 }} order={{ base: 2, md: 1 }}>
        <Stack height="100%" justifyContent="space-evenly">
          <Text fontWeight="700" fontSize="18px" color="white">
            Diseño de diques rompeolas con cubípodos
          </Text>
          <Text>
            Este es un curso de ingeniería dirigido a profesionales de
            ingeniería marítima, portuaria y civil. Aprenderás a diseñar di...
          </Text>
          <Button width="max-content">Ver curso</Button>
        </Stack>
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 8 }} order={{ base: 1, md: 2 }}>
        <Stack height="100%" justifyContent="center">
          <Image src={`${S3_URL}/public-assets/courseholder.png`} />
        </Stack>
      </GridItem>
    </SimpleGrid>
  );
};
