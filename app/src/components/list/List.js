import React, { useState, useContext, useEffect } from "react";
import { ApiAuthContext } from "../../context/apiAuthContext/ApiAuthContext";
import { DataApiContext } from "../../context/dataApiContext/DataApiContext";
import { useQuery } from "react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  CreateApiAuth,
  GetApiAuth,
  DeleteApiAuth,
} from "../../context/apiAuthContext/apiCalls";
import {
  CreateApiKey,
  GetApiKey,
  DeleteApiKey,
} from "../../context/dataApiContext/apiCalls";
import {
  Box,
  Flex,
  Spacer,
  Container,
  SimpleGrid,
  Stack,
  Center,
  Image,
  AlertIcon,
  AlertDescription,
  Alert,
  Text,
  Avatar,
  useBreakpointValue,
  useColorModeValue,
  InputGroup,
  Input,
  InputRightElement,
  InputRightAddon,
  FormControl,
  Button,
  CloseButton,
  Square,
  Icon,
} from "@chakra-ui/react";

import { useLocation } from "react-router-dom";

const List = () => {
  const location = useLocation();
  const list = location.state;
  console.log(list);
  return (
    <Box
      as="section"
      py={{
        base: "4",
        md: "8",
      }}
    >
      <Container>
        <SimpleGrid
          columns={{
            base: 1,
            md: 1,
          }}
          gap={{
            base: "5",
            md: "6",
          }}
        >
          <Stat name={list.apiName} image={list.logo} />
          <NotionAuth slug={list.apiSlug} />
          <ApiAuth slug={list.apiSlug} required={list.keyRequire} />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

const Stat = (props) => {
  const { name, image, ...boxProps } = props;
  return (
    <Box
      px={{
        base: "4",
        md: "6",
      }}
      py={{
        base: "5",
        md: "6",
      }}
      bg="bg-surface"
      borderRadius="lg"
      boxShadow={useColorModeValue("sm", "sm-dark")}
      {...boxProps}
    >
      <Stack mt={1} direction={"row"} spacing={4} align={"center"}>
        <Image boxSize="40px" objectFit="cover" src={image} alt="Dan Abramov" />
        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Text fontSize="2xl">{name}</Text>
        </Stack>
      </Stack>
    </Box>
  );
};
const NotionAuth = ({ slug }) => {
  const axiosPrivate = useAxiosPrivate();
  const { dispatch, error, apiAuth } = useContext(ApiAuthContext);
  useEffect(() => {
    GetApiAuth({ apiSlug: slug }, axiosPrivate, dispatch);
  }, [dispatch, slug]);
  const [showKey, setShowKey] = useState(false);
  const [showId, setShowId] = useState(false);
  const handleClickKey = () => setShowKey(!showKey);
  const handleClickId = () => setShowId(!showId);
  const [load, setLoad] = useState(false);
  // const [auth, setAuth] = useState({
  //   databaseId: "",
  //   apiKey: "",
  //   apiSlug: slug,
  // });
  const [databaseId, setDatabaseId] = useState("");
  const [apiKey, setApiKey] = useState("");

  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setAuth({ ...auth, [name]: value });

  //   console.log(auth);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    setLoad(true);
    await CreateApiAuth(
      { apiKey, databaseId, apiSlug: slug },
      axiosPrivate,
      dispatch
    );
    setLoad(false);
    setDatabaseId("");
    setApiKey("");
  };
  const handleDelete = () => {
    DeleteApiAuth({ apiSlug: slug }, axiosPrivate, dispatch);
  };
  return (
    <Box
      px={{
        base: "4",
        md: "6",
      }}
      py={{
        base: "5",
        md: "6",
      }}
      bg="bg-surface"
      borderRadius="lg"
      boxShadow={useColorModeValue("sm", "sm-dark")}
    >
      <Text
        size={useBreakpointValue({
          base: "sm",
          md: "md",
        })}
        as="samp"
      >
        Notion Authentication
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputGroup size="md" my={4}>
            <Input
              pr="4.5rem"
              type={showKey ? "text" : "password"}
              placeholder="Enter Integration Key"
              name="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClickKey}>
                {showKey ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <InputGroup size="md" my={4}>
            <Input
              pr="4.5rem"
              type={showId ? "text" : "password"}
              placeholder="Enter Database Id"
              name="databaseId"
              value={databaseId}
              onChange={(e) => setDatabaseId(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClickId}>
                {showId ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>

          {!apiAuth && (
            <Button
              mt={4}
              colorScheme="purple"
              loadingText="Submitting"
              isLoading={load ? true : false}
              type="submit"
            >
              Submit
            </Button>
          )}
        </FormControl>
      </form>

      {apiAuth ? (
        <>
          <Box as="section" pb={{ base: "15", md: "8" }} pt={6}>
            <Box bg="bg-surface" boxShadow="md">
              <Container py={{ base: "4", md: "2.5" }} position="relative">
                <CloseButton
                  display={{ sm: "none" }}
                  position="absolute"
                  right="2"
                  top="2"
                />
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  justify="space-between"
                  spacing={{ base: "3", md: "2" }}
                >
                  <Stack
                    spacing="4"
                    direction={{ base: "column", md: "row" }}
                    align={{ base: "start", md: "center" }}
                  >
                    <Box
                      h="40px"
                      w="450px"
                      bg="bg-subtle"
                      borderRadius="lg"
                      boxShadow="md"
                    >
                      <Center>
                        <Text as="samp" pt={2}>
                          Notion Integration Key & Database ID Enabled
                        </Text>
                      </Center>
                    </Box>
                  </Stack>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    spacing={{ base: "3", sm: "2" }}
                    align={{ base: "stretch", sm: "center" }}
                  >
                    <Button
                      color="red.500"
                      width="full"
                      onClick={() => {
                        handleDelete();
                      }}
                    >
                      Delete Integration
                    </Button>
                  </Stack>
                </Stack>
              </Container>
            </Box>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

const ApiAuth = ({ slug, required }) => {
  const { dispatch, isFetching, apiKey } = useContext(DataApiContext);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    GetApiKey({ apiSlug: slug }, axiosPrivate, dispatch);
  }, [dispatch, slug]);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [key, setKey] = useState("");
  const [load, setLoad] = useState(false);
  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setAuth({ ...auth, [name]: value });

  //   console.log(auth);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    console.log("submitted", !load);
    await CreateApiKey({ key, apiSlug: slug }, axiosPrivate, dispatch);

    setKey("");
    setLoad(false);
  };
  const handleDelete = () => {
    console.log("submitted end", load);
    DeleteApiKey({ apiSlug: slug }, axiosPrivate, dispatch);
  };

  return (
    <Box
      px={{
        base: "4",
        md: "6",
      }}
      py={{
        base: "5",
        md: "6",
      }}
      bg="bg-surface"
      borderRadius="lg"
      boxShadow={useColorModeValue("sm", "sm-dark")}
    >
      <Flex>
        <Text
          size={useBreakpointValue({
            base: "sm",
            md: "md",
          })}
          as="samp"
        >
          API Authentication
        </Text>
        <Spacer />

        <Text
          size={useBreakpointValue({
            base: "sm",
            md: "md",
            color: "red",
          })}
          as="samp"
        >
          *{required}
        </Text>
      </Flex>

      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputGroup size="md" my={4}>
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter API Key"
              value={key}
              name="key"
              onChange={(e) => setKey(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>

          {!apiKey && (
            <Button
              my={4}
              loadingText="Submitting"
              colorScheme="purple"
              isLoading={load ? true : false}
              type="submit"
            >
              Submit
            </Button>
          )}
        </FormControl>
      </form>
      {/* show credentials */}
      {apiKey ? (
        <>
          <Box as="section" pb={{ base: "15", md: "8" }} pt={6}>
            <Box bg="bg-surface" boxShadow="md">
              <Container py={{ base: "4", md: "2.5" }} position="relative">
                <CloseButton
                  display={{ sm: "none" }}
                  position="absolute"
                  right="2"
                  top="2"
                />
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  justify="space-between"
                  spacing={{ base: "3", md: "2" }}
                >
                  <Stack
                    spacing="4"
                    direction={{ base: "column", md: "row" }}
                    align={{ base: "start", md: "center" }}
                  >
                    <Box
                      h="40px"
                      w="370px"
                      bg="bg-subtle"
                      borderRadius="lg"
                      boxShadow="md"
                    >
                      <Center>
                        <Text as="samp" pt={2}>
                          Api Key Enabled
                        </Text>
                      </Center>
                    </Box>
                  </Stack>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    spacing={{ base: "3", sm: "2" }}
                    align={{ base: "stretch", sm: "center" }}
                  >
                    <Button
                      color="red.500"
                      width="full"
                      onClick={() => handleDelete()}
                    >
                      Delete Credential
                    </Button>
                  </Stack>
                </Stack>
              </Container>
            </Box>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};
export default List;
