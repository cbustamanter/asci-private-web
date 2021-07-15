import { Button } from "@chakra-ui/react";
import React from "react";
import Dropzone, { DropEvent } from "react-dropzone";

interface AddSessionFilesProps {
  complete: (files: File[], event: DropEvent) => void;
  name?: string;
}

export const AddSessionFiles: React.FC<AddSessionFilesProps> = ({
  complete,
  name,
}) => {
  return (
    <Dropzone
      onDrop={(acceptedFiles, _, event) => complete(acceptedFiles, event)}
    >
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
