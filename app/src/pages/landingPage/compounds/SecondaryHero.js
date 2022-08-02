import {
  Box,
  Button,
  Flex,
  Heading,
  Img,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import * as Logos from "./Brands";
const SecondaryHero = () => {
  return (
    <Box
      as="section"
      bg={mode("gray.50", "gray.800")}
      pt="24"
      pb="12"
      overflow="hidden"
    >
      <Box
        maxW={{
          base: "xl",
          md: "7xl",
        }}
        mx="auto"
        px={{
          base: "6",
          md: "8",
        }}
      >
        <Flex
          align="flex-start"
          direction={{
            base: "column",
            lg: "row",
          }}
          justify="space-between"
          mb="20"
        >
          <Box
            flex="1"
            maxW={{
              lg: "xl",
            }}
            pt="6"
          >
            <Heading as="h1" size="3xl" mt="8" fontWeight="extrabold">
              All-in-one online form & survey builder
            </Heading>
            <Text color={mode("gray.600", "gray.400")} mt="5" fontSize="xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua
              adipiscing elit.
            </Text>
            <Button
              mt="8"
              minW="14rem"
              colorScheme="purple"
              size="lg"
              height="14"
              px="8"
              fontSize="md"
              fontWeight="bold"
            >
              Get Started for free
            </Button>
          </Box>
          <Box
            boxSize={{
              base: "20",
              lg: "8",
            }}
          />
          <Img
            pos="relative"
            marginEnd="-16rem"
            w="50rem"
            src="https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
            alt="Screenshot for Form builder"
          />
        </Flex>
        <Box>
          <Text color={mode("gray.600", "gray.400")} fontWeight="medium">
            Proudly trusted by 5,000+ companies and individuals
          </Text>
          <SimpleGrid
            mt="8"
            columns={{
              base: 2,
              md: 3,
              lg: 6,
            }}
            color="gray.500"
            alignItems="center"
            spacing={{
              base: "12",
              lg: "24",
            }}
            fontSize="2xl"
          >
            <Logos.ChatMonkey />
            <Logos.Wakanda />
            <Logos.Lighthouse />
            <Logos.Plumtic />
            <Logos.WorkScout />
            <Logos.Finnik />
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};
export default SecondaryHero;
