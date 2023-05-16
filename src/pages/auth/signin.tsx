import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ultramarine  gap-y-5 p-5">
      <form method="post" action="/api/auth/callback/credentials">
        <div className="flex flex-col items-center justify-center   gap-y-5 p-5">
          <img
            className="h-10 w-auto rounded"
            src="https://i.ibb.co/rHScgKG/logo-pjg-lgt.png"
            alt="logo pjg light"
          />
          <p className="w-48 text-center font-semibold text-white ">
            Reserve your seat wherever and whenever
          </p>
          <img
            className="h-24 w-auto rounded"
            src="https://i.ibb.co/rknCvm4/logo-kcl-lgt.png"
            alt="logo pjg light"
          />
        </div>                 
        <div className="flex flex-col items-center gap-y-3 p-10 ">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label className="font-semibold text-white">
            EMAIL
            <input className="bg-white w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="example@gmail.com"
              name="email" 
              type="email" 
              required/>
          </label>
          <label className="font-semibold text-white">
            PASSWORD
            <input 
              className="bg-white w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="password" 
              type="password" 
              required/>
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button className="h-10 w-80 rounded-full bg-dark-blue text-white font-bold  no-underline transition hover:bg-ultramarine-min hover:text-white"
          type="submit">
            SIGN IN
          </button>
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
