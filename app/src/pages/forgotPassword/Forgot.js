import React, { useState, useffect } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Alert,
  Center,
  AlertIcon,
  useColorModeValue,
  AlertDescription,
} from "@chakra-ui/react";
const Forgot = () => {
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/auth/forgot-password`,
        {
          email: email,
        }
      );
      setLoad(false);
      console.log(response.data);
      setSuccessMessage(response.data);
      setEmail("");
    } catch (e) {
      setErrorMessage(e.response.data.message);
      setLoad(false);
    }
  };

  return (
    <>
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
          {successMessage && (
            <Alert status="success">
              <AlertIcon />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={"purple.400"}
              color={"white"}
              isLoading={load ? true : false}
              loadingText=" Requesting..."
              onClick={handleSubmit}
              _hover={{
                bg: "purple.500",
              }}
            >
              Request Link
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export default Forgot;
