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
        <div className="flex h-full w-full flex-col bg-ultramarine px-16 md:p-8">
          <div>
            <div className="mt-5 flex flex-col items-center p-5">
              <img
                className="h-8 w-auto rounded"
                src="https://i.ibb.co/hKQPjS6/Group-35-1.png"
                alt="long-logo"
              />
            </div>
          </div>
          <ul className="max-h-full flex-col space-y-3 overflow-x-hidden">
            {user?.tickets.map((ticket) => {
              // style ticket item here
              return (
                <li
                  key={ticket.id}
                  className="w-full resize-none rounded-lg border border-white bg-white p-1 text-sm text-black"
                >
                  <div className=" row-span-2 flex items-stretch">
                    <div className="text-l block w-full bg-white px-0.5 text-left font-extrabold tracking-wide text-black">
                      {ticket.merchant?.name}
                    </div>
                    <Link
                      className="text-l block w-full bg-white px-0.5 text-right font-bold tracking-wide text-ultramarine"
                      href={"/app/history/details/" + ticket.id}
                    >
                      more detail
                    </Link>
                  </div>
                  <div className="ml-0.5 h-auto w-fit px-0.5 pb-1 text-left text-xs tracking-wider text-black">
                    buat 3 org
                  </div>
                  <div className="row-span-2 flex flex-row items-stretch justify-between">
                    <div className="ml-0.5 h-auto w-fit rounded-lg bg-ultramarine p-1 text-left text-xs tracking-wider text-white">
                      <span className="font-bold">Status :</span>
                      {ticket.status == 1
                        ? " In Queue"
                        : ticket.status == 2
                        ? " Finished"
                        : " Cancelled"}
                    </div>
                    <div className="ml-0.5 h-auto w-fit rounded-lg bg-ultramarine p-1 text-left text-xs font-bold tracking-wider text-white">
                      A020
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </AppLayout>
    </>
  );
};

HistoryPage.auth = {
  role: "user",
  unauthorized: "/",
};

export default HistoryPage;
