import { Flex, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { SignUpInfo } from "./SignUpInfo";
import { SignUpForm } from "./SignUpForm";
import { GoBackButton } from "./GoBackButton";
import { api } from "../../services/api";
import { ModalSuccess } from "../../components/Modal/ModalSuccess";
import { ModalError } from "../../components/Modal/ModalError";
import { useHistory } from "react-router";

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
  name: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();

  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure();

  const handleSignUp = ({ name, email, password }: SignUpData) => {
    api
      .post("/register", { name, email, password })
      .then((response) => {
        setLoading(false);
        onModalSuccessOpen();
      })
      .catch((err) => {
        setLoading(false);
        onModalErrorOpen();
      });
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });
  const history = useHistory();

  return (
    <>
      <ModalSuccess
        buttonMessage='Ir para o login agora'
        message='Seu cadastro deu super certo, <b>vamos lá</b>'
        secondaryText='Você já pode começar criando <b>suas listas</b> de tarefas agora mesmo...'
        isOpen={isModalSuccessOpen}
        onClose={onModalSuccessClose}
        onClick={() => history.push("/")}
      />
      <ModalError
        error='Seu email já está em uso'
        isOpen={isModalErrorOpen}
        onClose={onModalErrorClose}
        secondaryText='Você já pode tentar novamente, <b> clicando</b> no botão acima ou aguarde alguns minutos...'
      />
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
        >
          {isWideVersion ? (
            <>
              <GoBackButton top='75' left='24' />
              <SignUpForm
                errors={errors}
                handleSignUp={handleSubmit(handleSignUp)}
                loading={loading}
                register={register}
              />
              <SignUpInfo />
            </>
          ) : (
            <>
              <GoBackButton top='10' left='75vw' />
              <SignUpInfo />
              <SignUpForm
                errors={errors}
                handleSignUp={handleSubmit(handleSignUp)}
                loading={loading}
                register={register}
              />
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
