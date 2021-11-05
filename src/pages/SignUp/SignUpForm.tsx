import { Grid, Heading, VStack, Box, Button, Text } from "@chakra-ui/react";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Input } from "../../components/Form/input";

interface SignUpData {
  handleSignUp: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
  loading: boolean;
}

export const SignUpForm = ({
  handleSignUp,
  errors,
  register,
  loading,
}: SignUpData) => {
  return (
    <Grid
      as='form'
      onSubmit={handleSignUp}
      mt={["4", "4", 0, 0]}
      w={["100%", "100%", "40%", "40%"]}
      padding='40px 25px'
      border='3px solid'
      borderColor='gray.100'
      bg='white'
      color='gray.900'
    >
      <Heading size='lg'>Crie sua conta</Heading>
      <VStack mt='6' spacing='5'>
        <Box w='100%'>
          <Input
            placeholder='Digite seu nome'
            label='Nome'
            icon={FaUser}
            error={errors.name}
            {...register("name")}
          />
          <Input
            placeholder='Digite seu login'
            icon={FaEnvelope}
            label='Login'
            type='email'
            error={errors.email}
            {...register("email")}
          />
          {!errors.email && (
            <Text ml='1' color='gray.300'>
              Exemplo: nome@email.com
            </Text>
          )}
        </Box>
        <Input
          placeholder='Digite sua senha'
          icon={FaLock}
          label='Senha'
          error={errors.password}
          type='password'
          {...register("password")}
        />
        <Input
          placeholder='Confirme sua senha'
          icon={FaLock}
          label='Confirmação de Senha'
          error={errors.confirm_password}
          type='password'
          {...register("confirm_password")}
        />
      </VStack>
      <Button
        mt='8'
        isLoading={loading}
        bg='purple.800'
        w='100%'
        color='white'
        h='60px'
        borderRadius='8px'
        _hover={{ background: "purple.900" }}
        type='submit'
      >
        Finalizar cadastro
      </Button>
    </Grid>
  );
};
