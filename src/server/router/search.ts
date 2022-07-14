import { createRouter } from "./context";
import { z } from "zod";
import { searchTMDB } from "../requests";

export const searchRouter = createRouter().query("search", {
  input: z.string(),
  async resolve({ input }) {
    if (input.length === 0) return { results: [] };
    try {
      const data = await searchTMDB(input);
      return {
        results: data,
      };
    } catch (e) {
      return {
        results: [],
      };
    }
  },
});
