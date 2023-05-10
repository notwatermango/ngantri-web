import Head from "next/head";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";

const QRPage: AuthNextPage = () => {
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
        <div>Store:</div>
        <p>Test</p>
        <div>Message:</div>
        <p>Test Input message</p>
        <button>continue</button>
      </AppLayout>
    </>
  );
};

QRPage.auth = {
  role: "user",
  unauthorized: "/",
};

export default QRPage;
