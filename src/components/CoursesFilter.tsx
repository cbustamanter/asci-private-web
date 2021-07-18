import { Box, Select } from "@chakra-ui/react";
import React from "react";

interface CoursesFilterProps {
  onChange: (val: string) => void;
}

export const CoursesFilter: React.FC<CoursesFilterProps> = ({ onChange }) => {
  return (
    <Box ml={[0, 6]} width={["100w", "auto"]}>
      <Select defaultValue="1" onChange={(e) => onChange(e.target.value)}>
        <option value="1">Cursos Activos</option>
        <option value="2">Cursos Inactivos</option>
        <option value="3">No Iniciados</option>
        <option value="0">Todos</option>
      </Select>
    </Box>
  );
};
