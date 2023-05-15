import { useSession } from "next-auth/react";
import Head from "next/head";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";

const HistoryPage: AuthNextPage = () => {
  // get history by list
  const { data: sessionData } = useSession();
  const { data: account } = api.account.getUserId.useQuery({
    accountId: sessionData ? sessionData.user.id : "",
  });
  const { data: user } = api.user.getUserWithTicketList.useQuery({
    userId: account?.user ? account.user.id : "",
  });
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
        {user?.tickets.map((ticket) => {
          return <div key={ticket.id}>{ticket.merchant?.name}</div>;
        })}
      </AppLayout>
    </>
  );
};

HistoryPage.auth = {
  role: "user",
  unauthorized: "/",
};

export default HistoryPage;
