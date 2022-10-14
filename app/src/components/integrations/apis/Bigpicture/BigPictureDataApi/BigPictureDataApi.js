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
import { BigPictureContext } from "../context/context";
import { BigPicturelistContext } from "../BigPicturelistContext/listContext";
import { Link } from "react-router-dom";
import { CreateCompany } from "../BigPicturelistContext/apiCalls";
const BigPicture = () => {
  const axiosPrivate = useAxiosPrivate();
  const { query, searchCompany, companies, addCompany, getApiKey, isLoading } =
    useContext(BigPictureContext);
  const { dispatch } = useContext(BigPicturelistContext);
  const [queryM, setQueryM] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    searchCompany(queryM);
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
              <Link to="/integrations/Bigpicture">
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
                {companies.map((company, index) => {
                  return (
                    <Flex>
                      <Stack
                        mt={6}
                        direction={"row"}
                        spacing={4}
                        align={"center"}
                        key={company.id}
                      >
                        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                          <Text fontWeight={600}>{company.domain}</Text>
                          <Text color={"gray.500"}>{company.name}</Text>
                        </Stack>
                      </Stack>
                      <Spacer />
                      <Button
                        mt={14}
                        colorScheme="purple"
                        size="sm"
                        onClick={() => {
                          CreateCompany(company.domain, axiosPrivate, dispatch);
                          addCompany(index);
                        }}
                      >
                        Add
                      </Button>
                    </Flex>
                  );
                })}
              </>
            )}
          </Stack>
        </Box>
      </Center>
    </Stack>
  );
};
export default BigPicture;
