import {
  Avatar,
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { IntranetContainer } from "../../../components/intranet/IntranetContainer";
import { S3_URL } from "../../../utils/constant";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetStringId } from "../../../utils/useGetStringId";

const Course: React.FC<{}> = ({}) => {
  const id = useGetStringId();
  return (
    <IntranetContainer
      py={8}
      px={6}
      background={`url(${S3_URL}/public-assets/courseBg.png)`}
      backgroundRepeat="no-repeat"
    >
      <HStack spacing="auto">
        <HStack justifyContent="center" fontWeight="bold">
          <Icon as={RiArrowLeftSLine} fontSize="md" />
          <Text textTransform="uppercase" fontSize="xs">
            Regresar
          </Text>
        </HStack>
        <Box>
          <Avatar bg="green" h="32px" w="32px" />
        </Box>
      </HStack>
      <Heading mt={4} color="white" fontSize="x-large">
        Diseño de diques rompeolas con cubípodos
      </Heading>
      <Flex justifyContent="flex-end">
        <Button>Clase en vivo</Button>
      </Flex>
      <SimpleGrid columns={12} spacing={4} mt={4}>
        <GridItem
          colSpan={7}
          bg="tomato"
          maxHeight="384px"
          minHeight="384px"
          borderRadius={3}
        ></GridItem>
        <GridItem colSpan={5} bg="teal" borderRadius={3}></GridItem>
      </SimpleGrid>
    </IntranetContainer>
  );
};

export default withUrqlClient(createUrqlClient)(Course);
