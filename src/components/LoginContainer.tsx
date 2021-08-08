import { Box, Heading, Icon, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { RiFacebookBoxLine, RiLinkedinBoxLine } from "react-icons/ri";
import { S3_URL } from "../utils/constant";
import { Container } from "./Container";
import { SocialMediaSection } from "./SocialMediaSection";
import { WelcomeSection } from "./WelcomeSection";

interface LoginContainerProps {}

export const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return (
    <Container
      background={`url(${S3_URL}/public-assets/bg-2.png)`}
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
      alignItems="center"
      justifyContent="space-evenly"
      minHeight="100vh"
    >
      <Stack w="64px" h="56px" position="absolute" left={20} top={20}>
        <Image src={`${S3_URL}/public-assets/logo-login.png`} />
      </Stack>
      <WelcomeSection />
      {children}
      <SocialMediaSection />
    </Container>
  );
};
