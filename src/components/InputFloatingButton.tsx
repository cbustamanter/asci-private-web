import { ViewIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import React from "react";

type InputFloatingButtonProps = IconButtonProps & {};

export const InputFloatingButton: React.FC<InputFloatingButtonProps> = ({
  ...props
}) => (
  <IconButton
    {...props}
    background="transparent"
    variant="ghost"
    color="platelight"
    // onClick={() => showHideSecondP()}
    right="0"
    top="34%"
    position="absolute"
    zIndex="2"
    icon={<ViewIcon />}
  />
);
