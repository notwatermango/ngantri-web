import { useSession } from "next-auth/react";
import Head from "next/head";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";

const ProfilePage: AuthNextPage = () => {
  const { data: sessionData } = useSession();
  const {
    data: user,
    isLoading,
    error,
  } = api.account.getUserData.useQuery({
    userId: sessionData?.user ? sessionData?.user.id : "",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>No ticket data found.</div>;
  }

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <div className="flex h-full w-full flex-col justify-center bg-ultramarine px-10 py-16 md:p-8">
          <div>
            <div className="flex flex-col items-center p-5">
              <img
                className="h-10 w-auto rounded"
                src="https://i.ibb.co/hKQPjS6/Group-35-1.png"
                alt="long-logo"
              />
            </div>
            <h1 className="my-5 text-center text-2xl font-bold leading-none text-white dark:text-white md:text-5xl lg:text-6xl ">
              PROFILE
            </h1>
            <div className="mt-2 text-lg font-bold text-white">NAME</div>
            <div className="items-strecth text-md row-span-2 my-1 flex h-auto w-full flex-row justify-between rounded-lg border border-white bg-white p-1 text-start text-black">
              <div className="w-4/6 pl-1 pt-0.5">{user.name}</div>
              <button className="block w-2/6 rounded-xl bg-ultramarine text-lg font-bold">
                Edit
              </button>
            </div>
            <div className="mt-5 text-lg font-bold text-white">EMAIL</div>
            <div className="items-strecth text-md row-span-2 my-1 flex h-auto w-full flex-row justify-between rounded-lg border border-white bg-white p-1 text-start text-black">
              <div className="w-4/6 pl-1 pt-0.5">{user.email}</div>
            </div>
            <div className="mt-5 text-lg font-bold text-white">PHONE</div>
            <div className="items-strecth text-md row-span-2 my-1 flex h-auto w-full flex-row justify-between rounded-lg border border-white bg-white p-1 text-start text-black">
              <div className="w-4/6 pl-1 pt-0.5">{user.phone}</div>
            </div>
            <div className="mt-5 text-lg font-bold text-white">ADDRESS</div>
            <div className="items-strecth text-md row-span-2 my-1 flex h-auto w-full flex-row justify-between rounded-lg border border-white bg-white p-1 text-start text-black">
              <div className="w-4/6 pl-1 pt-0.5">{user.address}</div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

ProfilePage.auth = {
  role: "user",
  unauthorized: "/",
};

export default ProfilePage;
