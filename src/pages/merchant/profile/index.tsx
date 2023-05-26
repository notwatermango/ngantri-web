import Head from "next/head";
import MerchantLayout from "~/components/merchant/MerchantLayout";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";

const MerchantProfile: AuthNextPage = () => {
  const { data: merchant } = api.merchant.getMerchantProfile.useQuery();
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Merchant profile" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <MerchantLayout>
        {/* for styling can copy user profile page for reference */}
        <h1>Merchant profile</h1>
        {/* leave  merchant id here for debugging and creating QR confirmation page */}
        {/* delete after implementing generate qr code */}
        <p>{merchant?.id}</p>
        <p>{merchant?.name}</p>
        <p>{merchant?.email}</p>
        <p>{merchant?.phone}</p>
        <p>{merchant?.address}</p>
      </MerchantLayout>
    </>
  );
};

MerchantProfile.auth = {
  role: "merchant",
  unauthorized: "/",
};

export default MerchantProfile;
