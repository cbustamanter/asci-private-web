import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useLogoutMutation } from "../../generated/graphql";

type NavbarProps = FlexProps & {};

export const Navbar: React.FC<NavbarProps> = ({ ...props }) => {
  const router = useRouter();
  const [, logout] = useLogoutMutation();
  return (
    <Flex px={20} pt={4} {...props}>
      <Box ml="auto">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<Avatar bg="gray.400" size="sm" />}
            colorScheme="white"
            variant="unstyled"
          />
          <MenuList>
            <MenuItem
              onClick={async () => {
                await logout();
                router.replace("/login");
              }}
            >
              Cerrar sesión
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};
