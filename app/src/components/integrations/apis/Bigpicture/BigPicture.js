import { useState } from "react";
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
import { BigPicturelistContext } from "./BigPicturelistContext/listContext";

import { GetCompanies, DeleteCompany } from "./BigPicturelistContext/apiCalls";
const BigPicture = () => {
  const [load, setLoad] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch, companies } = useContext(BigPicturelistContext);

  useEffect(() => {
    GetCompanies(axiosPrivate, dispatch);
  }, [dispatch]);
  const handleDelete = async (id) => {
    setLoad(true);
    console.log(id);
    await DeleteCompany(id, axiosPrivate, dispatch);
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
              <Link to="/integrations/Bigpicture/apiImport">
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
                    <Text fontWeight={600}>Company</Text>{" "}
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Site</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Sector</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Action</Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {companies.map((company) => {
                  return (
                    <Tr key={company._id}>
                      <Td>{company.company}</Td>
                      <Td>{company.site}</Td>
                      <Td>{company.sector[0]}</Td>
                      <Td>
                        <Button
                          size="sm"
                          isLoading={load ? true : false}
                          onClick={() => handleDelete(company._id)}
                        >
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
export default BigPicture;
