// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { searchRouter } from "./search";
import { showsRouter } from "./shows";
import { randomEpisodeRouter } from "./randomEpisode";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge(searchRouter)
  .merge(randomEpisodeRouter)
  .merge("show.", showsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
