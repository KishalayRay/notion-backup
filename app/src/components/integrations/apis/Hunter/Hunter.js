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
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

import { HunterlistContext } from "./HunterContext/listContext";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { GetLeads, DeleteLead } from "./HunterContext/apiCalls";

const Hunter = () => {
  const axiosPrivate = useAxiosPrivate();
  const { dispatch, leads } = useContext(HunterlistContext);
  const [domain, setDomain] = useState("");
  const [load, setLoad] = useState(false);
  const handleDelete = async (id) => {
    setLoad(true);
    console.log(id);
    await DeleteLead(id, axiosPrivate, dispatch);
    setLoad(false);
  };
  useEffect(() => {
    GetLeads(axiosPrivate, dispatch);
  }, [dispatch]);

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
              <Link to="/integrations/Hunter/apiImport">
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
                        <Button
                          size="sm"
                          isLoading={load ? true : false}
                          onClick={() => handleDelete(lead._id)}
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
export default Hunter;
