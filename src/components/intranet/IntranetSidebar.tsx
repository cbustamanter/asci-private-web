import { GridItem, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { RiFileTextFill, RiStackFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { SideBarState } from "../../redux/reducers/sidebar";
import { S3_URL } from "../../utils/constant";
import { useIsAuth } from "../../utils/useIsAuth";
import { SidebarItem } from "./SidebarItem";

interface IntranetSidebarProps {}

export const IntranetSidebar: React.FC<IntranetSidebarProps> = ({}) => {
  const { data } = useIsAuth();
  let body = <></>;
  const isSideBarOpen = useSelector<SideBarState>(
    (state) => state.isSideBarOpen
  );
  if (data) {
    const profileImg = data.gender == 1 ? "boyprofile" : "girlprofile";
    const profileUrl = `${S3_URL}/public-assets/${profileImg}.png`;
    body = (
      <GridItem
        colSpan={2}
        backgroundColor="blue.900"
        borderRight="1px solid"
        borderRightColor="blue.700"
        color="white"
        maxWidth="256px"
        height="100vh"
        position="sticky"
        display={isSideBarOpen ? "block" : "none"}
        top={0}
      >
        <Stack alignItems="center" mt={12}>
          <Image
            src={profileUrl}
            borderRadius="full"
            backgroundColor="blue.500"
            boxSize="80px"
            alt="Foto"
            mb={4}
          />
          <Text
            lineHeight="24px"
            fontWeight="700"
            fontSize="18px"
            maxWidth="170px"
          >
            {data.names} {data.surnames}
          </Text>
        </Stack>
        <Stack px={6} py={8}>
          <Text
            mb={4}
            color="darkplate"
            fontSize="12px"
            fontWeight="700"
            letterSpacing="0.1em"
          >
            ESTUDIANTE
          </Text>
          <SidebarItem text="Mis cursos" icon={RiStackFill} route="/intranet" />
          <SidebarItem
            text="Mis exámenes"
            icon={RiFileTextFill}
            route="/intranet/quizzes"
          />
        </Stack>
      </GridItem>
    );
  }
  return body;
};
