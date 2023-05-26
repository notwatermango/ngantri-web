import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MerchantLayout from "~/components/merchant/MerchantLayout";
import type { AuthNextPage } from "~/types/pages";

const MerchantHome: AuthNextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/merchant/dashboard");
  });

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Merchant home" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <MerchantLayout>
        <h1></h1>
      </MerchantLayout>
    </>
  );
};

MerchantHome.auth = {
  role: "merchant",
  unauthorized: "/",
};

export default MerchantHome;
