import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAdm = () => {
  const [{ fetching, data }] = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!data?.me && !fetching) {
      router.replace(`/login?next=${router.pathname}`);
    } else if (!data?.me?.role && !fetching) {
      router.replace("/403");
    }
  }, [fetching, data, router]);
};
