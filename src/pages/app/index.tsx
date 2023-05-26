import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";

const AppHome: AuthNextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/app/qr");
  });

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="App home" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <AppLayout>
        <h1></h1>
      </AppLayout>
    </>
  );
};

AppHome.auth = {
  role: "user",
  unauthorized: "/",
};

export default AppHome;
