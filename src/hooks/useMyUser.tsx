import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useMemo } from "react";
import { api } from "~/utils/api";

export const useMyUser = () => {
  const queryClient = useQueryClient();
  const hasUser = useMemo(() => {
    const userKey = getQueryKey(api.user.userLogged, undefined, "query");
    const serCached = queryClient.getQueryData(userKey);
    return Boolean(serCached);
  }, []);

  const { data: user, isLoading } = api.user.userLogged.useQuery(undefined, {
    enabled: !hasUser,
  });

  return { user, isLoading };
};
