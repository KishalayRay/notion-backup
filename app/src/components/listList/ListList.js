import { useContext, useEffect, useState } from "react";
import { Spinner, Center } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import axios from "axios";

import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  Container,
  StatNumber,
  Stack,
  Avatar,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
//import { getLists } from "../../context/listContext/apiCalls";

const List = () => {
  const [proList, setProList] = useState([]);
  const [lists, setLists] = useState([]);
  const fetchProList = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/apilist/pro`,
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    setProList(response.data.data.api);
    console.log(response.data.data.api);
  };

  const fetchList = async () => {
    const response = await axios.get(`http://localhost:8000/api/v1/apilist/`, {
      headers: {
        token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`,
      },
    });
    setLists(response.data.data.api);
    console.log(response.data.data.api);
  };

  useEffect(() => {
    fetchProList();
    fetchList();
  }, []);
  const listLength = lists.length;
  console.log(listLength);
  return (
    <>
      {!listLength ? (
        <Center>
          <Spinner
            mt={16}
            thickness="4px"
            speed="0.65s"
            emptyColor="purple.200"
            color="purple.500"
            size="xl"
          />
        </Center>
      ) : (
        <>
          {listLength === 1 ? (
            <Box as="section" py={{ base: "6", md: "8" }}>
              <Container>
                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  gap={{ base: "5", md: "6" }}
                >
                  {lists.map((list) => {
                    return (
                      <Link to={`/apis/${list.apiSlug}`} state={list}>
                        <StatsCard
                          title={list.apiName}
                          stat={list.description}
                          image={list.logo}
                        />
                      </Link>
                    );
                  })}
                  {proList.map((list) => {
                    return (
                      <StatsCard
                        title={list.apiName}
                        stat={list.description}
                        image={list.logo}
                      />
                    );
                  })}
                </SimpleGrid>
              </Container>
            </Box>
          ) : (
            <Box as="section" py={{ base: "6", md: "8" }}>
              <Container>
                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  gap={{ base: "5", md: "6" }}
                >
                  {lists.map((list) => {
                    return (
                      <Link to={`/apis/${list.apiSlug}`} state={list}>
                        <StatsCard
                          title={list.apiName}
                          stat={list.description}
                          image={list.logo}
                        />
                      </Link>
                    );
                  })}
                </SimpleGrid>
              </Container>
            </Box>
          )}
        </>
      )}
    </>
  );
};
function StatsCard(props) {
  const { title, stat, image } = props;
  return (
    <Stat
      px={{ base: 4, md: 6 }}
      py={"5"}
      shadow={"xl"}
      border={"2px solid"}
      borderColor={useColorModeValue("white.800", "white.500")}
      rounded={"lg"}
    >
      <StatLabel fontWeight={"medium"} isTruncated>
        <Stack mt={1} direction={"row"} spacing={4} align={"center"}>
          <Avatar src={image} alt={"api"} size={"sm"} objectFit="cover" />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{title}</Text>
          </Stack>
        </Stack>
      </StatLabel>
      <Text mt={2} sssssfontSize="xl">
        {stat}
      </Text>
    </Stat>
  );
}
export default List;
