import Head from "next/head";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";

const TicketDetailsPage: AuthNextPage = () => {
  return (
    <>
      <Head>
        <title>Details</title>
        <meta name="description" content="Ticket details pas di klik" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <div className="flex h-full w-full flex-col items-center justify-between bg-ultramarine p-16">
          <div className="flex flex-col items-center p-5">
            <img
              className="h-8 w-auto rounded"
              src="https://i.ibb.co/hKQPjS6/Group-35-1.png"
              alt="long-logo"
            />
          </div>
          <h6 className="text-center text-sm text-white">
            {"Here's your ticket number"}
          </h6>
          <div className="flex h-1/4 w-full max-w-lg resize-none items-center justify-center rounded-lg border border-white bg-white p-2.5 text-5xl font-bold text-ultramarine">
            A 020
          </div>
          <h6 className="text-center text-sm text-white">
            {"We'll notify you when we re almost"}
            <p className="break-words">ready to see you</p>
          </h6>
          <div className="row-span-3 flex w-full max-w-lg justify-between">
            <div className="w-auto text-center">
              <h4 className="text-3xl font-bold text-white">9</h4>
              <h6 className="text-xs text-white">In store</h6>
            </div>
            <div className="w-auto text-center">
              <h4 className="text-3xl font-bold text-white">10</h4>
              <h6 className="text-xs text-white">People ahead</h6>
            </div>
            <div className="w-auto text-center">
              <h4 className="text-3xl font-bold text-white">
                20<span className="text-xs font-normal text-white">min</span>
              </h4>
              <h6 className="text-xs text-white">Est time</h6>
            </div>
          </div>
          <div className="row-span-2 flex w-full max-w-lg justify-between">
            <div className="w-auto text-center">
              <button className="text-start text-sm font-bold text-white underline">
                CANCEL TICKET
              </button>
            </div>
            <div className="w-auto text-center">
              <button className="text-start text-sm font-bold text-white underline">
                BACK
              </button>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

TicketDetailsPage.auth = {
  role: "user",
  unauthorized: "/",
};

export default TicketDetailsPage;
