import React, { useEffect, useRef, useState } from "react";
import { useLocalShows } from "@utils/localStorage";
// import { getRandomEpisodes } from "@requests";
import { Episode } from "@types";
import EpisodeCard from "./EpisodeCard";
import LoadingBar from "@components/LoadingBar";

export default function RandomEpisodes() {
  const [localShows] = useLocalShows();
  const [randomEpisodes, setRandomEpisodes] = useState<Episode[]>([]);
  const [shuffle, setShuffle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (localShows.length === 0) return;
    (async () => {
      setLoading(true);
      const params = new URLSearchParams();
      localShows.forEach((show) =>
        params.append("show_id", show.id.toString())
      );
      params.append("count", "5");
      // const data = await getRandomEpisodes(params);
      // setRandomEpisodes(data);
      setLoading(false);
    })();
  }, [localShows, refresh]);

  useEffect(() => {
    if (randomEpisodes.length < 2) return;
    const temp = [...randomEpisodes];
    const first = temp.shift() as Episode;
    setRandomEpisodes([...temp, first]);
  }, [shuffle]);

  return (
    <>
      <div className="episode-container">
        {loading && <LoadingBar />}
        {randomEpisodes.length > 0 &&
          !loading &&
          randomEpisodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              onClick={() => setShuffle(!shuffle)}
              episode={episode}
            />
          ))}
      </div>
      <div
        className="refresh-button"
        onClick={() => {
          if (localShows.length === 0 || loading) return;
          setRefresh(!refresh);
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
