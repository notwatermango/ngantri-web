import Head from "next/head";
import MerchantLayout from "~/components/merchant/MerchantLayout";
import type { AuthNextPage } from "~/types/pages";

const MerchantProfileEdit: AuthNextPage = () => {
  return (
    <>
      <Head>
        <title>Edit profile</title>
        <meta name="description" content="Merchant profile edit" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <MerchantLayout>
        <h1>Merchant profile edit</h1>
      </MerchantLayout>
    </>
  );
};

MerchantProfileEdit.auth = {
  role: "merchant",
  unauthorized: "/",
};

export default MerchantProfileEdit;
