import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  useMultiStyleConfig,
  useStyleConfig,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label: string;
    textarea?: boolean;
  };

export const InputField: React.FC<InputFieldProps> = ({
  label,
  textarea,
  size: _,
  ...props
}) => {
  const styles = useStyleConfig("InputOrTextarea");
  const _placeholderStyle = (styles as any)._placeholder;

  const InputOrTextarea = textarea ? Textarea : Input;
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea
        _placeholder={_placeholderStyle}
        sx={styles}
        {...field}
        {...props}
        id={field.name}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
