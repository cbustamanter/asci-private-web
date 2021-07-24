import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  useSearchUsersQuery,
  useUsersToCourseMutation,
} from "../generated/graphql";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  id: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  title,
  id,
}) => {
  const [arg, setArg] = useState<string>("");
  const [usersSelected, setUsersSelected] = useState<any[]>([]);
  const [response] = useSearchUsersQuery({ variables: { courseId: id } });
  const [, usersToCourse] = useUsersToCourseMutation();

  const handleUsers = () => {
    const ids = usersSelected.map((v) => v.id);
    usersToCourse({ ids, courseId: id });
    handleClose();
  };

  const handleClose = () => {
    setUsersSelected([]);
    setArg("");
    onClose();
  };

  const handleSearch = (value: string) => {};

  return (
    <Modal
      size="xl"
      blockScrollOnMount={false}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {title}
          <Text fontWeight="400" color="darkplate" fontSize="14.5px">
            Asigna estudiantes a este curso.
          </Text>
        </ModalHeader>
        {/* <InputGroup size="md">
          <InputLeftElement>
            <Search2Icon />
          </InputLeftElement>
          <Input
            placeholder="Buscar"
            onInput={(e) => {
              handleSearch((e.target as HTMLInputElement).value);
              setArg(value);
            }}
          />
        </InputGroup> */}

        {response.data?.searchUsers?.length || usersSelected.length ? (
          <ModalBody maxHeight="40vh">
            {response.data?.searchUsers?.length ? (
              <Flex flexDirection="column">
                {response.data?.searchUsers.map((user) => {
                  return usersSelected.find((v) => v.id === user.id) ? null : (
                    <List key={user.id}>
                      <Tooltip label={user.email}>
                        <ListItem
                          p={4}
                          rounded="lg"
                          mb={2}
                          backgroundColor="gray.200"
                          cursor="pointer"
                          onClick={() =>
                            setUsersSelected(usersSelected.concat(user))
                          }
                          _hover={{
                            backgroundColor: "blue.500",
                            color: "white",
                          }}
                        >{`${user.names} ${user.surnames}`}</ListItem>
                      </Tooltip>
                    </List>
                  );
                })}
              </Flex>
            ) : null}
            {usersSelected && (
              <SimpleGrid columns={4} spacing={4}>
                {usersSelected.map((v) => (
                  <Tag
                    size={"md"}
                    key={v.id}
                    variant="solid"
                    colorScheme="teal"
                  >
                    <Tooltip label={v.email}>
                      <TagLabel>{`${v.names} ${v.surnames}`}</TagLabel>
                    </Tooltip>
                    <TagCloseButton
                      onClick={() =>
                        setUsersSelected(
                          usersSelected.filter((user) => user.id !== v.id)
                        )
                      }
                    />
                  </Tag>
                ))}
              </SimpleGrid>
            )}
          </ModalBody>
        ) : null}
        <ModalFooter>
          <Button
            rounded="lg"
            colorScheme="gray"
            ml={3}
            onClick={() => handleClose()}
          >
            Cerrar
          </Button>
          {usersSelected.length ? (
            <Button
              rounded="lg"
              colorScheme="blue"
              ml={3}
              onClick={() => handleUsers()}
            >
              Agregar
            </Button>
          ) : null}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
