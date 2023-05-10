import Head from "next/head";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";

const HistoryPage: AuthNextPage = () => {
  return (
    <>
      <Head>
        <title>History</title>
        <meta name="description" content="History ato ticket apapun itu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <h1>History</h1>
        <div>list nya</div>
      </AppLayout>
    </>
  );
};

HistoryPage.auth = {
  role: "user",
  unauthorized: "/",
};

export default HistoryPage;
