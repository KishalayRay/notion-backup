import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";

const PricingBox = ({ pro, name, isBilledAnnually }) => {
  return (
    <Box
      boxShadow="sm"
      p={6}
      rounded="lg"
      bg={pro ? "white" : "white"}
      borderColor={pro ? "brand.500" : "gray.200"}
      backgroundColor={pro ? "brand.50" : "white"}
      borderWidth={2}
    >
      <VStack spacing={3} align="flex-start">
        <Text fontWeight={600} casing="uppercase" fontSize="sm">
          {name}
        </Text>
        <Box w="full">
          {isBilledAnnually ? (
            <Text fontSize="3xl" fontWeight="medium">
              $89
            </Text>
          ) : (
            <Text fontSize="3xl" fontWeight="medium">
              $99
            </Text>
          )}
          <Text fontSize="sm">per month per site</Text>
        </Box>

        <Text>Unlock key features and higher usage limits</Text>
        <VStack>
          <Button size="sm" colorScheme="brand">
            Free 14-day trial →
          </Button>
        </VStack>

        <VStack pt={8} spacing={4} align="flex-start">
          <Text fontWeight="medium">Everything in Basic, plus:</Text>
          <List spacing={3}>
            <ListItem>
              <HStack align="flex-start" spacing={1}>
                <ListIcon as={CheckCircleIcon} color="brand.500" mt={1} />
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </Text>
              </HStack>
            </ListItem>
          </List>
        </VStack>
      </VStack>
    </Box>
  );
};

const PricingSection = () => {
  const [isBilledAnnually, setIsBilledAnnually] = useState(true);
  return (
    <VStack spacing={10} align="center">
      <SimpleGrid spacing={10}>
        <PricingBox
          pro={false}
          name="Starter"
          isBilledAnnually={isBilledAnnually}
        />

        <PricingBox
          pro={true}
          name="Creator"
          isBilledAnnually={isBilledAnnually}
        />
      </SimpleGrid>
    </VStack>
  );
};
export default PricingSection;
