import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
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
        <ul className="flex max-h-full flex-col overflow-auto">
          {user?.tickets.map((ticket) => {
            // style ticket item here
            return (
              <li key={ticket.id} className="flex flex-col hover:bg-red-950">
                <Link href={"/app/history/details/" + ticket.id}>
                  <div>{ticket.merchant?.name}</div>
                  <div>{ticket.createdAt.toString()}</div>
                  <div>
                    {ticket.status == 1
                      ? "In Queue"
                      : ticket.status == 2
                      ? "Finished"
                      : "Cancelled"}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </AppLayout>
    </>
  );
};

HistoryPage.auth = {
  role: "user",
  unauthorized: "/",
};

export default HistoryPage;
