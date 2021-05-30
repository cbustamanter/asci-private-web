import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import {
  useChangeUserStatusMutation,
  useGetUsersQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { debounce } from "../../utils/debounce";

const Users: React.FC<{}> = ({}) => {
  const [variables, setVariables] = useState({
    limit: 15,
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
    <Flex px={[8, 10]} py={[4, 10]} flexDirection="column">
      <Box>
        <Heading>Estudiantes</Heading>
      </Box>
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
          <Button width={["100%", "auto"]}>Crear Estudiante</Button>
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
                <Th>Nombres</Th>
                <Th>Apellidos</Th>
                <Th>Correo</Th>
                <Th>Celular</Th>
                <Th>Género</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!data?.getUsers.users.length ? (
                <>
                  <Tr>
                    <Td colSpan={7}>
                      <div>
                        <Table>
                          <Tbody>
                            <Tr>
                              <Td>No existe data</Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </div>
                    </Td>
                  </Tr>
                </>
              ) : (
                data.getUsers.users.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.names}</Td>
                    <Td>{user.surnames}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.cellphone}</Td>
                    <Td>{user.genderText}</Td>
                    <Td>
                      <Flex>
                        <Box>{user.statusText}</Box>
                        <Box ml="auto">
                          <Switch
                            size="md"
                            defaultChecked={!!user.status}
                            value={user.status}
                            onChange={() => {
                              const status = (user.status ^= 1);
                              changeUserStatus({
                                id: user.id,
                                status,
                              });
                            }}
                          />
                        </Box>
                      </Flex>
                    </Td>
                    <Td color="blue.500">
                      <Text>Asigna Curso</Text>
                      <Text>Editar</Text>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Flex>
      )}
    </Flex>
  );
};
export default withUrqlClient(createUrqlClient)(Users);
