import { useContext, useEffect, useState } from "react";
import { Spinner, Center } from "@chakra-ui/react";
import { useQuery } from "react-query";
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
import { useNavigate } from "react-router-dom";
const List = () => {
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();
  const fetchProList = async () => {
    const response = await axiosPrivate.get(`/apilist/pro`);
    console.log(response.data);
    return response.data.data.api;
  };

  const fetchList = async () => {
    const response = await axiosPrivate.get(`/apilist/`);
    return response.data.data.api;
  };

  const {
    isLoading: isLoadingPro,
    isError: isErrorPro,
    error: errorPro,
    data: proList,
  } = useQuery("proList", fetchProList);
  const {
    isLoading: isLoadingList,
    isError: isErrorList,
    error: errorList,
    data: lists,
  } = useQuery("lists", fetchList);
  console.log(lists);
  if (isLoadingPro || isLoadingList) {
    return (
      <Center>
        <Spinner mt={16} color="purple.500" size="xl" />
      </Center>
    );
  }
  if (isErrorPro || isErrorList) return <div>Error</div>;
  const listLength = lists.length;
  console.log(listLength);
  return (
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
