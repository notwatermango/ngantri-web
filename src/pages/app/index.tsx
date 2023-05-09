import Head from "next/head";
import { AuthNextPage } from "~/types/pages";

const AppHome: AuthNextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="App home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>User App</h1>
      </main>
    </>
  );
};

AppHome.auth = {
  role: "user",
  unauthorized: "/",
};

export default AppHome;
