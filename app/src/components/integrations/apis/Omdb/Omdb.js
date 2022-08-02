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
  Tr,
  Text,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useContext, useEffect } from "react";
import { OmdblistContext } from "./omdblistContext/listContext";

import { getMovies, deleteMovie } from "./omdblistContext/apiCalls";
const Omdb = () => {
  const { dispatch, omdb } = useContext(OmdblistContext);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    console.log(id);
    deleteMovie(id, dispatch);
  };

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
          maxH={"1600px"}
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
                      <Td>{movie.movieGenre}</Td>
                      <Td>{movie.movieYear}</Td>
                      <Td>{movie.movieRating}</Td>
                      <Td>{movie.movieDuration} min</Td>
                      <Td>
                        <DeleteIcon onClick={() => handleDelete(movie._id)} />
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Center>
    </Stack>
  );
};
export default Omdb;
