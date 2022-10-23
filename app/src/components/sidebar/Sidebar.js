import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Badge,
  Icon,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiSettings,
  FiMenu,
  FiChevronDown,
} from "react-icons/fi";
import { SunIcon } from "@chakra-ui/icons";

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          DashBoard
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Link to="/apis">
        <NavItem key={"APIs"} icon={FiHome}>
          APIs
        </NavItem>
      </Link>
      <Link to="/account">
        <NavItem key={"Account"} icon={FiSettings}>
          Account
        </NavItem>
      </Link>
      <Link to="/integrations">
        <NavItem key={"Integrations"} icon={FiCompass}>
          Integrations
        </NavItem>
      </Link>
      <Link to="/usage">
        <NavItem key={"Usage"} icon={FiTrendingUp}>
          Usage
        </NavItem>
      </Link>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "purple.400",
        color: "white",
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState({});
  const signOut = async () => {
    await logout();
    localStorage.clear();
    navigate("/");
  };
  const fetchUser = async () => {
    const response = await axiosPrivate.get(`/auth/user`);
    console.log(response.data.data.user);
    setUser(response.data.data.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Link to="/upgrade">
          {" "}
          <Badge variant="subtle" colorScheme="purple">
            Upgrade
          </Badge>
        </Link>
        {JSON.stringify(auth)}
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<SunIcon />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src="https://img.icons8.com/cotton/344/super-mario.png"
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user.username}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <Link to="/account">
                <MenuItem>Profile</MenuItem>
              </Link>

              <MenuDivider />
              <MenuItem onClick={signOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
export { SidebarContent, MobileNav };
