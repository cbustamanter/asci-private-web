import {
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import React from "react";
import { HeadingSection } from "../../components/intranet/HeadingSection";
import { IntraCard } from "../../components/intranet/IntraCard";
import { IntraCoursecard } from "../../components/intranet/IntraCoursecard";
import { IntranetContainer } from "../../components/intranet/IntranetContainer";
import { LoadingMask } from "../../components/LoadingMask";
import { useUserCoursesQuery } from "../../generated/graphql";
import { useIsAuth } from "../../utils/useIsAuth";

const Index: React.FC<{}> = ({}) => {
  const { isChecking, data } = useIsAuth();
  const [{ data: courses }] = useUserCoursesQuery();
  let body = <LoadingMask />;
  if (!data) {
    body = <LoadingMask />;
  }
  if (data && !isChecking) {
    body = (
      <IntranetContainer py={8} px={6}>
        <NextSeo title="Mis cursos | ASCI" description="Todos mis cursos" />
        <HeadingSection
          title="Mis cursos"
          subtitle="Revisa tus cursos completados y los que estás llevando"
        />
        {courses?.userCourses.map((c) => (
          <IntraCard
            key={c.id}
            title={c.courseDetail.name}
            description={c.courseDetail.description}
            coverPhoto={c.courseDetail.coverPhoto as string}
            id={c.id}
          />
        ))}
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
                lacinia vel leo vel tempus. Aenean ultrices tellus aliquet,
                mattis mauris eu, aliquet lacus.
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
  }
  return body;
};

export default Index;
