import { useEffect, useState, useMemo } from "react";
import type { Show } from "@types";
import { addRemoveShow, useShows } from "@utils/hooks/useShows";
const IMG_BASE = "http://image.tmdb.org/t/p/original";

type ClickState = "none" | "once" | "twice";

export default function ShowCard({ show }: { show: Show }) {
  const { shows } = useShows();
  const isAdded = useMemo(
    () => shows.some((s) => s.id === show.id),
    [shows, show.id]
  );
  const [clickState, setClickState] = useState<ClickState>("none");
  const overlayState = useMemo(
    () => clickState === "once" || clickState === "twice",
    [clickState]
  );

  const handleClick = () => {
    switch (clickState) {
      case "none":
        setClickState("once");
        break;
      case "once":
        setClickState("twice");
        break;
      case "twice":
        setClickState("none");
        break;
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (clickState === "twice") {
      addRemoveShow(show);
      timeout = setTimeout(() => {
        setClickState("none");
      }, 750);
    }
    if (clickState === "once") {
      timeout = setTimeout(() => {
        setClickState("none");
      }, 1500);
    }
    return () => clearTimeout(timeout);
  }, [clickState]);

  return (
    <div className="show-card" onClick={handleClick}>
      <div className={`overlay ${overlayState ? "show" : ""}`}>
        {clickState === "once" &&
          `Click again for ${isAdded ? "removing from" : "adding to"} list`}
        {clickState === "twice" && `${isAdded ? "Added" : "Removed"}`}
      </div>
      <h1 className={`${overlayState ? "hide" : ""}`}>{show.name}</h1>
      {show.overview && (
        <h2 className={`${overlayState ? "hide" : ""}`}>{show.overview}</h2>
      )}
      {show.backdrop_path && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="show-card__bg"
          src={IMG_BASE + show.backdrop_path}
          alt={show.name}
        />
      )}
    </div>
  );
}
