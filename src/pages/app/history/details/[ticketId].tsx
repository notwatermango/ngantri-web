import Head from "next/head";
import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";

const TicketDetailsPage: AuthNextPage = () => {
  const router = useRouter();
  const ticketId = router.query.ticketId as string;

  const updateTicket = api.ticket.cancelTicket.useMutation();
  const [loadingButton, setLoadingButton] = useState(false);

  const handleUpdateTicket = async (e: FormEvent) => {
    setLoadingButton(true);
    e.preventDefault();
    await updateTicket.mutateAsync(
      {
        ticketId: ticketId,
      },
      {
        onSuccess: async () => {
          await router.push("/app/history");
        },
      }
    );
    setLoadingButton(true);
  };

  const handleBack = async () => {
    await router.push("/app/history").then(() => {
      console.log("back to history page");
    });
  };

  const {
    data: ticket,
    isLoading,
    error,
  } = api.ticket.seeTicketDetail.useQuery({
    ticketId: ticketId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!ticket) {
    return <div>No ticket data found.</div>;
  }

  return (
    <>
      <Head>
        <title>Details</title>
        <meta name="description" content="Ticket details pas di klik" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <AppLayout>
        <div className="flex h-full w-full flex-col items-center justify-between bg-ultramarine p-16">
          <div className="flex flex-col items-center p-5">
            <img
              className="h-8 w-auto rounded"
              src="https://i.ibb.co/hKQPjS6/Group-35-1.png"
              alt="long-logo"
            />
          </div>
          <h6 className="text-center text-sm text-white">
            {"Here's your ticket number"}
          </h6>
          <div className="flex h-1/4 w-full max-w-lg resize-none items-center justify-center rounded-lg border border-white bg-white p-2.5 text-5xl font-bold text-ultramarine">
            {ticket.ticketDisplay}
          </div>
          <h6 className="text-center text-sm text-white">
            {"We'll notify you when we re almost"}
            <p className="break-words">ready to see you</p>
          </h6>
          <div className="row-span-3 flex w-full max-w-lg justify-between">
            <div className="w-auto text-center">
              <h4 className="text-3xl font-bold text-white">
                {ticket.peopleAhead}
              </h4>
              <h6 className="text-xs text-white">People ahead</h6>
            </div>
            <div className="w-auto text-center">
              <h4 className="text-3xl font-bold text-white">
                {ticket.peopleAhead * 6.5}
                <span className="text-xs font-normal text-white">min</span>
              </h4>
              <h6 className="text-xs text-white">Est time</h6>
            </div>
          </div>
          <div className="row-span-2 flex w-full max-w-lg justify-between">
            <div className="w-auto text-center">
              <button
                className="text-start text-sm font-bold text-white underline"
                onClick={handleUpdateTicket}
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
                  "CANCEL"
                )}
              </button>
            </div>
            <div className="w-auto text-center">
              <button
                className="text-start text-sm font-bold text-white underline"
                onClick={handleBack}
              >
                BACK
              </button>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

TicketDetailsPage.auth = {
  role: "user",
  unauthorized: "/",
};

export default TicketDetailsPage;
