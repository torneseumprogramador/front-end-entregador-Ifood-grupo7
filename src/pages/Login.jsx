import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
  Text,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useToast } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import illustrationLogin from "../assets/illustration-login.svg";

import fakeDriver from "../utils/fakeDriver";

export default function Login() {
  const [showIllustration] = useMediaQuery("(min-height: 600px)");
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const inputEmail = React.useRef();
  const inputPassword = React.useRef();

  async function login(e) {
    e.preventDefault();

    const email = inputEmail.current.value;
    const password = inputPassword.current.value;

    setIsLoading(true);

    setTimeout(() => {
      if (email === fakeDriver.email && password === fakeDriver.password) {
        return navigate("/");
      }

      setIsLoading(false);

      toast({
        title: "Email ou senha inválida",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }, 2000);
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      maxWidth="500px"
      marginX="auto"
    >
      {showIllustration && (
        <Box marginBottom={28} px={10}>
          <Image src={illustrationLogin} />
        </Box>
      )}

      <Text
        align="center"
        mb={14}
        fontSize="x-large"
        fontWeight="bold"
        color="gray.700"
      >
        Bem vindo ao KintSugi
      </Text>

      <Box px="7">
        <form onSubmit={login}>
          <VStack spacing={4}>
            <FormControl>
              <Input
                ref={inputEmail}
                id="email"
                type="email"
                placeholder="Email"
                bg="gray.50"
                required
                autoComplete="off"
                onFocus={() => {
                  toast.closeAll();
                }}
              />
            </FormControl>

            <FormControl>
              <Input
                ref={inputPassword}
                id="password"
                type="password"
                placeholder="Senha"
                bg="gray.50"
                required
                autoComplete="off"
                onFocus={() => {
                  toast.closeAll();
                }}
              />
            </FormControl>

            <Button width="full" type="submit" isLoading={isLoading}>
              Entrar
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
