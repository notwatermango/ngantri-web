import Head from "next/head";
import MerchantLayout from "~/components/merchant/MerchantLayout";
import type { AuthNextPage } from "~/types/pages";

const MerchantDashboard: AuthNextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Merchant dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MerchantLayout>
        <div className="flex h-full w-full flex-col justify-center bg-ultramarine px-5 md:p-8">
          <div className="flex flex-col items-center p-5">
            <img
              className="h-10 w-auto rounded"
              src="https://i.ibb.co/hKQPjS6/Group-35-1.png"
              alt="long-logo"
            />
          </div>
          <div className="mt-5 flex flex-col items-center">
            <h5 className="text-lg font-bold text-white">WELCOME,</h5>
            <h6 className="text-md text-white">New Store - Paskal 23</h6>
          </div>
          <div className="mt-5 flex justify-between">
            <div className="flex flex-col justify-between">
              <h5 className="text-lg font-bold text-white">WELCOME,</h5>
              <h6 className="text-md text-white">New Store - Paskal 23</h6>
            </div>
            <div>
              <button className="text-md block h-full rounded-lg bg-green-500 p-1 font-bold text-white">
                OPEN
              </button>
            </div>
          </div>
          <div className="mb-5 mt-10 flex w-full resize-none items-center justify-between rounded-lg border border-white bg-white">
            <div className="m-5 text-lg font-bold text-black">IN QUEUE</div>
            <div className="mx-5 text-4xl font-bold text-black">14</div>
          </div>
          <div className="flex justify-between">
            <div className="w-5/12 resize-none flex-col items-center justify-between rounded-lg border border-white bg-white p-5">
              <div className="text-lg font-bold text-black">FINISH</div>
              <div className="mt-5 text-4xl font-bold text-black">14</div>
            </div>
            <div className="w-5/12 resize-none flex-col items-center justify-between rounded-lg border border-white bg-white p-5">
              <div className="text-lg font-bold text-black">CANCELED</div>
              <div className="mt-5 text-4xl font-bold text-black">14</div>
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
