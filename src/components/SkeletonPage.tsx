import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

interface SkeletonPageProps {
  sections: number;
  itemPerSection: number;
}

export const SkeletonPage: React.FC<SkeletonPageProps> = ({
  sections,
  itemPerSection,
}) => {
  return (
    <Stack mt={6} spacing={6}>
      {[...Array(sections)].map((_, idx) => (
        <Stack key={idx} direction="column" spacing={4}>
          <Skeleton height="25px" width="20%" />
          {[...Array(itemPerSection)].map((_, idx) => (
            <Skeleton key={idx} height="15px" width="100%" />
          ))}
        </Stack>
      ))}
    </Stack>
  );
};
