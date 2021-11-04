import {
  Flex,
  Grid,
  Image,
  Heading,
  Text,
  VStack,
  Button,
  Box,
} from "@chakra-ui/react";
import { Input } from "../../components/Form/input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { SignUpInfo } from "./SignUpInfo";
import { SignUpForm } from "./SignUpForm";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup.string().required("Senha obrigatória"),
  confirm_password: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password"), "Senhas diferentes"]),
});

interface SignUpData {
  email: string;
  password: string;
}

export const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignIn = (data: SignUpData) => {
    console.log(data);
  };

  return (
    <Flex
      padding={["10px 15px", "10px 15px", "0", "0"]}
      alignItems='center'
      justifyContent='center'
      height={["auto", "auto", "100vh", "100vh"]}
      bgGradient={[
        "linear(to-b, purple.800 65%, white 35%)",
        "linear(to-b, purple.800 65%, white 35%)",
        "linear(to-l, purple.800 65%, white 35%)",
        "linear(to-l, purple.800 65%, white 35%)",
      ]}
      color='white'
    >
      <Flex
        w={["100%", "100%", "90%", "65%"]}
        justifyContent='center'
        flexDirection={["column", "column", "row", "row"]}
        alignItems='center'
      >
        <SignUpForm
          errors={errors}
          handleSignUp={handleSubmit(handleSignIn)}
          loading={loading}
          register={register}
        />
        <SignUpInfo />
      </Flex>
    </Flex>
  );
};
