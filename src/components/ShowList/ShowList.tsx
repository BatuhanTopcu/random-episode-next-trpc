import React, { useState, useRef } from "react";
import ShowCard from "@components/ShowCard";
import { useShows } from "@utils/shows";
import { useOutsideAlerter } from "@utils/hooks";
import { Show } from "@types";

export default function ShowList({ shows }: { shows: Show[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const divRef = useRef(null);
  useOutsideAlerter(() => setIsOpen(false), divRef);

  return (
    <div ref={divRef}>
      <div className="show-list__fab" onClick={() => setIsOpen(!isOpen)}>
        {shows.length}
      </div>
      <div className={`show-list__items ${isOpen ? "show" : ""}`}>
        <h1 className="title">Show List</h1>
        {shows.length === 0 && (
          <h2 className="no-item">
            Add shows to your list for getting random episodes.
          </h2>
        )}
        {shows.length > 0 && (
          <div className="show-list__items__scroll">
            {shows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
