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
        <div className="flex h-full w-full flex-col justify-center gap-y-5 overflow-y-auto bg-ultramarine p-5 md:p-8">
          <p className="text-center text-2xl font-bold leading-none text-white dark:text-white md:text-5xl lg:text-6xl ">
                STORE PROFILE
              </p>
            {/* for styling can copy user profile page for reference */}
          {/* leave  merchant id here for debugging and creating QR confirmation page */}
          {/* delete after implementing generate qr code */}
          <div className="flex flex-col items-center justify-center bg-white p-5 rounded-lg">
            


            <img
              className="h-20 w-auto rounded m-3"
              src="https://i.postimg.cc/xCKmZhpd/burger-1.png"
              alt="burger"
            />
            <p className="text-center text-xl text-black font-semibold">{merchant?.id}</p>
            <p className="text-center text-lg font-medium">{merchant?.name}</p>
            <p className="text-center text-lg font-medium underline underline-offset-2">{merchant?.email}</p>
            <p className="text-center text-lg font-medium">{merchant?.phone}</p>
            <p className="text-center text-lg font-medium">{merchant?.address}</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white p-2 rounded-lg ">
            <p className="text-lg font-semibold">Edit Store Profile</p> 
            {/* ini button harusnya */}
          </div>
          </div>

        
      </MerchantLayout>
    </>
  );
};

MerchantProfile.auth = {
  role: "merchant",
  unauthorized: "/",
};

export default MerchantProfile;
