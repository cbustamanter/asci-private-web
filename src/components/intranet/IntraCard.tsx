import {
  SimpleGrid,
  GridItem,
  Stack,
  Button,
  Text,
  Image,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { S3_URL } from "../../utils/constant";
import NextLink from "next/link";
import moment from "moment";
import { RiCalendar2Fill } from "react-icons/ri";

interface IntraCardProps {
  title: string;
  description: string;
  coverPhoto: string;
  id: string;
  btnText?: string;
  btnDir?: string;
  date?: string;
}

export const IntraCard: React.FC<IntraCardProps> = ({
  title,
  description,
  coverPhoto,
  id,
  btnText,
  btnDir,
  date,
}) => {
  return (
    <SimpleGrid
      columns={12}
      mt={6}
      spacingX={2}
      p={4}
      backgroundColor="blue.800"
      borderRadius={2}
    >
      <GridItem colSpan={{ base: 12, md: 4 }} order={{ base: 2, md: 1 }}>
        <Stack height="100%" justifyContent="space-evenly">
          <Text fontWeight="700" fontSize="18px" color="white">
            {title}
          </Text>
          <Text noOfLines={5}>{description}</Text>
          {date && (
            <HStack>
              <RiCalendar2Fill />
              <Text>
                Realizado: {moment(parseInt(date)).format("DD/MM/YY")}
              </Text>
            </HStack>
          )}

          <NextLink href={btnDir ? btnDir : `/intranet/course/${id}`}>
            <Button width="max-content">
              {btnText ? btnText : "Ver curso"}
            </Button>
          </NextLink>
        </Stack>
      </GridItem>
      <GridItem colSpan={{ base: 12, md: 8 }} order={{ base: 1, md: 2 }}>
        <Stack height="100%" justifyContent="center">
          <Image
            borderRadius={2}
            src={`${S3_URL}/cover-photos/${coverPhoto}`}
            maxHeight="278px"
          />
        </Stack>
      </GridItem>
    </SimpleGrid>
  );
};
