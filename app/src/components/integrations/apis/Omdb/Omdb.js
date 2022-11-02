import React, { useState } from "react";
import {
  Box,
  Center,
  Stack,
  Image,
  Button,
  useColorModeValue,
  TableContainer,
  Table,
  Thead,
  Badge,
  Tr,
  Flex,
  ButtonGroup,
  Text,
  Th,
  Tbody,
  Td,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useContext, useEffect } from "react";
import { OmdblistContext } from "./omdblistContext/listContext";

import { GetMovies, DeleteMovie } from "./omdblistContext/apiCalls";
const Omdb = () => {
  const toast = useToast();
  const [load, setLoad] = useState(false);
  const [deleteclicked, setdelclicked] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const {
    dispatch,
    omdb,
    pageId,
    nextPage,
    prevPage,
    pageCount,
    error,
    addMovieclicked,
  } = useContext(OmdblistContext);
  console.log(error, "error");
  useEffect(() => {
    GetMovies(axiosPrivate, dispatch, pageId);
    console.log(dispatch);
  }, [dispatch, pageId, addMovieclicked]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     GetMovies(axiosPrivate, dispatch, pageId);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  const handleDelete = async (id) => {
    setLoad(true);
    setdelclicked(!deleteclicked);
    console.log(id);
    await DeleteMovie(id, axiosPrivate, dispatch);
    setLoad(false);
  };

  return (
    <Stack>
      {error &&
        toast({
          title: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        })}
      <Center py={6}>
        <Box
          maxW={"800px"}
          maxH={"800px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Stack>
            <center>
              <Link to="/integrations/Omdb/apiImport">
                <Center>
                  <Button
                    w={"full"}
                    maxW={"sm"}
                    color={"grey.400"}
                    rightIcon={<RepeatIcon />}
                  >
                    <Center>
                      <h3>Import Data</h3>
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
          height={"680px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>
                    {" "}
                    <Text fontWeight={600}>Title</Text>{" "}
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Image</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Genre</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Year</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Rating</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Duration</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Action</Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {omdb.map((movie) => {
                  return (
                    <Tr key={movie.movieId}>
                      <Td>{movie.movieTitle}</Td>
                      <Td>
                        <Image
                          htmlHeight="45px"
                          htmlWidth="35px"
                          objectFit="cover"
                          rounded={"sm"}
                          src={
                            movie.movieImage ||
                            `https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg`
                          }
                          alt={""}
                        />
                      </Td>
                      <Td>
                        {/* <Badge variant="subtle">{movie.movieGenre}</Badge> */}
                        {movie.movieGenre[0]}
                      </Td>
                      <Td>{movie.movieYear}</Td>
                      <Td>{movie.movieRating}</Td>
                      <Td>{movie.movieDuration} min</Td>
                      <Td>
                        <Button
                          size="sm"
                          isLoading={load ? true : false}
                          onClick={() => handleDelete(movie._id)}
                        >
                          {" "}
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            <Flex align="center" justify="space-between" my="4">
              <Text
                color={useColorModeValue("gray.600", "gray.400")}
                fontSize="sm"
              >
                {pageId} of {pageCount} pages
              </Text>
              <ButtonGroup variant="outline" size="sm">
                <Button
                  onClick={() => {
                    prevPage();
                  }}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    nextPage();
                  }}
                >
                  Next
                </Button>
              </ButtonGroup>
            </Flex>
          </TableContainer>
        </Box>
      </Center>
    </Stack>
  );
};
export default Omdb;
