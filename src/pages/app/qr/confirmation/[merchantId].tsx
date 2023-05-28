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
  const [loadingButton, setLoadingButton] = useState(false);
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
    setLoadingButton(true);
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
    setLoadingButton(false);
  };

  return (
    <>
      <Head>
        <title>Confirmation</title>
        <meta name="description" content="QR confirmation" />
        <link rel="icon" href="/favicon.svg" />
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
              disabled={loadingButton}
              className="text-md block w-full rounded-xl border border-white bg-white p-1 font-bold text-black"
            >
              {loadingButton ? (
              <div>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="mr-3 inline h-4 w-4 animate-spin text-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </div>
            ) : (
              "CONTINUE"
            )}
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
