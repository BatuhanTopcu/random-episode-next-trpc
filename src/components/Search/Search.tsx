import { useRef, useState } from "react";
import { useDebounce, useOutsideAlerter } from "@utils/hooks";
import ShowCard from "@components/ShowCard";
import SearchInput from "./SearchInput";
import { trpc } from "@utils/trpc";

export default function Search() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 750);
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = trpc.useQuery(["search", debouncedSearch], {
    refetchOnWindowFocus: false,
    enabled: debouncedSearch.length > 0,
  });

  const searchRef = useRef(null);
  useOutsideAlerter(() => setIsOpen(false), searchRef);

  return (
    <div className="search__container" ref={searchRef}>
      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />

      <div
        className={`search__results ${
          isOpen && debouncedSearch.length > 0 ? "show" : ""
        }`}
      >
        <div className="search__results__scroll">
          {data?.results.length === 0 &&
            !isLoading &&
            debouncedSearch.length > 0 && (
              <div className="no-result">No results found</div>
            )}
          {isLoading && <div className="no-result">Loading...</div>}
          {data &&
            !isLoading &&
            data.results.length > 0 &&
            data?.results.map((show) => <ShowCard key={show.id} show={show} />)}
        </div>
      </div>
    </div>
  );
}
