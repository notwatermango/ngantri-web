import Head from "next/head";
import { useEffect, useState } from "react";
import MerchantLayout from "~/components/merchant/MerchantLayout";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";

const MerchantDashboard: AuthNextPage = () => {
  const { data: merchant } = api.merchant.getMerchantDashboardData.useQuery();
  const [isStoreOpen, setIsStoreOpen] = useState(merchant?.isOpen);
  useEffect(() => {
    setIsStoreOpen(merchant?.isOpen);
  }, [merchant]);
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
                {merchant?.name}
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
              <div className="text-4xl font-bold text-black">
                {merchant?.ticketGroup.find((ticket) => ticket.status == 1)
                  ?.count
                  ? merchant?.ticketGroup.find((ticket) => ticket.status == 1)
                      ?.count
                  : 0}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex-col items-center justify-between gap-3 rounded-lg border border-white bg-white p-5">
                <div className="text-md font-bold text-black">FINISHED</div>
                <div className="text-4xl font-bold text-black">
                  {merchant?.ticketGroup.find((ticket) => ticket.status == 2)
                    ?.count
                    ? merchant?.ticketGroup.find((ticket) => ticket.status == 2)
                        ?.count
                    : 0}
                </div>
              </div>
              <div className="flex-col items-center justify-between gap-3 rounded-lg border border-white bg-white p-5">
                <div className="text-md font-bold text-black">CANCELLED</div>
                <div className="text-4xl font-bold text-black">
                  {merchant?.ticketGroup.find((ticket) => ticket.status == 3)
                    ?.count
                    ? merchant?.ticketGroup.find((ticket) => ticket.status == 3)
                        ?.count
                    : 0}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={isStoreOpen}
                onChange={() => setIsStoreOpen(!isStoreOpen)}
                className="peer sr-only"
              />
              <div className="peer h-7 w-14 rounded-full bg-gray-200 after:absolute after:left-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-teal-800"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {isStoreOpen ? "Click to close store" : "Click to open store"}
              </span>
            </label>
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
