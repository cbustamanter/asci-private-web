import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  body: string;
  params: any;
  onConfirm: (params: any) => void;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onClose,
  header,
  body,
  onConfirm,
  params,
}) => {
  const cancelRef = React.useRef<any>();
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{header}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{body}</AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="red" ml={3} onClick={() => onConfirm(params)}>
            Eliminar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
