import {
  HStack,
  Box,
  Heading,
  Avatar,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IntraCard } from "../../components/intranet/IntraCard";
import { IntraCoursecard } from "../../components/intranet/IntraCoursecard";
import { IntranetContainer } from "../../components/intranet/IntranetContainer";
import { NextSeo } from "next-seo";

const Index: React.FC<{}> = ({}) => {
  return (
    <IntranetContainer py={8} px={6} title="probando">
      <NextSeo title="Mis cursos | ASCI" description="Todos mis cursos" />
      <HStack spacing="auto">
        <Box>
          <Heading color="white" fontSize="28px" mb={3}>
            Mis cursos
          </Heading>
          <Text>Revisa tus cursos completados y los que estás llevando</Text>
        </Box>
        <Box>
          <Avatar bg="green" h="32px" w="32px" />
        </Box>
      </HStack>
      <IntraCard />
      <IntraCard />
      <Tabs variant="main" mt={4}>
        <TabList>
          <Tab>PRÓXIMOS CURSOS</Tab>
          <Tab>CURSOS TERMINADOS</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text>
              Este es un curso de ingeniería dirigido a profesionales de
              ingeniería marítima, portuaria y civil. Aprenderás a diseñar
              diques en talud...
            </Text>
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 2, lg: 3 }}
              mt={4}
              spacing={4}
            >
              <IntraCoursecard />
              <IntraCoursecard />
              <IntraCoursecard />
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              lacinia vel leo vel tempus. Aenean ultrices tellus aliquet, mattis
              mauris eu, aliquet lacus.
            </Text>
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 2, lg: 3 }}
              mt={4}
              spacing={4}
            >
              <IntraCoursecard />
              <IntraCoursecard />
              <IntraCoursecard />
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </IntranetContainer>
  );
};

export default Index;
