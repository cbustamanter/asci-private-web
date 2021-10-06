import { Button, useToast } from "@chakra-ui/react";
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
  const toast = useToast();
  return (
    <Dropzone
      onDrop={(acceptedFiles, _, event) => complete(acceptedFiles, event)}
      onDropRejected={(error) =>
        toast({ description: error[0].errors[0].message, status: "error" })
      }
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
