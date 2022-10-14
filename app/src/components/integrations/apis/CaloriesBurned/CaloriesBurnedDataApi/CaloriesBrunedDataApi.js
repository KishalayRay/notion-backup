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
  Select,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { CaloriesBurnedContext } from "../context/context";
import { CaloriesBurnedlistContext } from "../caloriesBurnedlistContext/listContext";
import { Link } from "react-router-dom";
import { CreateActivity } from "../caloriesBurnedlistContext/apiCalls";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
const activitiesList = [
  "walk",
  "run",
  "cycling",
  "basketball",
  "football",
  "tennis",
  "soccer",
  "bowling",
  "rowing",
  "climbing",
  "aerobics",
  "stretching",
  "calisthenics",
  "skiing",
];
const CaloriesBurnedDataApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const {
    weight,
    activity,
    duration,
    searchActivity,
    activities,
    addActivity,
    getApiKey,
    isLoading,
  } = useContext(CaloriesBurnedContext);
  const { dispatch } = useContext(CaloriesBurnedlistContext);
  const [weightM, setWeightM] = useState(0);
  const [durationM, setDurationM] = useState(0);
  const [activityM, setActivityM] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(weightM, durationM, activityM);
    searchActivity({
      weightM: weightM,
      durationM: durationM,
      activityM: activityM,
    });
  };
  useEffect(() => {
    getApiKey(axiosPrivate);
  }, [weight, duration, activity]);
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
              <Link to="/integrations/Caloriesburned">
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
              <Stack>
                <center>
                  <Stack direction={"row"} spacing={3}>
                    <Text
                      fontSize={"2xl"}
                      fontWeight={500}
                      fontFamily={"body"}
                      pb={3}
                    >
                      Activity
                    </Text>
                    <Select
                      placeholder="Select option"
                      mr={2}
                      w={"250px"}
                      name="activity"
                      onChange={(e) => setActivityM(e.target.value)}
                    >
                      {activitiesList.map((activity) => {
                        return <option value={activity}>{activity}</option>;
                      })}
                    </Select>
                    <Text
                      fontSize={"2xl"}
                      fontWeight={500}
                      fontFamily={"body"}
                      pb={3}
                    >
                      Duration
                    </Text>
                    <Input
                      htmlSize={3}
                      mr={2}
                      width="auto"
                      type="number"
                      onChange={(e) => setDurationM(e.target.value)}
                      placeholder="min"
                    />
                    <Text
                      fontSize={"2xl"}
                      fontWeight={500}
                      fontFamily={"body"}
                      pb={3}
                    >
                      Weight
                    </Text>
                    <Input
                      htmlSize={3}
                      width="auto"
                      type="number"
                      onChange={(e) => setWeightM(e.target.value)}
                      placeholder="kg"
                    />
                    <Button
                      colorScheme="gray"
                      size="md"
                      loadingText="Submitting"
                      onClick={handleSubmit}
                    >
                      Go
                    </Button>
                  </Stack>
                </center>
                <hr />
              </Stack>
            </center>
            {isLoading ? (
              <Center>
                <Spinner mt={16} color="purple.500" size="xl" />
              </Center>
            ) : (
              <>
                {activities.map((activity, index) => {
                  return (
                    <Flex>
                      <Stack
                        mt={6}
                        direction={"row"}
                        spacing={4}
                        align={"center"}
                        key={index}
                      >
                        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                          <Text fontWeight={600}>{activity.name}</Text>
                          <Text color={"gray.500"}>
                            {activity.duration_minutes} min
                          </Text>
                        </Stack>
                      </Stack>
                      <Spacer />
                      <Button
                        mt={14}
                        colorScheme="purple"
                        size="sm"
                        bordarRadius="none"
                        onClick={() => {
                          CreateActivity(
                            index,
                            axiosPrivate,
                            dispatch,
                            weightM,
                            durationM,
                            activityM
                          );
                          addActivity(index);
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
export default CaloriesBurnedDataApi;
