import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { FaExclamation } from "react-icons/fa";
import { theme } from "../../styles/theme";

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
}

export const ModalError = ({ isOpen, onClose, error }: ModalErrorProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <FaExclamation color={theme.colors.red["500"]} />
          <ModalHeader>Oops!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Ocorreu algum erro! {error}</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              bg='red.500'
              color='white'
              w='100%'
              _hover={{ bg: "red.600" }}
              mr={3}
              onClick={onClose}
            >
              Tentar novamente
            </Button>
            {/* <Text>
              Você já pode tentar novamente, clicando no botão acima ou aguarde
              alguns minutos...
            </Text> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
