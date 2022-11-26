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
  Tr,
  Text,
  Th,
  Tbody,
  Td,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useContext, useEffect } from "react";
import { SpoonacularlistContext } from "./SpoonacularlistContext/listContext";

import { GetRecipes, DeleteRecipe } from "./SpoonacularlistContext/apiCalls";
const Spoonacular = () => {
  const [load, setLoad] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch, recipes, pageId, nextPage, prevPage, pageCount, error } =
    useContext(SpoonacularlistContext);
  console.log(pageId, "pageId");
  useEffect(() => {
    GetRecipes(axiosPrivate, dispatch, pageId);
  }, [dispatch, pageId, deleteClicked]);
  const handleDelete = async (id) => {
    setLoad(true);
    console.log(id);
    await DeleteRecipe(id, axiosPrivate, dispatch);
    setDeleteClicked(!deleteClicked);
    setLoad(false);
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
              <Link to="/integrations/Spoonacular/apiImport">
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
          height={"640px"}
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
                    <Text fontWeight={600}>Menu</Text>{" "}
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Image</Text>
                  </Th>
                  {/* <Th>
                    <Text fontWeight={600}>Ingredients</Text>
                  </Th> */}
                  <Th>
                    <Text fontWeight={600}>Calories</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Carbs</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Fat</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Action</Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {recipes.map((recipe) => {
                  return (
                    <Tr key={recipe.recipeId}>
                      <Td>{recipe.recipeName.slice(0, 20)}</Td>
                      <Td>
                        <Image
                          htmlHeight="60px"
                          htmlWidth="70px"
                          objectFit="cover"
                          rounded={"sm"}
                          border="1px"
                          borderColor="gray"
                          src={
                            recipe.recipeImage ||
                            `https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg`
                          }
                          alt={""}
                        />
                      </Td>
                      {/* <Td>{recipe.recipeIngredients}</Td> */}
                      <Td>{recipe.calories} k</Td>
                      <Td>{recipe.carb} g</Td>
                      <Td>{recipe.fat} g</Td>
                      <Td>
                        <Button
                          size="sm"
                          isLoading={load ? true : false}
                          onClick={() => handleDelete(recipe._id)}
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
            <Flex align="center" justify="space-between" py={4}>
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
export default Spoonacular;
