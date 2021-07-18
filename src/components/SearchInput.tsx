import { Box, Input } from "@chakra-ui/react";
import React from "react";
import { debounce } from "../utils/debounce";

interface SearchInputProps {
  onInput: (value: string) => void;
  placeholder: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onInput,
  placeholder,
}) => {
  return (
    <Box>
      <Input
        placeholder={placeholder}
        onInput={(e) => {
          const value = (e.target as HTMLInputElement).value;
          const debounceFn = debounce(onInput, 500);
          debounceFn(value);
        }}
      />
    </Box>
  );
};
