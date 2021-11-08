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
  Center,
  Box,
  HStack,
  Heading,
  Flex,
  Progress,
} from "@chakra-ui/react";
import { FaCheck, FaCube, FaTimes, FaTrash } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";
import { theme } from "../../styles/theme";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ModalTaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export const ModalTaskDetail = ({
  isOpen,
  onClose,
  task,
}: ModalTaskDetailProps) => {
  const { user, accessToken } = useAuth();
  const { deleteTask, updateTask } = useTasks();

  const handleDelete = () => {
    deleteTask(task.id, accessToken);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding='2' bh='white' color='gray.800'>
          <ModalHeader display='flex' justifyContent='space-between'>
            <Flex>
              <Center bg='purple.500' w='30px' h='30px' borderRadius='5px'>
                <FaCube color={theme.colors.white} />
              </Center>
              <Text fontWeight='bold' ml='2'>
                Visualizar{" "}
              </Text>
            </Flex>
            <HStack>
              <Center
                as='button'
                w='30px'
                h='30px'
                borderWidth='1px'
                borderRadius='5px'
                borderColor='gray.200'
                bgColor='white'
                onClick={handleDelete}
              >
                <FaTrash color={theme.colors.gray["300"]} />
              </Center>
              <Center
                as='button'
                w='30px'
                h='30px'
                borderWidth='1px'
                borderRadius='5px'
                borderColor='gray.200'
                bgColor='white'
                onClick={() => updateTask(task.id, user.id, accessToken)}
              >
                <FaCheck color={theme.colors.gray["300"]} />
              </Center>
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
            </HStack>
          </ModalHeader>
          <ModalBody>
            <Heading as='h1' fontSize='2xl'>
              {task.title}
            </Heading>
            <Text color={theme.colors.gray["400"]}>{task.description}</Text>
          </ModalBody>
          <Box padding='6'>
            <Progress colorScheme='purple' value={task.completed ? 100 : 10} />
            <Text color='gray.200' mt='3'>
              07 March 2021
            </Text>
          </Box>
          <ModalFooter flexDirection='column'></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
