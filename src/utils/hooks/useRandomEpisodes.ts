import { EpisodeDetail, Show } from "@types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { trpc } from "../trpc";
import { useShows } from "./useShows";

export const useRandomEpisodes = () => {
  const { status } = useSession();
  const [episodes, setEpisodes] = useState<EpisodeDetail[]>([]);

  const { shows, showsLoading } = useShows();

  const { isFetching, refetch } = trpc.useQuery(
    [
      "randomEpisode",
      {
        show_ids: shows.map((show) => show.id.toString()),
      },
    ],
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      onSuccess: (data) => {
        setEpisodes(data.episodes);
      },
      onError: (error) => {
        console.error(error);
        setEpisodes([]);
      },
      enabled: shows.length > 0 && status !== "loading" && !showsLoading,
    }
  );

  const shuffle = () => {
    if (episodes.length < 2 || isFetching) return;
    const temp = [...episodes];
    const first = temp.shift() as EpisodeDetail;
    setEpisodes([...temp, first]);
  };

  return { episodes, isFetching, refetch, shuffle };
};
