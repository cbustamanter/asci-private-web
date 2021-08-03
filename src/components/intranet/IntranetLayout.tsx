import { GridItem, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { IntranetSidebar } from "./IntranetSidebar";

interface IntranetLayoutProps {}

export const IntranetLayout: React.FC<IntranetLayoutProps> = ({ children }) => {
  return (
    <SimpleGrid
      minHeight="100vh"
      width="full"
      maxWidth="8xl"
      marginInline="auto"
      columns={12}
      backgroundColor="blue.900"
    >
      <IntranetSidebar />
      <GridItem colSpan={10} fontSize="14.5px" color="darkplate">
        {children}
      </GridItem>
    </SimpleGrid>
  );
};
