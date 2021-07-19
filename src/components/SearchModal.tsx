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
  ModalOverlay,
  SimpleGrid,
  Tag,
  TagCloseButton,
  TagLabel,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSearchUsersQuery } from "../generated/graphql";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [arg, setArg] = useState<string>("");
  const [usersSelected, setUsersSelected] = useState<any[]>([]);
  const [response] = useSearchUsersQuery({ variables: { arg } });
  const handleUsers = () => {
    const userIds = usersSelected.map((v) => v.id);
    console.log(userIds);
  };
  return (
    <Modal
      size="xl"
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <InputGroup size="lg" height="68px">
          <InputLeftElement height="68px">
            <Search2Icon />
          </InputLeftElement>
          <Input
            height="68px"
            placeholder="Buscar"
            onInput={(e) => {
              const value = (e.target as HTMLInputElement).value;
              setArg(value);
            }}
          />
        </InputGroup>

        {response.data?.searchUsers?.length || usersSelected.length ? (
          <ModalBody>
            {response.data?.searchUsers?.length ? (
              <Flex flexDirection="column">
                {response.data?.searchUsers.map((user) => {
                  return usersSelected.find((v) => v.id === user.id) ? null : (
                    <List key={user.id}>
                      <ListItem
                        p={4}
                        rounded="lg"
                        mb={2}
                        backgroundColor="gray.200"
                        cursor="pointer"
                        onClick={() =>
                          setUsersSelected(usersSelected.concat(user))
                        }
                        _hover={{ backgroundColor: "blue.500", color: "white" }}
                      >{`${user.names} ${user.surnames}`}</ListItem>
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
                    <TagCloseButton />
                  </Tag>
                ))}
              </SimpleGrid>
            )}
          </ModalBody>
        ) : null}
        {usersSelected.length ? (
          <ModalFooter>
            <Button
              rounded="lg"
              colorScheme="blue"
              ml={3}
              onClick={() => handleUsers()}
            >
              Agregar
            </Button>
          </ModalFooter>
        ) : null}
      </ModalContent>
    </Modal>
  );
};
