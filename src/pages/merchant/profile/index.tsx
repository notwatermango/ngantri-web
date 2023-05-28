import Head from "next/head";
import MerchantLayout from "~/components/merchant/MerchantLayout";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";
import { signOut } from "next-auth/react";
import Link from "next/link";

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
          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-5">
            <img
              className="m-3 h-20 w-auto rounded"
              src="https://i.postimg.cc/xCKmZhpd/burger-1.png"
              alt="burger"
            />
            <p className="text-center text-xl font-semibold text-black">
              {merchant?.name}
            </p>
            <p className="text-center text-lg font-medium underline underline-offset-2">
              {merchant?.email}
            </p>
            <p className="text-center text-lg font-medium">{merchant?.phone}</p>
            <p className="text-center text-lg font-medium">
              {merchant?.address}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center rounded  ">
            <Link
              href={`/merchant/profile/qr/${merchant?.id as string}`}
              className="h-full w-full"
            >
              <button className="w-full rounded-lg bg-green-800 p-2 font-bold text-white no-underline transition hover:bg-green-900 ">
                Show Ngantri QR
              </button>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-white p-2 ">
            <p className="font-semibold">Edit Store Profile</p>
            {/* ini button harusnya */}
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-white ">
            <button
              className="w-full rounded-lg bg-red-800 p-2 font-bold text-white no-underline transition hover:bg-red-900 "
              onClick={() => void signOut()}
            >
              LOG OUT
            </button>
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
