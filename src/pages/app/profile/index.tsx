import { useSession } from "next-auth/react";
import Head from "next/head";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";

const ProfilePage: AuthNextPage = () => {
  const { data: user, isLoading } = api.account.getUserData.useQuery();

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <div className="flex h-full w-full flex-col justify-center gap-y-5 overflow-y-auto bg-ultramarine p-5 md:p-8">
          <div className="flex flex-col items-center gap-y-3">
            <img
              className="h-10 w-auto rounded"
              src="https://i.ibb.co/hKQPjS6/Group-35-1.png"
              alt="long-logo"
            />
            <h1 className="text-center text-2xl font-bold leading-none text-white dark:text-white md:text-5xl lg:text-6xl ">
              PROFILE
            </h1>
          </div>
          <div className="flex w-full flex-col gap-y-3">
            <div>
              <div className="text-lg font-bold text-white">NAME</div>
              <div className="items-strecth text-md row-span-2 my-1 flex h-auto w-full flex-row justify-between rounded-lg border border-white bg-white p-1 text-start text-black">
                <div className="w-4/6 pl-1 pt-0.5">{user?.name}</div>
                <button className="block w-2/6 rounded-xl bg-ultramarine text-lg font-bold">
                  Edit
                </button>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">EMAIL</div>
              <div className="items-strecth text-md row-span-2 my-1 flex h-auto w-full flex-row justify-between rounded-lg border border-white bg-white p-1 text-start text-black">
                <div className="w-4/6 pl-1 pt-0.5">{user?.email}</div>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">PHONE</div>
              <div className="items-strecth text-md row-span-2 my-1 flex h-auto w-full flex-row justify-between rounded-lg border border-white bg-white p-1 text-start text-black">
                <div className="w-4/6 pl-1 pt-0.5">
                  {user ? user.phone : "-"}
                </div>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">ADDRESS</div>
              <div className="items-strecth text-md row-span-2 my-1 flex h-auto w-full flex-row justify-between rounded-lg border border-white bg-white p-1 text-start text-black">
                <div className="w-4/6 pl-1 pt-0.5">
                  {/* Case optional: set placeholder "-" */}
                  {user ? user.address : "-"}
                </div>
              </div>
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
