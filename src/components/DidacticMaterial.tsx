import { Box, Flex, Icon, Link, useColorModeValue } from "@chakra-ui/react";
import { FieldArray, useField, useFormikContext } from "formik";
import React, { useCallback } from "react";
import { TiDelete } from "react-icons/ti";
import { S3_URL } from "../utils/constant";
import { AddSessionFiles } from "./AddSessionFiles";

interface DidacticMaterial {
  name: string;
  hasAddFiles?: boolean;
}

export const DidacticMaterial: React.FC<DidacticMaterial> = ({
  children,
  hasAddFiles = true,
  ...props
}) => {
  const [field] = useField(props);
  const filesBg = useColorModeValue("#E6EAED", "gray.600");
  let value: any[] = field.value;
  const { setFieldValue } = useFormikContext();
  const onDrop = useCallback(
    (files: any[]) => {
      if (value?.length) {
        setFieldValue(`${field.name}`, value.concat(files));
        return;
      }
      setFieldValue(`${field.name}`, files);
    },
    [value]
  );

  return (
    <FieldArray name={`${field.name}`}>
      {({ remove }) => (
        <>
          {value?.map((v, idx) => (
            <Flex key={v.idx + v.name} backgroundColor={filesBg} p={2} mt={3}>
              <Box>
                {v.filename ? (
                  <Link href={`${S3_URL}${v.filename}`} isExternal>
                    {v.name}
                  </Link>
                ) : (
                  v.name
                )}
              </Box>
              <Box ml="auto" cursor="pointer" onClick={() => remove(idx)}>
                <Icon as={TiDelete} fontSize="x-large" />
              </Box>
            </Flex>
          ))}
          {hasAddFiles && (
            <AddSessionFiles
              complete={(test) => {
                onDrop(test);
              }}
            />
          )}
        </>
      )}
    </FieldArray>
  );
};
