import * as React from "react";
import {
  Box,
  Button,
  Flex,
  LightMode,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue as mode,
  Tooltip,
} from "@chakra-ui/react";
import { HiArrowNarrowRight, HiCheckCircle } from "react-icons/hi";

const PriceDisplay = (props) => {
  const { currency, price, duration, ...rest } = props;
  return (
    <Flex w="100%" align="center" fontWeight="extrabold" {...rest}>
      <Text fontSize="4xl" lineHeight="1" marginEnd="2">
        {currency}
      </Text>
      <Text fontSize="6xl" lineHeight="1" letterSpacing="tight">
        {price}
      </Text>
      <Text fontSize="2xl" marginStart="1" alignSelf="flex-end">
        {duration}
      </Text>
    </Flex>
  );
};

const PricingDetail = (props) => {
  const { children, ...rest } = props;
  return (
    <ListItem display="flex" alignItems="center" fontWeight="medium" {...rest}>
      <ListIcon
        fontSize="2xl"
        as={HiCheckCircle}
        color="gray.400"
        marginEnd="4"
        mt="1"
      />
      <Text as="span" display="inline-block">
        {children}
      </Text>
    </ListItem>
  );
};

export const PricingCard = (props) => {
  const {
    features,
    name,
    id,
    description,
    onClick,
    price,
    duration,
    subscribed,
    colorScheme: c,
    ...rest
  } = props;
  return (
    <Box
      bg={mode("white", "gray.700")}
      shadow="md"
      w="full"
      maxW="lg"
      mx="auto"
      rounded="lg"
      overflow="hidden"
      {...rest}
    >
      <Box bg={`${c}.600`} px="8" py="8" color="white">
        <Text fontWeight="bold" fontSize="lg">
          {name}
        </Text>
        <PriceDisplay my="2" currency="$" price={price} duration={duration} />
        <Text>{description}</Text>
      </Box>
      <Box px="8" py="6" borderBottomWidth="1px">
        <LightMode>
          <Button
            onClick={() => onClick(id)}
            size="lg"
            isDisabled={subscribed === "Free" ? false : true}
            w="full"
            colorScheme={c}
            rightIcon={<HiArrowNarrowRight />}
          >
            Get Started
          </Button>
        </LightMode>
        <Text
          mt="2"
          color={mode("gray.600", "gray.400")}
          align="center"
          fontSize="sm"
        >
          No credit card required
        </Text>
      </Box>
      <Box px="8" pt="10" pb="12">
        <List stylePosition="outside" spacing="4">
          {features.map((feature, index) => (
            <PricingDetail key={index}>{feature}</PricingDetail>
          ))}
        </List>
      </Box>
    </Box>
  );
};
