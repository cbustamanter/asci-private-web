import { Stack, Skeleton, Box, HStack, Flex } from "@chakra-ui/react";
import React from "react";

export const SkeletonTable: React.FC<{}> = ({}) => {
  return (
    <Stack mt={6}>
      <Stack direction="row" mb={4}>
        <Skeleton height="30px" width="20%" />
        <Skeleton height="30px" width="20%" />
        <Skeleton height="30px" width="20%" style={{ marginLeft: "auto" }} />
      </Stack>
      {[...Array(10)].fill(0).map((_, idx) => (
        <Skeleton key={idx} height="20px" width="100%" />
      ))}
    </Stack>
  );
};
