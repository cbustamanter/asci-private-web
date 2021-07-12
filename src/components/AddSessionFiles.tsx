import { Button } from "@chakra-ui/react";
import React from "react";
import Dropzone, { DropEvent } from "react-dropzone";

interface AddSessionFilesProps {
  complete: (files: File[], event: DropEvent, idx: number) => void;
  name?: string;
  idx: number;
}

export const AddSessionFiles: React.FC<AddSessionFilesProps> = ({
  complete,
  name,
  idx,
}) => {
  return (
    <Dropzone
      onDrop={(acceptedFiles, _, event) => complete(acceptedFiles, event, idx)}
    >
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} name={name} />
          <Button variant="link" width="fit-content" mt={4}>
            Agregar material didáctico
          </Button>
        </div>
      )}
    </Dropzone>
  );
};
