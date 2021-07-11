import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  SimpleGrid,
  Table,
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
import {
  useChangeUserStatusMutation,
  useGetUsersQuery,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { debounce } from "../../../utils/debounce";

const Index: React.FC<{}> = ({}) => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
    status: 1,
    search: null as null | string,
  });
  const [{ data, fetching, error }] = useGetUsersQuery({ variables });
  const [, changeUserStatus] = useChangeUserStatusMutation();

  const searchUser = (value: string) => {
    setVariables({
      limit: variables.limit,
      cursor: variables.cursor,
      status: variables.status,
      search: value.toLowerCase(),
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
      <SectionHeading title="Estudiantes" />
      <SimpleGrid minChildWidth="200px" spacingY={[4, 0]} mt={[4, 6]}>
        <Box>
          <Input
            placeholder="Buscar por nombre o correo"
            onInput={(e) => {
              const value = (e.target as HTMLInputElement).value;
              const debounceFn = debounce(searchUser, 500);
              debounceFn(value);
            }}
          />
        </Box>
        <Box ml={[0, 6]} width={["100w", "auto"]}>
          <Select
            defaultValue="1"
            onChange={(e) =>
              setVariables({
                limit: variables.limit,
                cursor: variables.cursor,
                status: parseInt(e.target.value),
                search: variables.search,
              })
            }
          >
            <option value="1">Estudiantes Activos</option>
            <option value="0">Estudiantes Inactivos</option>
            <option value="2">Todos</option>
          </Select>
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
        <Box>Cargando...</Box>
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
              {!data?.getUsers.users.length ? (
                <EmptyTable colspan={7} />
              ) : (
                data.getUsers.users.map((user, idx) => {
                  return (
                    <Tr key={user.id}>
                      <Td>{idx + 1}</Td>
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
                            <MenuItem
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
                            <MenuItem>Asigna Curso</MenuItem>
                            <NextLink href={`/admin/users/edit/${user.id}`}>
                              <MenuItem>Editar</MenuItem>
                            </NextLink>
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
      {data && data.getUsers.hasMore ? (
        <Flex>
          <Button
            m="auto"
            my={6}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor:
                  data.getUsers.users[data.getUsers.users.length - 1].createdAt,
                status: variables.status,
                search: variables.search,
              });
            }}
          >
            Cargar Mas
          </Button>
        </Flex>
      ) : null}
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient)(Index);
