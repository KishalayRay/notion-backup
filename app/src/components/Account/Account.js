import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  Heading,
  ListIcon,
  Spinner,
  Avatar,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckIcon } from "@chakra-ui/icons";
import axios from "axios";

const Account = () => {
  const [user, setUser] = useState({});
  const [subscription, setSubscription] = useState("");
  const navigate = useNavigate();
  const handleSubscription = async () => {
    const response = await axios.post(
      `http://localhost:8000/api/v1/subs/cancel`,
      {},
      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    navigate("/apis");
    console.log(response.data);
  };
  const fetchUser = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/auth/user`,

      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    console.log(response.data.data.user);
    setUser(response.data.data.user);
  };
  const fetchSubscription = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/subs/subscription`,

      {
        headers: {
          token: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    if (!response.data.data.subscription.data.length) {
      setSubscription("Free");
    }
    if (response.data.data.subscription.data.length) {
      if (
        response.data.data.subscription.data[0].plan.nickname === "Pro" &&
        response.data.data.subscription.data[0].status === "active"
      ) {
        setSubscription(response.data.data.subscription.data[0].plan.nickname);
      } else {
        setSubscription("Free");
      }
    }

    console.log(response.data);
  };
  useEffect(() => {
    fetchUser();
    fetchSubscription();
  }, []);
  return (
    <>
      {!subscription ? (
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
          <Center py={6}>
            <Box
              maxW={"530px"}
              w={"full"}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Stack textAlign={"center"} p={6} align={"center"}>
                <Avatar alt={"Author"} />
                <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                  <Text fontWeight={600}>{user.username}</Text>
                  <Text color={"gray.500"}>{user.email}</Text>
                </Stack>
              </Stack>

              <Box px={6} py={10}>
                <Stack mt={8} direction={"row"} spacing={4}>
                  <Center>
                    <Heading
                      fontSize={"2xl"}
                      fontFamily={"body"}
                      pl="120px"
                      pr="20px"
                    >
                      Subscription:
                    </Heading>
                    <Button
                      flex={1}
                      fontSize={"sm"}
                      rounded={"full"}
                      _focus={{
                        bg: "gray.200",
                      }}
                      w={"full"}
                      pl="20px"
                    >
                      <Heading fontSize={"sm"}>{subscription}</Heading>
                    </Button>
                  </Center>
                </Stack>
                {subscription === "Pro" ? (
                  <Button
                    mt={10}
                    w={"full"}
                    bg={"purple.400"}
                    color={"white"}
                    rounded={"xl"}
                    _hover={{
                      bg: "purple.500",
                    }}
                    _focus={{
                      bg: "purple.500",
                    }}
                    onClick={() => {
                      handleSubscription();
                    }}
                  >
                    Cancel Subscription
                  </Button>
                ) : (
                  <Link to="/upgrade">
                    <Button
                      mt={10}
                      w={"full"}
                      bg={"purple.400"}
                      color={"white"}
                      rounded={"xl"}
                      _hover={{
                        bg: "purple.500",
                      }}
                      _focus={{
                        bg: "purple.500",
                      }}
                    >
                      Upgrade Pro
                    </Button>
                  </Link>
                )}

                <Button
                  mt={10}
                  w={"full"}
                  bg={"purple.400"}
                  color={"white"}
                  rounded={"xl"}
                  _hover={{
                    bg: "purple.500",
                  }}
                  _focus={{
                    bg: "purple.500",
                  }}
                >
                  Invoice
                </Button>
              </Box>
            </Box>
          </Center>
        </>
      )}
    </>
  );
};
export default Account;
