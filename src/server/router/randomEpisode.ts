import { createRouter } from "./context";
import { z } from "zod";
import { getRandomEpisode, getShowDetails } from "../requests";

export const randomEpisodeRouter = createRouter().query("randomEpisode", {
  input: z.object({
    show_ids: z.array(z.string()),
    count: z.number().nullish(),
  }),
  async resolve({ input }) {
    const { show_ids, count } = input;

    try {
      const shows_promises = show_ids.map(async (show_id) => {
        return await getShowDetails(show_id);
      });

      const results = await Promise.allSettled(shows_promises);

      const shows = results
        .filter((promise) => promise.status === "fulfilled")
        // @ts-ignore
        .map((promise) => promise.value) as ShowDetail[];

      const episode_promises = [...Array(count || 5).keys()].map(async (_) => {
        return await getRandomEpisode(shows);
      });
      const episode_results = await Promise.allSettled(episode_promises);
      const episodes = episode_results
        .filter((promise) => promise.status === "fulfilled")
        // @ts-ignore
        .map((promise) => promise.value) as EpisodeDetail[];

      return {
        episodes: episodes,
      };
    } catch (e) {
      return {
        episodes: [],
      };
    }
  },
});
