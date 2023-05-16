import Head from "next/head";
import MerchantLayout from "~/components/merchant/MerchantLayout";
import type { AuthNextPage } from "~/types/pages";

const MerchantQueue: AuthNextPage = () => {
  return (
    <>
      <Head>
        <title>Queue</title>
        <meta name="description" content="Queue list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MerchantLayout>
        <h1>Queue bro</h1>
      </MerchantLayout>
    </>
  );
};

MerchantQueue.auth = {
  role: "merchant",
  unauthorized: "/",
};

export default MerchantQueue;
