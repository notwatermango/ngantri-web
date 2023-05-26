import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-y-5  bg-ultramarine">
      <form
        method="post"
        action="/api/auth/callback/credentials"
        className="w-full"
      >
        <div className="flex flex-col items-center justify-center gap-y-5">
          <img
            className="h-10 w-auto rounded"
            src="https://i.postimg.cc/jLkDY68S/logo-pjg-lgt.png"
            alt="logo pjg light"
          />
          <p className="w-48 text-center font-semibold text-white ">
            Reserve your seat wherever and whenever
          </p>
          <img
            className="h-24 w-auto rounded"
            src="https://i.postimg.cc/JsDGrygc/logo-kcl-lgt.png"
            alt="logo kcl light"
          />
          <div className="flex w-full flex-col items-center gap-y-3">
            <div className="flex w-3/4 flex-col">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <label className="font-semibold text-white">EMAIL</label>
              <input
                className="block w-full rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="example@gmail.com"
                name="email"
                type="email"
                required
              />
            </div>
            <div className="flex w-3/4 flex-col">
              <label className="font-semibold text-white">PASSWORD</label>
              <input
                className="block w-full rounded-lg border border-gray-300 bg-white p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                name="password"
                type="password"
                required
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <button
              className="h-10 w-3/4 rounded-full bg-dark-blue font-bold text-white  no-underline transition hover:bg-ultramarine-min hover:text-white"
              type="submit"
            >
              SIGN IN
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
