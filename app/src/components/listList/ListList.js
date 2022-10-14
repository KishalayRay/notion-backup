import { useContext, useEffect, useState } from "react";
import { Spinner, Center } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  Container,
  Image,
  Stack,
  Badge,
  Avatar,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const List = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [proList, setProList] = useState([]);
  const [lists, setLists] = useState([]);
  const fetchProList = async () => {
    const response = await axiosPrivate.get(`/apilist/pro`);
    setProList(response.data.data.api);
    console.log(response.data.data.api);
  };

  const fetchList = async () => {
    const response = await axiosPrivate.get(`/apilist/`);
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
          <Spinner mt={16} color="purple.500" size="xl" />
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
                          isPro={false}
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
                        isPro={true}
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
  const { title, stat, image, isPro } = props;
  return (
    <Stat
      px={{ base: "4", md: "6" }}
      py={{ base: "5", md: "6" }}
      bg="bg-surface"
      borderRadius="lg"
      boxShadow={useColorModeValue("sm", "sm-dark")}
    >
      <StatLabel fontWeight={"medium"} isTruncated>
        <Stack mt={1} direction={"row"} spacing={4} align={"center"}>
          <Image
            boxSize="40px"
            objectFit="cover"
            src={image}
            alt="Dan Abramov"
          />

          <Stack direction={"column"} spacing={0} fontSize={"md"}>
            <Text fontWeight={600}>{title}</Text>
          </Stack>
          {isPro ? (
            <Badge colorScheme="purple" variant="solid">
              Pro
            </Badge>
          ) : (
            <></>
          )}
        </Stack>
      </StatLabel>
      <Text mt={2} sssfontSize="xl">
        {stat}
      </Text>
    </Stat>
  );
}
export default List;
