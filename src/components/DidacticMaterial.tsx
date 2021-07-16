import { Box, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { FieldArray, useField, useFormikContext } from "formik";
import React, { useCallback } from "react";
import { TiDelete } from "react-icons/ti";
import { AddSessionFiles } from "./AddSessionFiles";

interface DidacticMaterial {
  name: string;
}

export const DidacticMaterial: React.FC<DidacticMaterial> = ({
  children,
  ...props
}) => {
  const [field] = useField(props);
  console.log(field.value);
  const filesBg = useColorModeValue("#E6EAED", "gray.600");
  let value: File[] = field.value;
  const { setFieldValue } = useFormikContext();
  const onDrop = useCallback((files) => {
    setFieldValue(`${field.name}`, files);
  }, []);
  return (
    <FieldArray name={`${field.name}`}>
      {({ remove }) => (
        <>
          {value?.map((v, idx) => (
            <Flex key={v.name} backgroundColor={filesBg} p={2} mt={3}>
              <Box>{v.name}</Box>
              <Box ml="auto" cursor="pointer" onClick={() => remove(idx)}>
                <Icon as={TiDelete} fontSize="x-large" />
              </Box>
            </Flex>
          ))}
          <AddSessionFiles
            complete={(test) => {
              onDrop(test);
            }}
          />
        </>
      )}
    </FieldArray>
  );
};
