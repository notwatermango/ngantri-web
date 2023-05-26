import Head from "next/head";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";

const EditProfilePage: AuthNextPage = () => {
  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <meta name="description" content="Edit profile" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <AppLayout>
        <h1>Edit profile</h1>
      </AppLayout>
    </>
  );
};

EditProfilePage.auth = {
  role: "user",
  unauthorized: "/",
};

export default EditProfilePage;
