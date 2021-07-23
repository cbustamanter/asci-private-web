import { GridItem, HStack, Icon, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { RiFileTextFill, RiStackFill } from "react-icons/ri";
import { S3_URL } from "../../utils/constant";

interface IntranetSidebarProps {}

export const IntranetSidebar: React.FC<IntranetSidebarProps> = ({}) => {
  return (
    <GridItem
      colSpan={3}
      backgroundColor="blue.900"
      borderRight="1px solid"
      borderRightColor="blue.700"
      color="white"
      maxWidth="256px"
      height="100vh"
      position="sticky"
      top={0}
    >
      <Stack alignItems="center" mt={12}>
        <Image
          src={`${S3_URL}/public-assets/boyprofile.png`}
          borderRadius="full"
          backgroundColor="blue.500"
          boxSize="80px"
          alt="Foto"
          mb={4}
        />
        <Text lineHeight="24px" fontWeight="700" fontSize="18px">
          Emilio Rodriguez
        </Text>
      </Stack>
      <Stack px={6} py={8}>
        <Text
          mb={4}
          color="darkplate"
          fontSize="12px"
          fontWeight="700"
          letterSpacing="0.1em"
        >
          ESTUDIANTE
        </Text>
        <HStack>
          <Icon as={RiStackFill} fontSize="24px" color="blue.500" />
          <Text fontWeight="bold">Mis cursos</Text>
        </HStack>
        <HStack color="darkplate" pt={3}>
          <Icon as={RiFileTextFill} fontSize="24px" />
          <Text fontWeight="bold">Mis exámenes</Text>
        </HStack>
      </Stack>
    </GridItem>
  );
};
