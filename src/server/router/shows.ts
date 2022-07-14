import { createRouter } from "./context";
import { z } from "zod";
import type { Show } from "@types";

export const showsRouter = createRouter()
  .query("get-shows", {
    async resolve({ ctx }) {
      const { session, prisma } = ctx;
      if (!session?.user) return { shows: [] };
      const data = await prisma.user.findFirst({
        where: { email: session.user.email },
      });
      return {
        shows: data?.favorites ? (JSON.parse(data.favorites) as Show[]) : [],
      };
    },
  })
  .mutation("set-shows", {
    input: z.object({
      shows: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          poster_path: z.string(),
          backdrop_path: z.string(),
          overview: z.string(),
          vote_average: z.number(),
          popularity: z.number(),
        })
      ),
    }),
    async resolve({ ctx, input }) {
      const { session, prisma } = ctx;
      if (!session?.user?.email) return { shows: [] };
      const data = await prisma.user.findFirst({
        where: { email: session.user.email },
      });
      if (!data) return { shows: [] };
      await prisma.user.update({
        where: { email: session.user.email },
        data: { favorites: JSON.stringify(input.shows) },
      });
      return {
        shows: data?.favorites ? (JSON.parse(data.favorites) as Show[]) : [],
      };
    },
  });
