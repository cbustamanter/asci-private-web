import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import Dropzone from "react-dropzone";
import { BiPhotoAlbum } from "react-icons/bi";

interface RegularDropzoneProps {
  complete: (files: File[]) => void;
  name?: string;
  allowMultiple?: boolean;
}
//TODO: Show error that indicates uploaded file surpass maxfile size
export const RegularDropzone: React.FC<RegularDropzoneProps> = ({
  complete,
  name,
  allowMultiple,
}) => {
  const multiple = allowMultiple ? true : false;
  return (
    <Dropzone
      onDrop={(acceptedFiles) => complete(acceptedFiles)}
      multiple={multiple}
      maxSize={5000000}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} name={name} />
          <Flex
            flexDirection="column"
            alignItems="center"
            border="dashed 1px"
            borderColor="gray.400"
            cursor="pointer"
            py={6}
          >
            <Icon as={BiPhotoAlbum} color="gray.400" fontSize="xxx-large" />
            <Text>Agrega una portada para el curso</Text>
            <Text color="gray.500">Formato recomendado: 580x278 px</Text>
            <Text color="gray.500">Tamaño máximo: 5 mb</Text>
          </Flex>
        </div>
      )}
    </Dropzone>
  );
};
