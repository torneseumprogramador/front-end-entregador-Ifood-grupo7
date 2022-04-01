import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Text,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import illustrationLogin from "../assets/illustration-login-small.png";
import axios from "../utils/axiosConfig";

export default function Login() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("ksToken");

  React.useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const [showIllustration] = useMediaQuery("(min-height: 560px)");
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();
  const inputEmail = React.useRef();
  const inputPassword = React.useRef();
  const toastRef = React.useRef();

  function showToastError(msg) {
    toastRef.current = toast({
      title: msg,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  }

  async function login(e) {
    e.preventDefault();
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    setIsLoading(true);

    try {
      const res = await fetch("https://drivers-tracking.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      window.localStorage.setItem("ksToken", data.token);
      document.location.reload(true);
    } catch (error) {
      setIsLoading(false);
      if (toastRef.current) {
        toast.close(toastRef.current);
      }

      showToastError("Opss! algo deu errado");
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      maxWidth="500px"
      marginX="auto"
      paddingTop={6}
    >
      {showIllustration && (
        <Box marginBottom={10} px={10}>
          <Image src={illustrationLogin} maxW="250px" mx="auto" />
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
                  window.scrollTo(0, document.body.scrollHeight);
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
                  window.scrollTo(0, document.body.scrollHeight);
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
