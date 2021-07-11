import { Box, Link, StackProps, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface SidebarItem {
  icon:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  text: string;
  route: string;
}
type SidebarSectionProps = StackProps & {
  title: string;
  items: SidebarItem[];
};

export const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  items,
  ...props
}) => {
  const router = useRouter();
  const listItems = items.map((item) => (
    <Box key={item.text} className="sidebarElement">
      <NextLink href={item.route}>
        <Text
          className={
            router.route.indexOf(item.route) > -1 ? "active" : undefined
          }
          as={Link}
          fontSize={16}
          opacity="0.5"
          lineHeight="24px"
          fontWeight="bold"
        >
          {item.text}
        </Text>
      </NextLink>
    </Box>
  ));
  return (
    <VStack {...props} ml={6} spacing={4} align="flex-start">
      <Box>
        <Text opacity="0.5" lineHeight="20px" fontWeight="bold" fontSize={12}>
          {title}
        </Text>
      </Box>
      {listItems}
    </VStack>
  );
};
