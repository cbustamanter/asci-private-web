import { Box, Select } from "@chakra-ui/react";
import React from "react";

interface QuizzesFilterProps {
  onChange: (val: string) => void;
}

export const QuizzesFilter: React.FC<QuizzesFilterProps> = ({ onChange }) => {
  return (
    <Box ml={[0, 6]} width={["100w", "auto"]}>
      <Select defaultValue="1" onChange={(e) => onChange(e.target.value)}>
        <option value="1">Activos</option>
        <option value="2">Inactivos</option>
        <option value="0">Todos</option>
      </Select>
    </Box>
  );
};
