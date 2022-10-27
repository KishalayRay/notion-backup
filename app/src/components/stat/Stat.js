import { useState, useEffect } from "react";
import {
  Box,
  chakra,
  SimpleGrid,
  Text,
  Center,
  Spinner,
  Stat,
  StatLabel,
  Container,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery } from "react-query";
const Stats = () => {
  const axiosPrivate = useAxiosPrivate();
  // const [stat, setStat] = useState({
  //   keys: 0,
  //   integrations: 0,
  // });
  const fetchStat = async () => {
    const response = await axiosPrivate.get(`/stat/getstats`);
    return response.data.data;
  };

  const { isLoading, isError, error, data: stat } = useQuery("stat", fetchStat);
  if (isLoading) {
    return (
      <Center>
        <Spinner mt={16} color="purple.500" size="xl" />
      </Center>
    );
  }
  if (isError) return <div>Error</div>;
  return (
    <Box as="section" py={{ base: "4", md: "8" }}>
      <Container>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "5", md: "6" }}>
          <StatsCard
            title={"Activated Integrations:"}
            stat={stat.integrations !== 0 ? stat.integrations.total : 0}
          />
          <StatsCard
            title={"Activated Api Keys:"}
            stat={stat.keys !== 0 ? stat.keys.total : 0}
          />
          <StatsCard
            title={"Active Since:"}
            stat={`${stat.active !== 0 ? stat.active.age : 0} month`}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};
const StatsCard = (props) => {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: "4", md: "6" }}
      py={{ base: "5", md: "6" }}
      bg="bg-surface"
      borderRadius="lg"
      boxShadow={useColorModeValue("sm", "sm-dark")}
    >
      <StatLabel fontWeight={"medium"} fontSize={"2xl"} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontWeight={"small"} fontSize={"1xl"}>
        {stat}
      </StatNumber>
    </Stat>
  );
};
export default Stats;
