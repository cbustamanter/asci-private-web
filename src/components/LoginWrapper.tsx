import { Flex, FlexProps } from "@chakra-ui/layout";
import { useStyleConfig } from "@chakra-ui/react";
import React from "react";

type LoginWrapperProps = FlexProps & {};
export const LoginWrapper: React.FC<LoginWrapperProps> = ({
  children,
  ...props
}) => {
  const styles = useStyleConfig("LoginWrapper");
  return (
    <Flex __css={styles} {...props}>
      {children}
    </Flex>
  );
};
