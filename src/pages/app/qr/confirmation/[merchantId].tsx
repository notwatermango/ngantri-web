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
        <button>cancel</button>
        <h1>Confirmation</h1>
        <div>Store: {merchant?.name}</div>
        <img
          src={`${
            merchant?.imageUrl
              ? merchant?.imageUrl
              : "url placeholder image masukin sini (jangan burger)"
          }`}
          alt="Merchant logo"
        ></img>
        <div>Message:</div>
        <form>
          <input
            placeholder="Meja buat 1 orang plis"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        <button onClick={handleCreateTicket}>Create Ticket</button>
      </AppLayout>
    </>
  );
};

ConfirmationPage.auth = {
  role: "user",
  unauthorized: "/",
};

export default ConfirmationPage;
