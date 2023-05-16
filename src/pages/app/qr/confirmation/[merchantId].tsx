import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";

/**
 * Coba di sini
 * @link http://localhost:3000/app/qr/confirmation/test
 */

const ConfirmationPage: AuthNextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [message, setMessage] = useState("");
  const merchantId = router.query.merchantId as string;
  const { data: merchant } =
    api.merchant.getMerchantInfoOnTicketConfirmation.useQuery({
      merchantId,
    });
  const { data: account } = api.account.getUserId.useQuery({
    accountId: sessionData ? sessionData.user.id : "",
  });
  const createTicket = api.ticket.createTicket.useMutation();
  const handleCreateTicket = async (e: FormEvent) => {
    e.preventDefault();
    await createTicket.mutateAsync(
      {
        userId: account?.user ? account.user.id : "",
        merchantId,
        message,
      },
      {
        onSuccess: async () => {
          await router.push("/app/history");
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>Confirmation</title>
        <meta name="description" content="QR confirmation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <div className="flex h-full w-full flex-col justify-center bg-ultramarine px-5 md:p-8">
          <div>
            <div className="flex flex-col items-center p-5">
              <img
                className="h-8 w-auto rounded"
                src="https://i.ibb.co/hKQPjS6/Group-35-1.png"
                alt="long-logo"
              />
            </div>
            <h1 className="mb-4 text-center text-2xl font-bold leading-none text-white dark:text-white md:text-5xl lg:text-6xl ">
              CONFIRMATION PAGE
            </h1>
          </div>
          <div>
            <div className="text-l mt-2 font-bold text-white dark:text-white">
              STORE
            </div>
            <div className="relative mb-6">
              <div className="text-l my-1 flex w-full rounded-lg border border-white bg-white p-2.5 font-bold text-black">
                <img
                  className="max-w-8 mx-1 ml-2 h-8 w-auto overflow-hidden text-gray-500 dark:text-gray-400"
                  src={`${
                    merchant?.imageUrl
                      ? merchant?.imageUrl
                      : "https://i.ibb.co/BTGq4c4/borgir.png"
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
                className="my-1 mb-5 w-full resize-none rounded-lg border border-white bg-white p-2.5 text-sm text-black"
              ></textarea>
            </form>
          </div>
          <div>
            <button
              onClick={handleCreateTicket}
              className="text-md block w-full rounded-xl border border-white bg-white p-1 font-bold text-black"
            >
              CONTINUE
            </button>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

ConfirmationPage.auth = {
  role: "user",
  unauthorized: "/",
};

export default ConfirmationPage;
