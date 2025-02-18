import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { useDebouncedCallback, useThrottledCallback } from "use-debounce";
import { useSearcherContext } from "~/contexts/searcherContext";

const useSearcher = () => {
  const [query, setQuery] = useState("");

  const { feed } = api.useUtils();
  const { setPosts, setUsers, setIsLoading } = useSearcherContext();
  const debouncedSearch = useDebouncedCallback(async () => {
    try {
      setIsLoading(true);
      const { posts, users } = await feed.search.fetch(query);

      setUsers(users);
      setPosts(posts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
    // isSuccess && setIsLoading(false)
    // isError && setIsLoading(false)
  }, 300);

  useEffect(() => {
    if (query) {
      debouncedSearch();
    }
  }, [query]);

  return {
    query,
    setQuery,
    // accounts,
    // posts,
    // isPending,
  };
};

export default useSearcher;
