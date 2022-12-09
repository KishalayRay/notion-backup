import { useContext, useEffect, useState } from "react";
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
  Th,
  Tbody,
  Heading,
  Td,
  InputGroup,
  Input,
  InputRightElement,
  Text,
  Select,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

import { GoogleJobsContext } from "./GoogleJobsContext/listContext";
import { DeleteIcon } from "@chakra-ui/icons";
import { GetJobs, CreateJob, DeleteJob } from "./GoogleJobsContext/apiCalls";

const GoogleJobs = () => {
  const axiosPrivate = useAxiosPrivate();
  const { dispatch, jobs } = useContext(GoogleJobsContext);
  const [jobquery, setJobquery] = useState("");
  const [joblocation, setJoblocation] = useState("");
  const [load, setLoad] = useState(false);
  const [loadD, setLoadD] = useState(false);
  const handleDelete = async (id) => {
    setLoadD(true);
    console.log(id);
    await DeleteJob(id, axiosPrivate, dispatch);
    setLoadD(false);
  };
  useEffect(() => {
    GetJobs(axiosPrivate, dispatch);
  }, [dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    console.log();
    await CreateJob(jobquery, joblocation, axiosPrivate, dispatch);
    setJobquery("");
    setJoblocation("");
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
              <Stack direction={"row"} spacing={3}>
                <Text
                  fontSize={"2xl"}
                  fontWeight={500}
                  fontFamily={"body"}
                  pb={3}
                >
                  Job
                </Text>
                <Input
                  width="auto"
                  type="text"
                  onChange={(e) => setJobquery(e.target.value)}
                  placeholder="Graphic Designer"
                  required
                />
                <Text
                  fontSize={"2xl"}
                  fontWeight={500}
                  fontFamily={"body"}
                  pb={3}
                >
                  Location
                </Text>
                <Input
                  width="auto"
                  type="text"
                  onChange={(e) => setJoblocation(e.target.value)}
                  placeholder="Austin"
                  required
                />
                <Button
                  colorScheme="gray"
                  size="md"
                  loadingText="Submitting"
                  isLoading={load ? true : false}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Stack>
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
                    <Text fontWeight={600}>Job</Text>
                  </Th>
                  <Th>
                    {" "}
                    <Text fontWeight={600}>Location</Text>
                  </Th>
                  <Th>
                    {" "}
                    <Text fontWeight={600}>Date</Text>
                  </Th>
                  <Th>
                    {" "}
                    <Text fontWeight={600}>Action</Text>
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {jobs.map((job) => {
                  return (
                    <Tr key={job._id}>
                      <Td>{job.jobTitle}</Td>
                      <Td>{job.jobLocation}</Td>
                      <Td>{job.date.substring(0, 10)}</Td>
                      <Td>
                        <Button
                          size="sm"
                          isLoading={loadD ? true : false}
                          onClick={() => handleDelete(job._id)}
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
export default GoogleJobs;
