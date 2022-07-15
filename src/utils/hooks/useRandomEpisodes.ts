import { EpisodeDetail, Show } from "@types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { trpc } from "../trpc";

export const useRandomEpisodes = (shows: Show[]) => {
  const { status } = useSession();
  const [episodes, setEpisodes] = useState<EpisodeDetail[]>([]);
  const { isFetching, refetch } = trpc.useQuery(
    [
      "randomEpisode",
      {
        show_ids: shows.map((show) => show.id.toString()),
      },
    ],
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setEpisodes(data.episodes);
      },
      onError: (error) => {
        console.error(error);
        setEpisodes([]);
      },
      enabled: shows.length > 0 && status !== "loading",
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
