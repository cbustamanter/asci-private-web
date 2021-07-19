import {
  Box,
  Button,
  Flex,
  GridItem,
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
import NextLink from "next/link";
import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { SectionHeading } from "../../../components/admin/SectionHeading";
import { Wrapper } from "../../../components/admin/Wrapper";
import { EmptyTable } from "../../../components/EmptyTable";
import { Paginate } from "../../../components/Paginate";
import { QuizzesFilter } from "../../../components/QuizzesFilter";
import { SearchInput } from "../../../components/SearchInput";
import { SkeletonTable } from "../../../components/SkeletonTable";
import { useQuizzesQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const Index: React.FC<{}> = ({}) => {
  const [args, setVariables] = useState({
    page: 1,
    status: 1,
    search: null as null | string,
  });
  const [{ data, fetching, error }] = useQuizzesQuery({ variables: { args } });
  const searchQuizz = (value: string) => {
    setVariables({
      page: 1,
      status: args.status,
      search: value.toLowerCase(),
    });
  };
  const handlePagination = (page: number) => {
    setVariables({ page, search: args.search, status: args.status });
  };
  const handleFilter = (value: string) => {
    const status = parseInt(value);
    setVariables({
      page: 1,
      status,
      search: args.search,
    });
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
      <SectionHeading title="Exámenes" />
      <SimpleGrid
        // minChildWidth="200px"
        columns={6}
        spacingY={[4, 0]}
        mt={[4, 6]}
      >
        <GridItem colSpan={2}>
          <SearchInput
            placeholder="Buscar por nombre de curso"
            onInput={searchQuizz}
          />
        </GridItem>
        <QuizzesFilter onChange={handleFilter} />
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
                totalPages={data?.quizzes.totalPages}
                prev={data?.quizzes.prev}
                currentPage={args.page}
                onClick={handlePagination}
              />
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Nombre Curso</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!data?.quizzes.data.length ? (
                <EmptyTable colspan={7} />
              ) : (
                data.quizzes.data.map((quizz, idx) => {
                  return (
                    <Tr key={quizz.id}>
                      <Td>{quizz.course.courseDetail.name}</Td>
                      <Td>{quizz.statusText}</Td>
                      <Td color="blue.500">
                        <Menu autoSelect={false}>
                          <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<BiDotsVerticalRounded />}
                            variant="ghost"
                          />
                          <MenuList>
                            <NextLink href={`/admin/quizzes/edit/${quizz.id}`}>
                              <MenuItem>Editar</MenuItem>
                            </NextLink>
                            <MenuItem
                              color="red"
                              // onClick={() => {
                              //   const status = (user.status ^= 1);
                              //   changeUserStatus({
                              //     id: user.id,
                              //     status,
                              //   });
                              // }}
                            >
                              {quizz.statusAction}
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
