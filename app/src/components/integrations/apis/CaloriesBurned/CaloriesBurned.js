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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useContext, useEffect } from "react";
import { CaloriesBurnedlistContext } from "./caloriesBurnedlistContext/listContext";

import {
  GetActivities,
  DeleteActivity,
} from "./caloriesBurnedlistContext/apiCalls";
const CaloriesBurned = () => {
  const [load, setLoad] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch, activity } = useContext(CaloriesBurnedlistContext);

  useEffect(() => {
    GetActivities(axiosPrivate, dispatch);
  }, [dispatch]);
  const handleDelete = async (id) => {
    setLoad(true);
    console.log(id);
    await DeleteActivity(id, axiosPrivate, dispatch);
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
              <Link to="/integrations/Caloriesburned/apiImport">
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
                    <Text fontWeight={600}>Activity</Text>{" "}
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Calories Per Hour</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Duration</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Burned</Text>
                  </Th>

                  <Th>
                    <Text fontWeight={600}>Action</Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {activity.map((exercise) => {
                  return (
                    <Tr key={exercise._id}>
                      <Td>{exercise.name}</Td>
                      <Td>{exercise.cph}</Td>
                      <Td>{exercise.duration} min</Td>
                      <Td>{exercise.burned}</Td>
                      <Td>
                        <Button
                          size="sm"
                          isLoading={load ? true : false}
                          onClick={() => handleDelete(exercise._id)}
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
          </TableContainer>
        </Box>
      </Center>
    </Stack>
  );
};
export default CaloriesBurned;
