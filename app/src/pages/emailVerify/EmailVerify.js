import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Alert,
  Center,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
const EmailVerify = () => {
  const [state, setState] = useState({
    name: "",
    token: "",
  });
  const [load, setLoad] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  let { token } = useParams();
  useEffect(() => {
    if (token) {
      const { username } = jwtDecode(token);
      setState({ ...state, name: username, token });
    }
  }, [token]);
  const clickSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/v1/auth/register/activate`, {
        token,
      });
      window.location.href = "/login";
      setState({
        ...state,
        name: "",
        token: "",
      });
      setLoad(false);
    } catch (error) {
      setState({
        ...state,
      });
      setErrorMessage(error.response.data.message);
      setLoad(false);
    }
  };
  return (
    <>
      <Box textAlign="center" py={10} px={6}>
        {errorMessage && (
          <Center>
            <Alert status="error" maxW={"sm"}>
              <AlertIcon />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          </Center>
        )}
        <Text fontSize="18px" mt={3} mb={2}>
          G'day {state.name}, Ready to activate your account?
        </Text>
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
          loadingText=" Activating"
          isLoading={load ? true : false}
          onClick={clickSubmit}
        >
          Activate
        </Button>
      </Box>
    </>
  );
};

export default EmailVerify;
