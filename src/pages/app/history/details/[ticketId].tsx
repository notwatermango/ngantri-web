import Head from "next/head";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";

const TicketDetailsPage: AuthNextPage = () => {
  return (
    <>
      <Head>
        <title>Details</title>
        <meta name="description" content="Ticket details pas di klik" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <h1>Ticket Details</h1>
        <div>bblablbal</div>
        <button>cancel</button>
        <button>back</button>
      </AppLayout>
    </>
  );
};

TicketDetailsPage.auth = {
  role: "user",
  unauthorized: "/",
};

export default TicketDetailsPage;
