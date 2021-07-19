import { InfoIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tooltip,
  useStyleConfig,
} from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React, { InputHTMLAttributes } from "react";

type NumberInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

export const NumberInputFieldText: React.FC<NumberInputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const styles = useStyleConfig("InputOrTextarea");
  const { setFieldValue } = useFormikContext();
  const _placeholderStyle = (styles as any)._placeholder;
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <NumberInput
        _placeholder={_placeholderStyle}
        sx={styles}
        onChange={(v) => setFieldValue(`${field.name}`, v)}
        defaultValue={field.value}
        min={0}
      >
        <NumberInputField name={`${field.name}`} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
