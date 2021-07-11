import { Button } from "@chakra-ui/react";
import React from "react";
import Dropzone from "react-dropzone";

interface AddSessionFilesProps {
  complete: (files: File[]) => void;
}

export const AddSessionFiles: React.FC<AddSessionFilesProps> = ({
  complete,
}) => {
  return (
    <Dropzone onDrop={(acceptedFiles) => complete(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Button variant="link" width="fit-content" mt={4}>
            Agregar material didáctico
          </Button>
        </div>
      )}
    </Dropzone>
  );
};
