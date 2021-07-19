import {
  Box,
  Button,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Table,
  TableCaption,
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
import {
  useChangeCourseStatusMutation,
  useCoursesQuery,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import NextLink from "next/link";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Paginate } from "../../../components/Paginate";
import { SearchInput } from "../../../components/SearchInput";
import { CoursesFilter } from "../../../components/CoursesFilter";
const Index: React.FC<{}> = ({}) => {
  const [args, setVariables] = useState({
    page: 1,
    status: 1,
    search: null as null | string,
  });
  const [{ data, fetching, error }] = useCoursesQuery({
    variables: { args },
  });
  const [, changeCourseStatus] = useChangeCourseStatusMutation();
  const handlePagination = (page: number) => {
    setVariables({ page, search: args.search, status: args.status });
  };

  const handleSearch = (value: string) => {
    setVariables({
      page: 1,
      status: args.status,
      search: value.toLowerCase(),
    });
  };
  const handleFilter = (value: string) => {
    const status = parseInt(value);
    setVariables({
      page: 1,
      status,
      search: args.search,
    });
  };
  const handleChangeStatus = (status: number, courseId: string) => {
    const newStatus = status === 1 ? 2 : 1;
    changeCourseStatus({ id: courseId, status: newStatus });
  };
  if (!fetching && !data) {
    return (
      <Box>
        Oops! Error
        {error?.message}
      </Box>
    );
  }
  return (
    <Wrapper>
      <SectionHeading title="Cursos" />
      <SimpleGrid minChildWidth="200px" spacingY={[4, 0]} mt={[4, 6]}>
        <SearchInput onInput={handleSearch} placeholder="Buscar por nombre" />
        <CoursesFilter onChange={handleFilter} />
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
          <Table size="sm">
            <TableCaption>
              <Paginate
                totalPages={data?.courses.totalPages}
                prev={data?.courses.prev}
                currentPage={args.page}
                onClick={handlePagination}
              />
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Nombres del curso</Th>
                <Th>N° Estudiantes</Th>
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
                      <Td>{course.courseDetail.name}</Td>
                      <Td>{course.totalUsers}</Td>
                      <Td>{course.statusText}</Td>
                      <Td>{course.hasTestText}</Td>
                      <Td color="blue.500">
                        <Menu autoSelect={false}>
                          <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<BiDotsVerticalRounded />}
                            variant="ghost"
                          />
                          <MenuList>
                            <NextLink href={`/admin/courses/edit/${course.id}`}>
                              <MenuItem>Editar</MenuItem>
                            </NextLink>
                            <MenuItem
                              color="red"
                              onClick={() =>
                                handleChangeStatus(course.status, course.id)
                              }
                            >
                              {course.statusAction}
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
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
