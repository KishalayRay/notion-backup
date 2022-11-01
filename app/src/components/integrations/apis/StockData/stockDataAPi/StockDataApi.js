import {
  Box,
  Center,
  Text,
  Stack,
  Flex,
  Spacer,
  Button,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Input,
  Spinner,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { useContext, useState, useEffect } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { StockDataContext } from "../context/context";
import { StockDatalistContext } from "../stockDatalistContext/listContext";
import { Link } from "react-router-dom";
import { CreateStock } from "../stockDatalistContext/apiCalls";
const StockData = () => {
  const axiosPrivate = useAxiosPrivate();
  const { query, searchStock, stocks, addStock, isLoading, fetchStock } =
    useContext(StockDataContext);
  const { dispatch } = useContext(StockDatalistContext);
  const [queryM, setQueryM] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    searchStock(queryM);
  };
  useEffect(() => {
    fetchStock(axiosPrivate);
    return () => {
      setQueryM("");
    };
  }, [query]);
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
              <Link to="/integrations/Alphavantage">
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
              <InputGroup
                size="md"
                w={"400px"}
                fontSize="md"
                focusBorderColor={useColorModeValue("blue.500", "blue.200")}
              >
                <Input
                  pr="4.5rem"
                  type="text"
                  placeholder="Search Stocks ETFs or Mutual funds..."
                  value={queryM}
                  onChange={(e) => {
                    setQueryM(e.target.value);
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleSearch}>
                    Search
                  </Button>
                </InputRightElement>
              </InputGroup>
            </center>
            {isLoading ? (
              <Center>
                <Spinner mt={16} color="purple.500" size="xl" />
              </Center>
            ) : (
              <>
                {stocks.map((stock) => {
                  return (
                    <Flex>
                      <Stack
                        mt={6}
                        direction={"row"}
                        spacing={4}
                        align={"center"}
                        key={stock.symbol}
                      >
                        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                          <Text fontWeight={600}>{stock["1. symbol"]}</Text>
                          <h2 fontWeight={800}>{stock["2. name"]}</h2>
                          <Text color={"gray.500"}>{stock["3. type"]}</Text>
                          <Text color={"gray.500"}>{stock["4. region"]}</Text>
                        </Stack>
                      </Stack>
                      <Spacer />
                      <Button
                        mt={14}
                        colorScheme="purple"
                        size="sm"
                        onClick={() => {
                          CreateStock(
                            stock["1. symbol"],
                            stock["2. name"],
                            axiosPrivate,
                            dispatch
                          );
                          addStock(stock["1. symbol"]);
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
export default StockData;
