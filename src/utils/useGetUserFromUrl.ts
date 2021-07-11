import { useRouter } from "next/router";
import { useGetUserQuery } from "../generated/graphql";
import { useGetStringId } from "./useGetStringId";

export const useGetUserFromUrl = () => {
  const stringId = useGetStringId();
  return useGetUserQuery({
    pause: stringId === "pause",
    variables: {
      id: stringId,
    },
  });
};
