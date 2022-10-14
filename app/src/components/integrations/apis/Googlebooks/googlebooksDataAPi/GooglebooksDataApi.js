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
import { GooglebooksContext } from "../context/context";
import { GooglebookslistContext } from "../googlebookslistContext/listContext";
import { Link } from "react-router-dom";
import { CreateBook } from "../googlebookslistContext/apiCalls";
const Googlebooks = () => {
  const axiosPrivate = useAxiosPrivate();
  const { query, searchBook, books, addBook, getApiKey, isLoading } =
    useContext(GooglebooksContext);
  const { dispatch } = useContext(GooglebookslistContext);
  const [queryM, setQueryM] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    searchBook(queryM);
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
              <Link to="/integrations/Googlebooks">
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
                  placeholder="Search Books or Magazines..."
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
                {books.map((volume) => {
                  return (
                    <Flex>
                      <Stack
                        mt={6}
                        direction={"row"}
                        spacing={4}
                        align={"center"}
                        key={volume.id}
                      >
                        <Image
                          htmlHeight="75px"
                          htmlWidth="65px"
                          objectFit="cover"
                          rounded={"sm"}
                          src={
                            volume.volumeInfo.imageLinks.smallThumbnail ||
                            `https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg`
                          }
                          alt={""}
                        />
                        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                          <Text fontWeight={600}>
                            {volume.volumeInfo.title}
                          </Text>
                          <Text color={"gray.500"}>
                            {volume.volumeInfo.publishedDate}
                          </Text>
                        </Stack>
                      </Stack>
                      <Spacer />
                      <Button
                        mt={14}
                        colorScheme="purple"
                        size="sm"
                        onClick={() => {
                          CreateBook(volume.id, axiosPrivate, dispatch);
                          addBook(volume.id);
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
export default Googlebooks;
