import {
  Box,
  Button,
  Flex,
  Link,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { SectionHeading } from "../../../components/admin/SectionHeading";
import { Wrapper } from "../../../components/admin/Wrapper";
import { EmptyTable } from "../../../components/EmptyTable";
import { SkeletonTable } from "../../../components/SkeletonTable";
import { useCoursesQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import NextLink from "next/link";
const Index: React.FC<{}> = ({}) => {
  const [variables, setVariables] = useState({
    page: 1,
  });
  const [{ data, fetching }] = useCoursesQuery({ variables });
  return (
    <Wrapper>
      <SectionHeading title="Cursos" />
      <SimpleGrid minChildWidth="200px" spacingY={[4, 0]} mt={[4, 6]}>
        <Box ml={["unset", "auto"]}>
          <NextLink href="/admin/courses/new">
            <Button as={Link} width={["100%", "auto"]}>
              Crear Curso
            </Button>
          </NextLink>
        </Box>
      </SimpleGrid>
      {!data && fetching ? (
        <SkeletonTable />
      ) : (
        <Flex
          mt={[4, 8]}
          maxWidth={["sm", "calc(100vw - 256px)"]}
          overflow="auto"
        >
          <Table size={"md"}>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Nombres del curso</Th>
                <Th>Estudiantes</Th>
                <Th>Estado</Th>
                <Th>Tiene examen</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!data?.courses.data.length ? (
                <EmptyTable colspan={4} />
              ) : (
                data.courses.data.map((course, idx) => {
                  return (
                    <Tr key={course.id}>
                      <Td>{idx + 1}</Td>
                      <Td>{course.courseDetail.name}</Td>
                      <Td>{course.totalUsers}</Td>
                      <Td>{course.statusText}</Td>
                      <Td>{course.hasTestText}</Td>
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </Flex>
      )}
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient)(Index);
