import { Box, BoxProps, Heading, useColorMode } from "@chakra-ui/react";
import React from "react";

type SectionHeadingProps = BoxProps & {
  title: string;
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  ...props
}) => {
  const { colorMode } = useColorMode();

  const color = { light: "platedarker", dark: "white" };
  return (
    <Box {...props}>
      <Heading color={color[colorMode]} fontSize={28}>
        {title}
      </Heading>
    </Box>
  );
};
