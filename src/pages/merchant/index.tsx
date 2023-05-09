import Head from "next/head";
import type { AuthNextPage } from "~/types/pages";

const MerchantHome: AuthNextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Merchant home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>Merchant App</h1>
      </main>
    </>
  );
};

MerchantHome.auth = {
  role: "merchant",
  unauthorized: "/",
};

export default MerchantHome;
