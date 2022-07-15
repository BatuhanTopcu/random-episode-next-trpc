import { trpc } from "@utils/trpc";
import { useState } from "react";
import { useDebounce } from "./useDebounce";

export const useSearch = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 750);
  const { data, isLoading } = trpc.useQuery(["search", debouncedSearch], {
    refetchOnWindowFocus: false,
    enabled: debouncedSearch.length > 0,
  });

  return {
    search,
    setSearch,
    debouncedSearch,
    data,
    isLoading,
  };
};
