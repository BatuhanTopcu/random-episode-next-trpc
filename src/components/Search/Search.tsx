import { useEffect, useRef, useState } from "react";
import { useDebounce, useOutsideAlerter } from "@utils/hooks";
import { Show } from "@types";
// import { apiSearch } from "@requests";
import ShowCard from "@components/ShowCard";
import SearchInput from "./SearchInput";

export default function Search() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 750);
  const [results, setResults] = useState<Show[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef(null);
  useOutsideAlerter(() => setIsOpen(false), searchRef);

  useEffect(() => {
    if (debouncedSearch.length > 2) {
      (async () => {
        // const data = await apiSearch(debouncedSearch);
        // setResults(data);
      })();
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

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
          {results.length === 0 && debouncedSearch.length > 2 && (
            <div className="no-result">No results found</div>
          )}
          {debouncedSearch.length <= 2 && (
            <div className="no-result">
              Type {3 - debouncedSearch.length} more characters
            </div>
          )}
          {results.length > 0 &&
            results.map((show) => <ShowCard key={show.id} show={show} />)}
        </div>
      </div>
    </div>
  );
}
