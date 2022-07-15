import RandomEpisodes from "@components/RandomEpisodes";
import Search from "@components/Search";
import ShowList from "@components/ShowList";
import LoginButton from "@components/LoginButton";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "@utils/trpc";
import { useShows } from "@utils/shows";

const Home: NextPage = () => {
  const shows = useShows();

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
        <RandomEpisodes shows={shows} />
        <ShowList shows={shows} />
        <LoginButton />
      </div>
    </>
  );
};

export default Home;
