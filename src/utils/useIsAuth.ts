import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ fetching, data }] = useMeQuery();
  const router = useRouter();
  const isChecking = useRef(true);
  useEffect(() => {
    if (!data?.me && !fetching) {
      router.replace(`/login?next=${router.pathname}`);
    } else {
      isChecking.current = false;
    }
    return () => {
      isChecking.current = false;
    };
  }, [fetching, data, router]);
  return { isChecking: isChecking.current, data: data?.me };
};
