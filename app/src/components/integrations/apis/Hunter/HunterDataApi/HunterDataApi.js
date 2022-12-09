import {
  Box,
  Center,
  Text,
  Stack,
  Image,
  Flex,
  Spacer,
  Button,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Input,
  Spinner,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useContext, useEffect, useState } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { HunterContext } from "../context/context";
import { HunterlistContext } from "../HunterContext/listContext";
import { Link } from "react-router-dom";
import { CreateLead } from "../HunterContext/apiCalls";
const Hunter = () => {
  const axiosPrivate = useAxiosPrivate();
  const { query, searchLead, leads, addLead, getApiKey, isLoading } =
    useContext(HunterContext);
  const { dispatch } = useContext(HunterlistContext);
  const [queryM, setQueryM] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    searchLead(queryM);
  };
  useEffect(() => {
    getApiKey(axiosPrivate);
  }, [query]);
  return (
    <Stack>
      <Center py={6}>
        <Box
          maxW={"800px"}
          maxH={"1600px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Stack>
            <center>
              <Link to="/integrations/Hunter">
                <Center>
                  <Button
                    w={"full"}
                    maxW={"sm"}
                    color={"grey.400"}
                    rightIcon={<RepeatIcon />}
                  >
                    <Center>
                      <h3>Watch List</h3>
                    </Center>
                  </Button>
                </Center>
              </Link>
            </center>
          </Stack>
        </Box>
      </Center>
      <Center py={6}>
        <Box
          maxW={"800px"}
          maxH={"1600px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Stack>
            <center>
              <InputGroup
                size="md"
                w={"400px"}
                fontSize="md"
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
              >
                <Input
                  pr="4.5rem"
                  type="text"
                  placeholder="Eg. slack"
                  value={queryM}
                  onChange={(e) => {
                    setQueryM(e.target.value);
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleSearch}>
                    Search
                  </Button>
                </InputRightElement>
              </InputGroup>
            </center>
            {isLoading ? (
              <Center>
                <Spinner mt={16} color="purple.500" size="xl" />
              </Center>
            ) : (
              <>
                {leads && (
                  <Flex>
                    <Stack
                      mt={6}
                      direction={"row"}
                      spacing={4}
                      align={"center"}
                    >
                      <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                        <Text fontWeight={600}>{leads.url}</Text>
                      </Stack>
                    </Stack>
                    <Spacer />
                    <Button
                      mt={14}
                      colorScheme="purple"
                      size="sm"
                      onClick={() => {
                        CreateLead(leads.url, axiosPrivate, dispatch);
                        addLead();
                      }}
                    >
                      Add
                    </Button>
                  </Flex>
                )}
              </>
            )}
          </Stack>
        </Box>
      </Center>
    </Stack>
  );
};
export default Hunter;
