import { Flex, Text, Image, Box, Icon } from "@chakra-ui/react";
import React from "react";
import { BiUserCircle } from "react-icons/bi";
import {
  RiChatQuoteLine,
  RiFileTextFill,
  RiLayoutLine,
  RiStackFill,
} from "react-icons/ri";
import { S3_URL } from "../utils/constant";
import { SidebarSection } from "./SidebarSection";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const intranetItems = [
    {
      icon: <Icon as={BiUserCircle} fontSize={24} mr={1} />,
      text: "Estudiantes",
      route: "/admin/users",
    },
    {
      icon: <Icon as={RiStackFill} fontSize={24} mr={1} />,
      text: "Cursos",
      route: "/admin/courses",
    },
    {
      icon: <Icon as={RiFileTextFill} fontSize={24} mr={1} />,
      text: "Exámenes",
      route: "/admin/quizzes",
    },
  ];
  const publicItems = [
    {
      icon: <Icon as={RiStackFill} fontSize={24} mr={1} />,
      text: "Cursos",
      route: "/admin/publicCourses",
    },
    {
      icon: <Icon as={RiLayoutLine} fontSize={24} mr={1} />,
      text: "Banners",
      route: "/admin/banners",
    },
    {
      icon: <Icon as={RiChatQuoteLine} fontSize={24} mr={1} />,
      text: "Blog",
      route: "/admin/blog",
    },
  ];
  return (
    <Box
      backgroundColor="blue.900"
      color="white"
      width="256px"
      minHeight="100vh"
    >
      <Flex justifyContent="center" my={12}>
        <Image
          width="90px"
          height="104px"
          src={`${S3_URL}/public-assets/logo-admin.png`}
        />
      </Flex>
      <SidebarSection title="INTRANET" items={intranetItems} />
      {/* <SidebarSection mt={8} title="WEB PÚBLICA" items={publicItems} /> */}
    </Box>
  );
};
