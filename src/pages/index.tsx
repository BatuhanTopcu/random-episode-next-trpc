import RandomEpisodes from "@components/RandomEpisodes";
import Search from "@components/Search";
import ShowList from "@components/ShowList";
import type { NextPage } from "next";
import Head from "next/head";
import { useTheme } from "@utils/hooks";
import Settings from "@components/Settings";

const Home: NextPage = () => {
  useTheme();

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
        <Settings />
        <Search />
        <RandomEpisodes />
        <ShowList />
      </div>
    </>
  );
};

export default Home;
