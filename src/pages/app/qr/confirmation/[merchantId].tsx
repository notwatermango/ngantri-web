import Head from "next/head";
import { useRouter } from "next/router";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";

const ConfirmationPage: AuthNextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Confirmation</title>
        <meta name="description" content="QR confirmation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <button>cancel</button>
        <h1>Confirmation</h1>
        <div>Store: {router.query.merchantId}</div>
        <p>Test</p>
        <div>Message:</div>
        <p>Test Input message</p>
        <button>continue</button>
      </AppLayout>
    </>
  );
};

ConfirmationPage.auth = {
  role: "user",
  unauthorized: "/",
};

export default ConfirmationPage;
