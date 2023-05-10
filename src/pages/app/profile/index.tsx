import { useSession } from "next-auth/react";
import Head from "next/head";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";

const ProfilePage: AuthNextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <h1>Profile</h1>
        <div>{sessionData?.user.email}</div>
        <div>{sessionData?.user.id}</div>
      </AppLayout>
    </>
  );
};

ProfilePage.auth = {
  role: "user",
  unauthorized: "/",
};

export default ProfilePage;
