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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { OmdbContext } from "../context/context";
import { OmdblistContext } from "../omdblistContext/listContext";
import { Link } from "react-router-dom";
import { CreateMovie } from "../omdblistContext/apiCalls";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
const Omdb = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isDisabled, setIsDisabled] = useState(false);

  const { query, searchMovie, movies, addMovie, getApiKey, isLoading } =
    useContext(OmdbContext);
  const { dispatch } = useContext(OmdblistContext);
  const [queryM, setQueryM] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    searchMovie(queryM);
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
              <Link to="/integrations/Omdb">
                <Center>
                  <Button
                    w={"full"}
                    maxW={"sm"}
                    color={"grey.400"}
                    disabled={isDisabled}
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
                  pattern="^[A-Za-z0-9]+$"
                  placeholder="Search movies or series..."
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
                {movies.map((movie) => {
                  return (
                    <>
                      {movie.Poster !== "N/A" ? (
                        <Flex>
                          <Stack
                            mt={6}
                            direction={"row"}
                            spacing={4}
                            align={"center"}
                            key={movie.imdbID}
                          >
                            <Image
                              htmlHeight="75px"
                              htmlWidth="65px"
                              objectFit="cover"
                              rounded={"md"}
                              src={
                                movie.Poster ||
                                `https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg`
                              }
                              alt={""}
                            />
                            <Stack
                              direction={"column"}
                              spacing={0}
                              fontSize={"sm"}
                            >
                              <Text fontWeight={600}>{movie.Title}</Text>
                              <Text color={"gray.500"}>{movie.Year}</Text>
                            </Stack>
                          </Stack>
                          <Spacer />
                          <Button
                            mt={14}
                            colorScheme="purple"
                            size="sm"
                            onClick={() => {
                              CreateMovie(movie.imdbID, axiosPrivate, dispatch);
                              addMovie(movie.imdbID);
                              setIsDisabled(true);
                              setTimeout(() => {
                                setIsDisabled(false);
                              }, 1000);
                            }}
                          >
                            Add
                          </Button>
                        </Flex>
                      ) : (
                        <></>
                      )}
                    </>
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
export default Omdb;
