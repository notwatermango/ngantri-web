import Head from "next/head";
import { useState } from "react";
import MerchantLayout from "~/components/merchant/MerchantLayout";
import type { AuthNextPage } from "~/types/pages";

const MerchantDashboard: AuthNextPage = () => {
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Merchant dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MerchantLayout>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-5 overflow-y-auto bg-ultramarine px-5 md:p-8">
          <div className="flex flex-col items-center pt-5">
            <img
              className="h-10 w-auto rounded"
              src="https://i.ibb.co/hKQPjS6/Group-35-1.png"
              alt="long-logo"
            />
          </div>
          <div className="flex w-full justify-between">
            <div className="flex flex-col justify-between">
              <div className="text-lg font-bold text-white md:text-xl">
                WELCOME,
              </div>
              <div className="text-md text-white md:text-lg">
                New Store - Paskal 23
              </div>
            </div>
            {isStoreOpen ? (
              <div className="text-md flex h-full items-center rounded-lg bg-green-500 px-2 font-bold text-white">
                OPEN
              </div>
            ) : (
              <div className="text-md flex h-full items-center rounded-lg bg-red-500 px-2 font-bold text-white">
                CLOSED
              </div>
            )}
          </div>
          <div className="flex w-full flex-col gap-y-5">
            <div className="flex w-full resize-none items-center justify-between rounded-lg border border-white bg-white p-5">
              <div className="text-lg font-bold text-black">IN QUEUE</div>
              <div className="text-4xl font-bold text-black">14</div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex-col items-center justify-between gap-3 rounded-lg border border-white bg-white p-5">
                <div className="text-md font-bold text-black">FINISHED</div>
                <div className="text-4xl font-bold text-black">999</div>
              </div>
              <div className="flex-col items-center justify-between gap-3 rounded-lg border border-white bg-white p-5">
                <div className="text-md font-bold text-black">CANCELLED</div>
                <div className="text-4xl font-bold text-black">14</div>
              </div>
            </div>
          </div>
        </div>
      </MerchantLayout>
    </>
  );
};

MerchantDashboard.auth = {
  role: "merchant",
  unauthorized: "/",
};

export default MerchantDashboard;
