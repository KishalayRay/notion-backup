import { useState } from "react";
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
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import { DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useContext, useEffect } from "react";
import { StockDatalistContext } from "./stockDatalistContext/listContext";

import { GetStocks, DeleteStock } from "./stockDatalistContext/apiCalls";
const StockData = () => {
  const [load, setLoad] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch, stockData } = useContext(StockDatalistContext);

  useEffect(() => {
    GetStocks(axiosPrivate, dispatch);
  }, [dispatch]);
  const handleDelete = async (id) => {
    setLoad(true);
    console.log(id);
    await DeleteStock(id, axiosPrivate, dispatch);
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
              <Link to="/integrations/Alphavantage/apiImport">
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
                {stockData.map((stock) => {
                  return (
                    <Tr>
                      <Td>{stock.stockSymbol}</Td>
                      <Td>{stock.stockPrice}</Td>
                      <Td>{stock.stockDayChangeParcentage}%</Td>
                      <Td>{stock.stockDayHigh}</Td>
                      <Td>{stock.stockDayLow}</Td>
                      <Td>
                        <Button
                          size="sm"
                          isLoading={load ? true : false}
                          onClick={() => handleDelete(stock._id)}
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
export default StockData;
