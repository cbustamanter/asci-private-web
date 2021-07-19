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
  useDisclosure,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { SectionHeading } from "../../../components/admin/SectionHeading";
import { Wrapper } from "../../../components/admin/Wrapper";
import { EmptyTable } from "../../../components/EmptyTable";
import { Paginate } from "../../../components/Paginate";
import { SearchInput } from "../../../components/SearchInput";
import { SearchModal } from "../../../components/SearchModal";
import { SkeletonTable } from "../../../components/SkeletonTable";
import { UsersFilter } from "../../../components/UsersFilter";
import {
  useChangeUserStatusMutation,
  useUsersQuery,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const Index: React.FC<{}> = ({}) => {
  const [args, setVariables] = useState({
    page: 1,
    status: 1,
    search: null as null | string,
  });
  const [{ data, fetching, error }] = useUsersQuery({
    variables: { args },
  });
  const [, changeUserStatus] = useChangeUserStatusMutation();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const searchUser = (value: string) => {
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
      <SearchModal isOpen={isOpen} onClose={onClose} />
      <Button onClick={() => onOpen()}>Abrir modal</Button>
      <SectionHeading title="Estudiantes" />
      <SimpleGrid minChildWidth="200px" spacingY={[4, 0]} mt={[4, 6]}>
        <SearchInput
          placeholder="Buscar por nombre o correo"
          onInput={searchUser}
        />
        <Box ml={[0, 6]} width={["100w", "auto"]}>
          <UsersFilter onChange={handleFilter} />
        </Box>
        <Box ml={["unset", "auto"]}>
          <NextLink href="/admin/users/new">
            <Button as={Link} width={["100%", "auto"]}>
              Crear Estudiante
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
                totalPages={data?.users.totalPages}
                prev={data?.users.prev}
                currentPage={args.page}
                onClick={handlePagination}
              />
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Nombres</Th>
                <Th>Apellidos</Th>
                <Th>Correo</Th>
                <Th>N° Cursos</Th>
                <Th>Celular</Th>
                <Th>País</Th>
                <Th>Género</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!data?.users.data.length ? (
                <EmptyTable colspan={7} />
              ) : (
                data.users.data.map((user, idx) => {
                  return (
                    <Tr key={user.id}>
                      <Td>{user.names}</Td>
                      <Td>{user.surnames}</Td>
                      <Td>{user.email}</Td>
                      <Td>{user.totalCourses}</Td>
                      <Td>{user.cellphone}</Td>
                      <Td>{user.country}</Td>
                      <Td>{user.genderText}</Td>
                      <Td>
                        <Flex>
                          <Box>{user.statusText}</Box>
                        </Flex>
                      </Td>
                      <Td color="blue.500">
                        <Menu autoSelect={false}>
                          <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<BiDotsVerticalRounded />}
                            variant="ghost"
                          />
                          <MenuList>
                            <NextLink href={`/admin/users/edit/${user.id}`}>
                              <MenuItem>Editar</MenuItem>
                            </NextLink>
                            <MenuItem>Asigna Curso</MenuItem>
                            <MenuItem
                              color="red"
                              onClick={() => {
                                const status = (user.status ^= 1);
                                changeUserStatus({
                                  id: user.id,
                                  status,
                                });
                              }}
                            >
                              {user.statusAction}
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
