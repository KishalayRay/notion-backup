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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { CheckIcon } from "@chakra-ui/icons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const Account = () => {
  const { auth } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const axiosPrivate = useAxiosPrivate();
  // const [user, setUser] = useState({});
  // const [subscription, setSubscription] = useState("");
  const navigate = useNavigate();
  const handleSubscription = async () => {
    const response = await axiosPrivate.post(`/subs/cancel`, {});
    navigate("/apis");
    console.log(response.data);
  };
  const fetchUser = async () => {
    const response = await axiosPrivate.get(`/auth/user`);
    return response.data.data.user;
    // console.log(response.data.data.user);
    // setUser(response.data.data.user);
  };
  const fetchSubscription = async () => {
    const response = await axiosPrivate.get(`/subs/subscription`);
    if (!response.data.data.subscription.data.length) {
      return "Free";
      // setSubscription("Free");
    }
    if (response.data.data.subscription.data.length) {
      if (
        response.data.data.subscription.data[0].plan.nickname === "Pro" &&
        response.data.data.subscription.data[0].status === "active"
      ) {
        // setSubscription(response.data.data.subscription.data[0].plan.nickname);
        return response.data.data.subscription.data[0].plan.nickname;
      } else {
        // setSubscription("Free");
        return "Free";
      }
    }

    console.log(response.data);
  };
  useEffect(() => {
    fetchUser();
    fetchSubscription();
  }, []);
  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
    data: user,
  } = useQuery("user", fetchUser);
  const {
    isLoading: isLoadingSub,
    isError: isErrorSub,
    error: errorSub,
    data: subscription,
  } = useQuery("subscription", fetchSubscription);
  if (isLoadingUser || isLoadingSub) {
    return (
      <Center>
        <Spinner mt={16} color="purple.500" size="xl" />
      </Center>
    );
  }
  if (isErrorUser || isErrorSub) return <div>Error</div>;
  return (
    <>
      <Center py={6}>
        <Box
          maxW={"530px"}
          w={"full"}
          rounded={"md"}
          overflow={"hidden"}
          bg="bg-surface"
          borderRadius="lg"
        >
          <Stack textAlign={"center"} p={6} align={"center"}>
            <Avatar
              alt={"Author"}
              src="https://img.icons8.com/cotton/344/super-mario.png"
            />
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
              <>
                <Button
                  onClick={onOpen}
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
                  Cancel Subscription
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Important!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text>
                        Are you sure that you want to cancel the Subscription?
                      </Text>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          handleSubscription();
                        }}
                      >
                        Yes
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
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
  );
};
export default Account;
