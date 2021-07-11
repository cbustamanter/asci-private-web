import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

type SectionDescLoginProps = TextProps & {
  desc: string;
};

export const SectionDescLogin: React.FC<SectionDescLoginProps> = ({
  desc,
  ...props
}) => {
  return (
    <Text
      maxWidth="xs"
      fontWeight="20px"
      color="platedark"
      fontSize={14.5}
      {...props}
    >
      {desc}
    </Text>
  );
};
