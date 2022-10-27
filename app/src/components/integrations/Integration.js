import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Avatar,
  Text,
  Center,
  Spinner,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
const Integration = () => {
  const axiosPrivate = useAxiosPrivate();

  const allIntegrations = async () => {
    const response = await axiosPrivate.get(`/notionconfig/allauth`);
    console.log(response.data.data);
    return response.data.data;
    // console.log(response.data.data.NotionApi[0].credentials);
    // setIntegrations(response.data.data.NotionApi[0].credentials);
  };

  const {
    isLoading: isLoading,
    isError: isError,
    error: error,
    data: integrations,
  } = useQuery("integrations", allIntegrations);
  if (isLoading)
    return (
      <Center>
        <Spinner mt={16} color="purple.500" size="xl" />
      </Center>
    );
  if (integrations.NotionApi.length === 0) {
    return (
      <Center>
        <Text fontSize="2xl">No integrations yet</Text>
      </Center>
    );
  }
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <Box as="section" py={{ base: "4", md: "8" }}>
      <Container>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "5", md: "6" }}>
          {integrations.NotionApi[0].credentials.map((integration) => {
            return (
              <Link
                to={`/integrations/${integration.apiSlug}`}
                state={integrations}
              >
                <Stat name={integration.apiSlug} />
              </Link>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
export default Integration;

const Stat = ({ name, image }) => {
  return (
    <Box
      px={{ base: "4", md: "6" }}
      py={{ base: "5", md: "6" }}
      bg="bg-surface"
      borderRadius="lg"
      boxShadow={useColorModeValue("sm", "sm-dark")}
    >
      <Text fontSize="2xl">{name}</Text>

      {/* <Heading size={useBreakpointValue({ base: "sm", md: "md" })}>
          {value}
        </Heading> */}
    </Box>
  );
};
