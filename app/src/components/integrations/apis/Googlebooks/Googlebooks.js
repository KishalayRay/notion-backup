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
import { GooglebookslistContext } from "./googlebookslistContext/listContext";

import { GetBooks, DeleteBook } from "./googlebookslistContext/apiCalls";
const Googlebooks = () => {
  const [load, setLoad] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch, book } = useContext(GooglebookslistContext);

  useEffect(() => {
    GetBooks(axiosPrivate, dispatch);
  }, [dispatch]);
  const handleDelete = async (id) => {
    setLoad(true);
    console.log(id);
    await DeleteBook(id, axiosPrivate, dispatch);
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
              <Link to="/integrations/Googlebooks/apiImport">
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
                    <Text fontWeight={600}>Title</Text>{" "}
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Cover</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Author</Text>
                  </Th>

                  <Th>
                    <Text fontWeight={600}>Page count</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Category</Text>
                  </Th>
                  <Th>
                    <Text fontWeight={600}>Action</Text>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {book.map((volume) => {
                  return (
                    <Tr key={volume.bookId}>
                      <Td>{volume.bookTitle}</Td>
                      <Td>
                        <Image
                          htmlHeight="45px"
                          htmlWidth="35px"
                          objectFit="cover"
                          rounded={"sm"}
                          src={
                            volume.bookCover ||
                            `https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg`
                          }
                          alt={""}
                        />
                      </Td>
                      <Td>{volume.bookAuthor}</Td>
                      <Td>{volume.bookPage}</Td>
                      <Td>{volume.bookCategory}</Td>
                      <Td>
                        <Button
                          size="sm"
                          isLoading={load ? true : false}
                          onClick={() => handleDelete(volume._id)}
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
export default Googlebooks;
