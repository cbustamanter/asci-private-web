import { Flex, Icon, Text, useToast } from "@chakra-ui/react";
import React from "react";
import Dropzone from "react-dropzone";
import { BiPhotoAlbum } from "react-icons/bi";

interface RegularDropzoneProps {
  complete: (files: File[]) => void;
  name?: string;
  allowMultiple?: boolean;
}
export const RegularDropzone: React.FC<RegularDropzoneProps> = ({
  complete,
  name,
  allowMultiple,
}) => {
  const multiple = allowMultiple ? true : false;
  const toast = useToast();
  return (
    <Dropzone
      onDropAccepted={(acceptedFiles) => complete(acceptedFiles)}
      onDropRejected={(error) =>
        toast({ description: error[0].errors[0].message, status: "error" })
      }
      multiple={multiple}
      maxSize={5242880}
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
