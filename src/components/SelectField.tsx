import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  forwardRef,
  useStyleConfig,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { SelectHTMLAttributes } from "react";

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  size: _,
  children,
  ...props
}) => {
  const styles = useStyleConfig("SelectField");
  const _placeholderStyle = (styles as any)._placeholder;
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Select
        {...field}
        {...props}
        sx={styles}
        _placeholder={_placeholderStyle}
        id={field.name}
      >
        {children}
      </Select>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
