import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Alert,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

//import { LoginUser } from "../../context/authContext/apiCalls";
//import { AuthContext } from "../../context/authContext/AuthContext";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
const Login = () => {
  //const { dispatch, isFetching, errors } = useContext(AuthContext);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/apis";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    try {
      const response = await axios.post(`/auth/login`, {
        email: email,
        password: password,
      });
      localStorage.setItem("userEmail", email);
      setAuth({
        isAdmin: response.data.data.user.isAdmin,
        accessToken: response.data.data.accessToken,
      });
      navigate(from, { replace: true });
    } catch (e) {
      console.log(e);
      // setAuth({ message: "failed" });
    }
    setLoad(false);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>

        {/* {errors && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{errors.message}</AlertDescription>
          </Alert>
        )} */}
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"purple.400"} to="/auth/activate/password/reset">
                  Forgot password?
                </Link>
              </Stack>
              <Button
                bg={"purple.400"}
                color={"white"}
                loadingText="Signing In"
                _hover={{
                  bg: "purple.500",
                }}
                isLoading={load ? true : false}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default Login;
