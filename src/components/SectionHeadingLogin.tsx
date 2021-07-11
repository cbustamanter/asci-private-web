import { Text, TextProps } from "@chakra-ui/react";
import React from "react";

type SectionHeadingLoginProps = TextProps & {
  title: string;
};

export const SectionHeadingLogin: React.FC<SectionHeadingLoginProps> = ({
  title,
  ...props
}) => {
  return (
    <Text
      mb={1}
      fontSize={20}
      fontWeight="bold"
      lineHeight="28px"
      color="platedarker"
      {...props}
    >
      {title}
    </Text>
  );
};
