import { HStack, Link, Text } from "@chakra-ui/layout";
import React from "react";
import { RiDownload2Fill } from "react-icons/ri";
import { Maybe, SessionFile } from "../../generated/graphql";
import { S3_URL } from "../../utils/constant";

export type CustomSesssionFile = Maybe<
  Array<
    { __typename?: "SessionFile" } & Pick<
      SessionFile,
      "id" | "name" | "filename"
    >
  >
>;

interface ModalMaterialBodyProps {
  data?: CustomSesssionFile;
}

export const ModalMaterialBody: React.FC<ModalMaterialBodyProps> = ({
  data,
}) => {
  return (
    <>
      {data?.map((f, idx) => (
        <Link key={f.id} isExternal href={`${S3_URL}/sessions/${f.filename}`}>
          <HStack color="blue.500" spacing="auto">
            <Text>{`${idx + 1}. ${f.name}`}</Text>
            <RiDownload2Fill />
          </HStack>
        </Link>
      ))}
    </>
  );
};
