import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Container } from "../components/Container";

const Forbidden: React.FC<{}> = ({}) => {
  return (
    <Container minHeight="100vh" justifyContent="center">
      <Flex color="platedark" alignItems="center">
        <Box borderRight="1px" borderColor="gray.400" mr={4}>
          <Heading fontSize={22} p={3} mr={4}>
            403
          </Heading>
        </Box>
        <Text fontSize={14}>Forbidden</Text>
      </Flex>
    </Container>
  );
};
export default Forbidden;
