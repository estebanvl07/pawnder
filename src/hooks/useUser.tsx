import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useMemo } from "react";
import { api } from "~/utils/api";

interface usePostProps {
  userTag: string;
}

export const useUser = ({ userTag }: usePostProps) => {
  // if (!userTag) {
  //   throw new Error("This hook required userTag");
  // }

  const queryClient = useQueryClient();
  const hasUser = useMemo(() => {
    const userKey = getQueryKey(api.user.getUserByTag, undefined, "query");
    const postsCached = queryClient.getQueryData(userKey);
    return Boolean(postsCached);
  }, []);

  const { data: user, isLoading } = api.user.getUserByTag.useQuery(
    { userTag },
    {
      enabled: !hasUser,
    },
  );

  return { user, isLoading };
};
