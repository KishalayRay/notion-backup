import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import * as React from "react";
import { FiMenu } from "react-icons/fi";
import { Logo } from "./Logo";

const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Box as="section" pb={{ base: "12", md: "24" }}>
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow={useColorModeValue("sm", "sm-dark")}
      >
        <Container py={{ base: "4", lg: "5" }}>
          <HStack spacing="10" justify="space-between">
            <Logo />
            {isDesktop ? (
              <Flex justify="space-between" flex="1">
                <ButtonGroup variant="link" spacing="8">
                  <Button>
                    <Link to="/product">Product</Link>
                  </Button>
                  <Button>
                    <Link to="/">Pricing</Link>
                  </Button>
                </ButtonGroup>
                <HStack spacing="3">
                  <Link to="/login">
                    <Button variant="ghost"> Sign in </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary"> Sign up</Button>
                  </Link>
                </HStack>
              </Flex>
            ) : (
              <IconButton
                variant="ghost"
                icon={<FiMenu fontSize="1.25rem" />}
                aria-label="Open Menu"
              />
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};
export default Navbar;
