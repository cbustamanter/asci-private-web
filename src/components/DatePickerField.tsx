import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import es from "date-fns/locale/es";
import { useField, useFormikContext } from "formik";
import React, { HTMLAttributes } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  isClearable?: boolean;
  showPopperArrow?: boolean;
  showTimeSelect?: boolean | undefined;
  showTimeSelectOnly?: boolean | undefined;
  label: string;
  name: string;
  minDate?: Date | null | undefined;
  maxDate?: Date | null | undefined;
  maxTime?: Date | undefined;
  minTime?: Date | undefined;
  dateFormat?: string | undefined;
  disabled?: boolean;
}

registerLocale("es", es);
export const DatePickerField: React.FC<Props & HTMLAttributes<HTMLElement>> = ({
  onChange,
  isClearable = false,
  showPopperArrow = false,
  showTimeSelect,
  showTimeSelectOnly,
  onSelect: _,
  label,
  minDate,
  maxDate,
  minTime,
  maxTime,
  dateFormat,
  disabled = false,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <ReactDatePicker
        locale="es"
        disabled={disabled}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        isClearable={isClearable}
        dateFormat={dateFormat}
        minTime={minTime}
        maxTime={maxTime}
        minDate={minDate}
        maxDate={maxDate}
        showTimeSelect={showTimeSelect}
        showTimeSelectOnly={showTimeSelectOnly}
        showPopperArrow={showPopperArrow}
        {...props}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
