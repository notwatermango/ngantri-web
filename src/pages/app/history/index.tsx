import Head from "next/head";
import Link from "next/link";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";

const HistoryPage: AuthNextPage = () => {
  // get history by list
  const { data: user } = api.user.getUserWithTicketList.useQuery();

  return (
    <>
      <Head>
        <title>History</title>
        <meta name="description" content="History ato ticket apapun itu" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <AppLayout>
        <div className="flex h-full w-full flex-col bg-ultramarine px-5">
          <div>
            <div className="mt-5 flex flex-col items-center p-5">
              <img
                className="h-8 w-auto rounded"
                src="https://i.ibb.co/hKQPjS6/Group-35-1.png"
                alt="long-logo"
              />
            </div>
          </div>
          <ul className="max-h-full flex-col space-y-3 overflow-x-hidden py-4">
            {user?.tickets.map((ticket) => {
              // style ticket item here
              return (
                <li
                  key={ticket.id}
                  className="w-full resize-none rounded-lg border border-white bg-white p-2 text-sm text-black"
                >
                  <div className=" row-span-2 flex items-stretch">
                    <div className="text-l block w-full bg-white px-0.5 text-left font-extrabold text-black">
                      {ticket.merchant?.name}
                    </div>
                    <Link
                      className="text-l block w-full bg-white px-0.5 text-right text-ultramarine"
                      href={"/app/history/details/" + ticket.id}
                    >
                      more details
                    </Link>
                  </div>
                  <div className="h-auto w-fit px-0.5 py-2 text-left text-xs text-black">
                    {ticket.message}
                  </div>
                  <div className="row-span-2 flex flex-row items-stretch justify-between">
                    <div className="ml-0.5 h-auto w-fit rounded-lg bg-ultramarine p-1 text-left text-xs tracking-wider text-white">
                      {ticket.status == 1
                        ? "In Queue"
                        : ticket.status == 2
                        ? "Finished"
                        : "Cancelled"}
                    </div>
                    <div className="ml-0.5 h-auto w-fit rounded-lg bg-ultramarine p-1 text-left text-xs tracking-wider text-white">
                      Ticket <span className="font-bold">{ticket.display}</span>
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
