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
        <div className="flex h-full w-full flex-col items-center justify-center bg-ultramarine-max">
          <img
            className="flex h-10 w-auto rounded"
            src="https://i.ibb.co/hKQPjS6/Group-35-1.png"
            alt="long-logo"
          />
          <h1 className="text-center text-2xl font-bold leading-none text-white dark:text-white md:text-5xl lg:text-6xl">
            EDIT PROFILE
          </h1>
          <div className="mt-5">
            <label htmlFor="name" className="font-bold text-white">
              Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="fill with your name"
              className="mt-2 block w-64 rounded-lg border border-white bg-white p-2 pl-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-bold text-white">
              Email
            </label>
            <input
              name="email"
              type="text"
              placeholder="fill with your email"
              className="mt-2 block w-64 rounded-lg border border-white bg-white p-2 pl-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="font-bold text-white">
              Phone
            </label>
            <input
              name="phone"
              type="text"
              placeholder="fill with your phone"
              className="mt-2 block w-64 rounded-lg border border-white bg-white p-2 pl-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="address" className="font-bold text-white">
              Address
            </label>
            <input
              name="address"
              type="text"
              placeholder="fill with your address"
              className="mt-2 block w-64 rounded-lg border border-white bg-white p-2 pl-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button className="mb-2 mt-5 w-64 place-content-center rounded-3xl bg-dark-blue px-5 py-2 text-sm font-bold text-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200">
            Change
          </button>
        </div>
      </AppLayout>
    </>
  );
};

EditProfilePage.auth = {
  role: "user",
  unauthorized: "/",
};

export default EditProfilePage;
