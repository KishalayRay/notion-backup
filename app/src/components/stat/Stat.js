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
const Stats = () => {
  const axiosPrivate = useAxiosPrivate();
  const [stat, setStat] = useState({
    keys: 0,
    integrations: 0,
  });
  const fetchStat = async () => {
    const response = await axiosPrivate.get(`/stat/getstats`);
    setStat({
      keys: response.data.data.keys,
      integrations: response.data.data.integrations,
      active: response.data.data.active,
    });
  };
  useEffect(() => {
    fetchStat();
  }, []);
  return (
    <Box as="section" py={{ base: "4", md: "8" }}>
      <Container>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "5", md: "6" }}>
          <StatsCard
            title={"Activated Integrations:"}
            stat={stat.integrations}
          />
          <StatsCard title={"Activated Api Keys:"} stat={stat.keys} />
          <StatsCard title={"Active Since:"} stat={`${stat.active} month`} />
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
