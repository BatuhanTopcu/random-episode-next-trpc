import RandomEpisodes from "@components/RandomEpisodes";
import Search from "@components/Search";
import ShowList from "@components/ShowList";
import UserInfoPopup from "@components/UserInfo";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
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
        <UserInfoPopup />
        <Search />
        <RandomEpisodes />
        <ShowList />
      </div>
    </>
  );
};

export default Home;
