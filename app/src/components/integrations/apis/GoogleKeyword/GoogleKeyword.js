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

import { GoogleKeywordContext } from "./GoogleKeywordContext/listContext";
import { DeleteIcon } from "@chakra-ui/icons";
import { GetKeywords, CreateKeyword } from "./GoogleKeywordContext/apiCalls";

const GoogleKeyword = () => {
  const axiosPrivate = useAxiosPrivate();
  const { dispatch, keywords } = useContext(GoogleKeywordContext);
  const [keyword, setKeyword] = useState("");
  const [load, setLoad] = useState(false);
  useEffect(() => {
    GetKeywords(axiosPrivate, dispatch);
  }, [dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    console.log();
    await CreateKeyword(keyword, axiosPrivate, dispatch);
    setKeyword("");
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
            <Stack direction={"row"} spacing={3}>
              <Text
                fontSize={"2xl"}
                fontWeight={500}
                fontFamily={"body"}
                pb={3}
              >
                Keyword
              </Text>
              <Input
                width="auto"
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="ideas"
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
                    <Text fontWeight={600}>Keyword</Text>
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
                {keywords.map((query) => {
                  return (
                    <Tr key={query._id}>
                      <Td>{query.keyword}</Td>
                      <Td>{query.date.substring(0, 10)}</Td>
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
export default GoogleKeyword;
