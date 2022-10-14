import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Alert,
  AlertIcon,
  AlertDescription,
  Center,
  useColorModeValue,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
const Reset = () => {
  const [state, setState] = useState({
    name: "",
    token: "",
  });
  const { token } = useParams();
  useEffect(() => {
    if (token) {
      const { name } = jwtDecode(token);
      setState({ ...state, name: name, token });
    }
  }, [token]);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [load, setLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      await axios.put(`http://localhost:8000/api/v1/auth/reset-password`, {
        newPassword: newPassword,
        resetPasswordLink: token,
      });

      window.location.href = "/login";
      setLoad(false);
      setNewPassword("");
    } catch (error) {
      setState({
        name: "",
        token: "",
      });

      setErrorMessage(error.response.data.message);
      setLoad(false);
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        {errorMessage && (
          <Center>
            <Alert status="error" maxW={"sm"}>
              <AlertIcon />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          </Center>
        )}
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Hello {state.name}, Enter new password
        </Heading>

        <FormControl id="password" isRequired>
          <FormLabel>New Password</FormLabel>
          <InputGroup>
            <Input
              value={newPassword}
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"purple.400"}
            color={"white"}
            _hover={{
              bg: "purple.500",
            }}
            isLoading={load ? true : false}
            loadingText="Submitting"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Reset;
