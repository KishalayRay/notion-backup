import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Avatar,
  Text,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Integration = () => {
  const [integrations, setIntegrations] = useState([]);
  useEffect(() => {
    const allIntegrations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/notionconfig/allauth`,
          {
            headers: {
              token: `Bearer ${
                JSON.parse(localStorage.getItem("user")).accessToken
              }`,
            },
          }
        );
        console.log(response.data.data.NotionApi[0].credentials);
        setIntegrations(response.data.data.NotionApi[0].credentials);
      } catch (e) {
        console.log(e);
      }
    };
    allIntegrations();
  }, []);
  return (
    <Box as="section" py={{ base: "4", md: "8" }}>
      <Container>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "5", md: "6" }}>
          {integrations.map((integration) => {
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