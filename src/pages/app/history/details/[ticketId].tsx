import Head from "next/head";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";

const TicketDetailsPage: AuthNextPage = () => {
  const router = useRouter();
  const ticketId = router.query.ticketId as string;

  const updateTicket = api.ticket.cancelTicket.useMutation();

  const handleUpdateTicket = async (e: FormEvent) => {
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
                CANCEL
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
