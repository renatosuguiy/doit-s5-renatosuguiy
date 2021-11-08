import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Center,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FaClipboard, FaTimes } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { Input } from "../Form/input";
import * as yup from "yup";
import { TextArea } from "../Form/TextArea";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";

interface TaskData {
  title: string;
  description: string;
}

interface ModalCreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

const createTaskSchema = yup.object().shape({
  title: yup.string().required("Campo obrigatório"),
  description: yup
    .string()
    .required("Campo obrigatório")
    .max(100, "Máximo de 100 caracteres"),
});

export const ModalCreateTask = ({ isOpen, onClose }: ModalCreateTaskProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createTaskSchema),
  });

  const { user, accessToken } = useAuth();
  const { createTask } = useTasks();

  const handleCreateTask = (data: TaskData) => {
    const newData = { ...data, userId: user.id, completed: false };
    createTask(newData, accessToken).then((res) => onClose());
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          as='form'
          onSubmit={handleSubmit(handleCreateTask)}
          padding='2'
          bg='white'
          color='gray.800'
        >
          <ModalHeader display='flex'>
            <Center bg='purple.500' w='30px' h='30px' borderRadius='5px'>
              <FaClipboard color={theme.colors.white} />
            </Center>
            <Text fontWeight='bold' ml='2'>
              Adicionar{" "}
            </Text>
            <Center
              onClick={onClose}
              as='button'
              ml='auto'
              w='32px'
              h='32px'
              bg='red.600'
              fontSize='lg'
              borderRadius='md'
            >
              <FaTimes color={theme.colors.white} />
            </Center>
          </ModalHeader>
          <ModalBody textAlign='center'>
            <VStack spacing='5'>
              <Input
                label='Titulo'
                error={errors.title}
                {...register("title")}
                placeholder='Digite o titulo'
              />
              <TextArea
                label='Descrição'
                error={errors.description}
                {...register("description")}
                placeholder='Digite o titulo'
              />
            </VStack>
          </ModalBody>

          <ModalFooter flexDirection='column'>
            <Button
              type='submit'
              bg='purple.500'
              color='white'
              w='100%'
              h='60px'
              _hover={{ bg: "purple.600" }}
            >
              Adicionar Tarefa
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
