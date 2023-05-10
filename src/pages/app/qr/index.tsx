import Head from "next/head";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";

const QRPage: AuthNextPage = () => {
  return (
    <>
      <Head>
        <title>Scan QR</title>
        <meta name="description" content="QR index" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <h1>Scan QR</h1>
        <div>Silakan klik kamera di bawah untuk membuka kamera</div>
        <button>Button logo kamera</button>
      </AppLayout>
    </>
  );
};

QRPage.auth = {
  role: "user",
  unauthorized: "/",
};

export default QRPage;
