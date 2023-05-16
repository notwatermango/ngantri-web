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
        <h1>Dashboard bro</h1>
      </MerchantLayout>
    </>
  );
};

MerchantDashboard.auth = {
  role: "merchant",
  unauthorized: "/",
};

export default MerchantDashboard;
