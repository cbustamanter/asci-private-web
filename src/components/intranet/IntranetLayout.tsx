import { GridItem, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { SideBarState } from "../../redux/reducers/sidebar";
import { IntranetSidebar } from "./IntranetSidebar";

interface IntranetLayoutProps {}

export const IntranetLayout: React.FC<IntranetLayoutProps> = ({ children }) => {
  const isSideBarOpen = useSelector<SideBarState>(
    (state) => state.isSideBarOpen
  );
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
      <GridItem
        colSpan={isSideBarOpen ? 10 : 12}
        fontSize="14.5px"
        color="darkplate"
      >
        {children}
      </GridItem>
    </SimpleGrid>
  );
};
