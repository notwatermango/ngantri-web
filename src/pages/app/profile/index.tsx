import Head from "next/head";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";

const ProfilePage: AuthNextPage = () => {
  const { data: user, isLoading } = api.account.getUserData.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-full w-full place-content-center font-extrabold text-ultramarine-max">
        <svg
          aria-hidden="true"
          className="mr-2 h-8 w-8 animate-spin fill-ultramarine-max text-gray-200"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Profile" />
        <link rel="icon" href="/favicon.svg" />
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
