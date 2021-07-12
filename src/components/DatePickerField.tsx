import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import es from "date-fns/locale/es";
import { useField } from "formik";
import React, { HTMLAttributes } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  isClearable?: boolean;
  onChange: (date: Date) => any;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
  showTimeSelect?: boolean | undefined;
  showTimeSelectOnly?: boolean | undefined;
  label: string;
  name: string;
  minDate?: Date | null | undefined;
  maxTime?: Date | undefined;
  minTime?: Date | undefined;
  dateFormat?: string | undefined;
}

registerLocale("es", es);
export const DatePickerField: React.FC<Props & HTMLAttributes<HTMLElement>> = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  showTimeSelect,
  showTimeSelectOnly,
  onSelect: _,
  label,
  minDate,
  minTime,
  maxTime,
  dateFormat,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <ReactDatePicker
        selected={selectedDate}
        locale="es"
        onChange={onChange}
        isClearable={isClearable}
        dateFormat={dateFormat}
        minTime={minTime}
        maxTime={maxTime}
        minDate={minDate}
        showTimeSelect={showTimeSelect}
        showTimeSelectOnly={showTimeSelectOnly}
        showPopperArrow={showPopperArrow}
        {...props}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
