import {
  Box,
  Center,
  Stack,
  Button,
  useColorModeValue,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useContext, useEffect } from "react";
//import { StockDatalistContext } from "./stockDatalistContext/listContext";

//import { getStocks, deleteStock } from "./stockDatalistContext/apiCalls";
const Unsplash = () => {
  // const { dispatch, stockData } = useContext(StockDatalistContext);

  // useEffect(() => {
  //   getStocks(dispatch);
  // }, [dispatch]);
  // const handleDelete = (id) => {
  //   console.log(id);
  //   deleteStock(id, dispatch);
  // };

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
              <Link to="/integrations/Unsplash/apiImport">
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
                  <Th>Stock/ETF/Mutual Fund</Th>
                  <Th>Price/NAV</Th>
                  <Th>Day Change</Th>
                  <Th>Todays High</Th>
                  <Th>Todays Low</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* {stockData.map((stock) => {
                  return (
                    <Tr>
                      <Td>{stock.stockSymbol}</Td>
                      <Td>{stock.stockPrice}</Td>
                      <Td>{stock.stockDayChange}</Td>
                      <Td>{stock.stockDayHigh}</Td>
                      <Td>{stock.stockDayLow}</Td>
                      <Td>
                        <DeleteIcon onClick={() => handleDelete(stock._id)} />
                      </Td>
                    </Tr>
                  );
                })} */}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Center>
    </Stack>
  );
};
export default Unsplash;
