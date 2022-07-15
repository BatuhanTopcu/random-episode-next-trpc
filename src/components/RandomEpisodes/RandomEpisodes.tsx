import React, { useRef } from "react";
import { useRandomEpisodes } from "@utils/hooks";
import EpisodeCard from "./EpisodeCard";
import LoadingBar from "@components/LoadingBar";

export default function RandomEpisodes() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { isFetching, episodes, shuffle, refetch } = useRandomEpisodes();

  return (
    <>
      <div className="episode-container">
        {isFetching && <LoadingBar />}
        {episodes.length > 0 &&
          !isFetching &&
          episodes.map((episode) => (
            <EpisodeCard key={episode.id} onClick={shuffle} episode={episode} />
          ))}
      </div>
      <div
        className="refresh-button"
        onClick={() => {
          if (isFetching) return;
          refetch();
          if (svgRef.current) {
            svgRef.current.animate(
              [{ transform: "rotate(360deg)" }, { transform: "rotate(0deg)" }],
              {
                duration: 500,
                iterations: 1,
                easing: "ease-in-out",
              }
            );
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          ref={svgRef}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </div>
    </>
  );
}
