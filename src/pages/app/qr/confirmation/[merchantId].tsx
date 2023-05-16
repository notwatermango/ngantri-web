import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";

/**
 * Coba di sini
 * @link http://localhost:3000/app/qr/confirmation/test
 */

const ConfirmationPage: AuthNextPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const merchantId = router.query.merchantId as string;
  const { data: merchant } =
    api.merchant.getMerchantInfoOnTicketConfirmation.useQuery({
      merchantId,
    });
  return (
    <>
      <Head>
        <title>Confirmation</title>
        <meta name="description" content="QR confirmation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <main className="flex min-h-screen flex-col bg-ultramarine px-20">
          <div className="mt-5 flex flex-col items-center gap-y-5 p-5">
            <img
              className="h-8 w-auto rounded"
              src="https://i.ibb.co/hKQPjS6/Group-35-1.png"
              alt="long-logo"
            />
          </div>
          <h1 className="mb-4 text-center text-2xl font-bold leading-none tracking-widest text-white dark:text-white md:text-5xl lg:text-6xl ">
            CONFIRMATION PAGE
          </h1>
          <div className="text-l mt-2 font-bold text-white dark:text-white">
            STORE :
          </div>
          <div className="relative mb-6">
            <div className="text-l my-1 flex w-full rounded-lg border border-white bg-white p-2.5 font-bold text-black">
              <img
                className="mx-1 ml-2 h-8 w-auto text-gray-500 dark:text-gray-400"
                src={`${
                  merchant?.imageUrl
                    ? merchant?.imageUrl
                    : "url placeholder image masukin sini (jangan burger)"
                }`}
                alt="Merchant logo"
              ></img>
              <span className="text-l block w-full bg-gray-50 p-1 pl-5 tracking-wide text-black">
                {merchant?.name}
              </span>
            </div>
          </div>
          <div className="text-l font-bold text-white dark:text-white">
            NOTES :
          </div>
          <form>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="my-1 mb-24 w-full resize-none rounded-lg border border-white bg-white p-2.5 text-sm text-black"
            ></textarea>
          </form>
          <button className="text-md block w-full rounded-xl border border-white bg-white p-1 font-bold text-black">
            CONTINUE
          </button>
        </main>
      </AppLayout>
    </>
  );
};

ConfirmationPage.auth = {
  role: "user",
  unauthorized: "/",
};

export default ConfirmationPage;
