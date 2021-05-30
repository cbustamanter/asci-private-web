import { Box, Flex, StackDivider, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { SidebarSection } from "./SidebarSection";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const intranetItems = [
    { icon: <Text></Text>, text: "Cursos" },
    { icon: <Text></Text>, text: "Estudiantes" },
    { icon: <Text></Text>, text: "Exámenes" },
  ];
  const publicItems = [
    { icon: <Text></Text>, text: "Cursos" },
    { icon: <Text></Text>, text: "Banners" },
    { icon: <Text></Text>, text: "Blog" },
  ];
  return (
    <Flex
      backgroundColor="blue.900"
      color="white"
      width="256px"
      minHeight="100vh"
      alignItems="center"
    >
      <Flex flexDirection="column">
        <SidebarSection title="INTRANET" items={intranetItems} />
        <SidebarSection mt={8} title="WEB PÚBLICA" items={publicItems} />
      </Flex>
    </Flex>
  );
};
