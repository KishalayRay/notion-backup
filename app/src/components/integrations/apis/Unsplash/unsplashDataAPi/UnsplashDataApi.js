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
  Select,
  InputRightElement,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { UnsplashContext } from "../context/context";
//import { OmdblistContext } from "../omdblistContext/listContext";
import { Link } from "react-router-dom";
//import { createMovie } from "../omdblistContext/apiCalls";
const Omdb = () => {
  const { query, searchPhoto, photos, addPhoto, fetchPhoto, isLoading } =
    useContext(UnsplashContext);
  //const { dispatch } = useContext(OmdblistContext);
  const [queryM, setQueryM] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    searchPhoto(queryM);
  };
  useEffect(() => {
    fetchPhoto();
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
              <Link to="/integrations/Unsplash">
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
          maxH={"2400px"}
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
                  placeholder="Search Stock Photos and Images..."
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
                <Spinner
                  mt={16}
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="purple.200"
                  color="purple.500"
                  size="xl"
                />
              </Center>
            ) : (
              <>
                {photos.map((photo) => {
                  return (
                    <Flex>
                      <Stack
                        mt={6}
                        direction={"row"}
                        spacing={4}
                        align={"center"}
                        key={photo.id}
                      >
                        <Image
                          boxSize="150px"
                          objectFit="cover"
                          rounded={"sm"}
                          src={
                            photo.urls.raw ||
                            `https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg`
                          }
                          alt={""}
                        />
                        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                          <Text fontWeight={600}>{photo.alt_description}</Text>
                          <Text color={"gray.500"}>
                            Dimention- {photo.width} x {photo.height}
                          </Text>
                          <Text color={"gray.500"} fontWeight={400}>
                            Created At- {photo.created_at}
                          </Text>
                          <Text color={"gray.500"} fontWeight={400}>
                            Likes- {photo.likes}
                          </Text>
                          <Text color={"gray.500"} fontWeight={400}>
                            By- {photo.user.username}
                          </Text>
                        </Stack>
                      </Stack>
                      <Spacer />
                      <Select
                        placeholder="Size"
                        mt={14}
                        w={"100px"}
                        h={"35px"}
                        pr={2}
                      >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Select>
                      <Button
                        mt={14}
                        colorScheme="purple"
                        size="sm"
                        onClick={() => {
                          //createMovie(movie.imdbID, dispatch);
                          addPhoto(photo.id);
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
export default Omdb;
