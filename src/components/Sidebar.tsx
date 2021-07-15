import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { SidebarSection } from "./SidebarSection";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const intranetItems = [
    { icon: <Text></Text>, text: "Estudiantes", route: "/admin/users" },
    { icon: <Text></Text>, text: "Cursos", route: "/admin/courses" },
    { icon: <Text></Text>, text: "Exámenes", route: "/admin/tests" },
  ];
  const publicItems = [
    { icon: <Text></Text>, text: "Cursos", route: "/admin/publicCourses" },
    { icon: <Text></Text>, text: "Banners", route: "/admin/banners" },
    { icon: <Text></Text>, text: "Blog", route: "/admin/blog" },
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
