import {
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { useLogoutMutation } from "../../generated/graphql";
import { S3_URL } from "../../utils/constant";
import { useIsAuth } from "../../utils/useIsAuth";

interface StudentAvatarProps {}

export const StudentAvatar: React.FC<StudentAvatarProps> = ({}) => {
  const { data } = useIsAuth();
  const [, logout] = useLogoutMutation();
  const profileImg = data?.gender == 1 ? "boyprofile" : "girlprofile";
  const profileUrl = `${S3_URL}/public-assets/${profileImg}.png`;
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<Avatar h="32px" w="32px" src={profileUrl} bg="blue.500" />}
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
  );
};
