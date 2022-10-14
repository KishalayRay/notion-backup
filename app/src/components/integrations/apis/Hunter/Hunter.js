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

import { HunterContext } from "./HunterContext/listContext";
import { DeleteIcon } from "@chakra-ui/icons";
import { GetLeads, CreateLead } from "./HunterContext/apiCalls";

const Hunter = () => {
  const axiosPrivate = useAxiosPrivate();
  const { dispatch, leads } = useContext(HunterContext);
  const [domain, setDomain] = useState("");
  const [load, setLoad] = useState(false);
  useEffect(() => {
    GetLeads(axiosPrivate, dispatch);
  }, [dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    console.log();
    await CreateLead(domain, axiosPrivate, dispatch);
    setDomain("");
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
          <center>
            <Stack direction={"row"} spacing={3} pl={14}>
              <Text
                fontSize={"2xl"}
                fontWeight={500}
                fontFamily={"body"}
                pb={3}
              >
                Company Domain
              </Text>
              <Input
                pl={3}
                width="auto"
                type="text"
                onChange={(e) => setDomain(e.target.value)}
                placeholder="airbnb.com"
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
                    <Text fontWeight={600}>Company</Text>
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
                {leads.map((lead) => {
                  return (
                    <Tr key={lead._id}>
                      <Td>{lead.domain}</Td>
                      <Td>{lead.date.substring(0, 10)}</Td>
                      <Td>
                        <Button size="sm">
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
export default Hunter;
