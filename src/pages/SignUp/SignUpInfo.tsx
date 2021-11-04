import { Grid, Image, Heading, Text } from "@chakra-ui/react";
import LogoSecondary from "../../assets/logo-secondary.svg";

export const SignUpInfo = () => {
  return (
    <Grid w={["100%", "100%", "50%", "50%"]} paddingLeft='150px'>
      <Image
        src={LogoSecondary}
        alt='doit'
        boxSize={["120px", "120px", "150px", "150px"]}
      />
      <Heading mt='4' as='h1'>
        O jeito fácil, grátis
      </Heading>
      <Text maxw='350px'>
        Flexível e atrativo de gerenciar
        <b> seus projetos em uma única plataforma</b>
      </Text>
    </Grid>
  );
};
