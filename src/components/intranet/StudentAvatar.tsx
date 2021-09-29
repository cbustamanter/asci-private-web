import { Avatar } from "@chakra-ui/react";
import React from "react";
import { S3_URL } from "../../utils/constant";
import { useIsAuth } from "../../utils/useIsAuth";

interface StudentAvatarProps {}

export const StudentAvatar: React.FC<StudentAvatarProps> = ({}) => {
  const { data } = useIsAuth();
  const profileImg = data?.gender == 1 ? "boyprofile" : "girlprofile";
  const profileUrl = `${S3_URL}/public-assets/${profileImg}.png`;
  return <Avatar h="32px" w="32px" src={profileUrl} bg="blue.500" />;
};
