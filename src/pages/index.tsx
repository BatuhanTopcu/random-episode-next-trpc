import RandomEpisodes from "@components/RandomEpisodes";
import Search from "@components/Search";
import ShowList from "@components/ShowList";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery([
    "example.hello",
    { text: "from tRPC" },
  ]);

  return (
    <>
      <Head>
        <title>Random Episode App</title>
        <meta
          name="description"
          content="Get random episodes for your favorite show"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="App">
        <Search />
        <RandomEpisodes />
        <ShowList />
      </div>
    </>
  );
};

export default Home;
