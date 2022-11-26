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
import { useContext, useEffect, useState } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { SpoonacularContext } from "../context/context";
import { SpoonacularlistContext } from "../SpoonacularlistContext/listContext";
import { Link } from "react-router-dom";
import { CreateRecipe } from "../SpoonacularlistContext/apiCalls";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
const Spoonacular = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isDisabled, setIsDisabled] = useState(false);
  const { query, searchRecipe, recipes, addRecipe, getApiKey, isLoading } =
    useContext(SpoonacularContext);
  const { dispatch } = useContext(SpoonacularlistContext);
  const [queryM, setQueryM] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    searchRecipe(queryM);
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
              <Link to="/integrations/Spoonacular">
                <Center>
                  <Button
                    w={"full"}
                    maxW={"sm"}
                    disabled={isDisabled}
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
                  placeholder="Search recipes..."
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
                {recipes.map((recipe) => {
                  return (
                    <>
                      <Flex>
                        <Stack
                          mt={6}
                          direction={"row"}
                          spacing={4}
                          align={"center"}
                          key={recipe.id}
                        >
                          <Image
                            htmlHeight="80px"
                            htmlWidth="100px"
                            objectFit="cover"
                            rounded={"md"}
                            src={
                              recipe.image ||
                              `https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg`
                            }
                            alt={""}
                          />
                          <Stack
                            direction={"column"}
                            spacing={0}
                            fontSize={"sm"}
                          >
                            <Text fontWeight={600}>{recipe.title}</Text>
                          </Stack>
                        </Stack>
                        <Spacer />
                        <Button
                          mt={10}
                          colorScheme="purple"
                          size="sm"
                          onClick={() => {
                            CreateRecipe(recipe.id, axiosPrivate, dispatch);
                            addRecipe(recipe.id);
                            setIsDisabled(true);
                            setTimeout(() => {
                              setIsDisabled(false);
                            }, 2000);
                          }}
                        >
                          Add
                        </Button>
                      </Flex>
                      <hr />
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
export default Spoonacular;
