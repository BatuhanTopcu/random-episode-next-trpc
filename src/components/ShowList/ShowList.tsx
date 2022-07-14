import React, { useState, useRef } from "react";
import ShowCard from "@components/ShowCard";
import { useLocalShows } from "@utils/localStorage";
import { useOutsideAlerter } from "@utils/hooks";

export default function ShowList() {
  const [isOpen, setIsOpen] = useState(false);
  const [localShows, setLocalShows] = useLocalShows();
  const divRef = useRef(null);
  useOutsideAlerter(() => setIsOpen(false), divRef);

  return (
    <>
      <div className="show-list__fab" onClick={() => setIsOpen(true)}>
        {localShows.length}
      </div>
      <div className={`show-list__items ${isOpen ? "show" : ""}`} ref={divRef}>
        <h1 className="title">Show List</h1>
        {localShows.length === 0 && (
          <h2 className="no-item">
            Add shows to your list for getting random episodes.
          </h2>
        )}
        {localShows.length > 0 && (
          <div className="show-list__items__scroll">
            {localShows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
