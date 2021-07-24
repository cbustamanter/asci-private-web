import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "../admin/Navbar";
import { Sidebar } from "../Sidebar";

interface AdminLayoutProps {}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Container minHeight="100vh" display="flex" maxWidth="100vw" p={0}>
      <Sidebar></Sidebar>
      <Container
        backgroundColor="white"
        maxHeight="100vh"
        maxWidth="100%"
        p={0}
        m={0}
        overflowY="auto"
        overflowX="hidden"
      >
        <Navbar />
        {children}
      </Container>
    </Container>
  );
};
