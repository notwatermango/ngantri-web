import { useSession } from "next-auth/react";
import Head from "next/head";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";

const MerchantHome: AuthNextPage = () => {
  const { data: sessionData } = useSession();
  const { data: account } = api.account.getMerchantId.useQuery({
    accountId: sessionData ? sessionData.user.id : "",
  });
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Merchant home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>Merchant App</h1>
        <p>{account?.merchant?.id}</p>
      </main>
    </>
  );
};

MerchantHome.auth = {
  role: "merchant",
  unauthorized: "/",
};

export default MerchantHome;
