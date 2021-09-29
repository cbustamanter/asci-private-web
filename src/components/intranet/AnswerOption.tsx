import {
  Box,
  Flex,
  FlexProps,
  Radio,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React from "react";

interface AnswerOptionProps extends FlexProps {
  variant: string;
  letter: string;
  text: string;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  variant,
  letter,
  text,
  onClick,
}) => {
  const styles = useMultiStyleConfig("AnswerOption", { variant });
  return (
    <Flex __css={styles.Container} onClick={onClick}>
      <Box __css={styles.Letter}>{letter}</Box>
      <Box __css={styles.Text}>{text}</Box>
      <Box __css={styles.Radio}>
        <Radio isChecked />
      </Box>
    </Flex>
  );
};
