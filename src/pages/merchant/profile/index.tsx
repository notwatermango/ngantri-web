import Head from "next/head";
import MerchantLayout from "~/components/merchant/MerchantLayout";
import type { AuthNextPage } from "~/types/pages";

const MerchantProfile: AuthNextPage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Merchant profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MerchantLayout>
        <h1>Merchant profile</h1>
      </MerchantLayout>
    </>
  );
};

MerchantProfile.auth = {
  role: "merchant",
  unauthorized: "/",
};

export default MerchantProfile;
