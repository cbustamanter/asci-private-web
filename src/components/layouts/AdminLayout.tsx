import { Container } from "@chakra-ui/react";
import React from "react";
import { Sidebar } from "../Sidebar";

interface AdminLayoutProps {}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Container minHeight="100vh" display="flex" maxWidth="100vw" p={0}>
      <Sidebar></Sidebar>
      <Container maxHeight="100vh" maxWidth="100%" p={0} m={0}>
        {children}
      </Container>
    </Container>
  );
};
