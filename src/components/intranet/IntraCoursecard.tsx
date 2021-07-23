import { Button, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { S3_URL } from "../../utils/constant";

interface IntraCoursecardProps {}

export const IntraCoursecard: React.FC<IntraCoursecardProps> = ({}) => {
  return (
    <Stack maxWidth="288px" p={3} backgroundColor="blue.800" borderRadius="4px">
      <Image
        src={`${S3_URL}/public-assets/templatenext1.png`}
        width="272px"
        height="140px"
      />
      <Text color="white" fontWeight="700" fontSize="16px">
        Diseño de diques rompeolas con cubípodos
      </Text>
      <Text>Inicia el 24 de mayo</Text>
      <Button variant="outline-main">Inscríbete</Button>
    </Stack>
  );
};
