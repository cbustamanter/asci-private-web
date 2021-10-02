import { Box, HStack, Icon, useMultiStyleConfig } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons";
import NextLink from "next/link";

interface SidebarItemProps {
  text: string;
  icon: IconType;
  route: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  text,
  icon,
  route,
}) => {
  const { pathname } = useRouter();
  const variant = pathname == route ? "active" : "";
  const styles = useMultiStyleConfig("SidebarItem", { variant });
  return (
    <NextLink href={route}>
      <HStack
        cursor="pointer"
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <Icon as={icon} __css={styles.Icon} />
        <Box __css={styles.Text}>{text}</Box>
      </HStack>
    </NextLink>
  );
};
