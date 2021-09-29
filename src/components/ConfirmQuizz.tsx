import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface ConfirmQuizzProps {
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
}

export const ConfirmQuizz: React.FC<ConfirmQuizzProps> = ({
  onClose,
  isOpen,
  handleConfirm,
}) => {
  const confirm = () => {
    handleConfirm();
    onClose();
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tienes preguntas sin responder</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Para asegurar una nota aprobatoria debes contestar todas las
          preguntas. ¿Deseas terminar tu examen de todos modos?
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" onClick={onClose} mr={4}>
            Cancelar
          </Button>
          <Button onClick={confirm}>Terminar de todos modos</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
