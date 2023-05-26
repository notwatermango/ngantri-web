import { type NextPage } from "next";
import { signOut, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const OnBoardingPage: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Ngantri.co.id</title>
        <meta name="description" content="Ngantri.co.id page" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center justify-center gap-y-5 bg-ultramarine">
        <div className="flex flex-col items-center gap-y-5 p-5">
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
        </div>
        {sessionData && (
          <p className="font-semibold text-white">
            Signed in as{" "}
            <b>{sessionData.user.role == 1 ? "User " : "Merchant "}</b>
            {sessionData.user.email}
          </p>
        )}
        <div className="flex w-full flex-col items-center gap-y-3">
          <button
            className="full h-10 w-3/4 rounded-full bg-dark-blue font-bold text-white no-underline transition hover:bg-ultramarine-min hover:text-white "
            onClick={
              sessionData
                ? () => void signOut()
                : () =>
                    void signIn(undefined, { callbackUrl: "/auth/redirect" })
            }
          >
            {sessionData ? "SIGN OUT" : "SIGN IN"}
          </button>
          <Link
            href={sessionData ? "/auth/redirect" : "/signup"}
            className="flex w-3/4"
          >
            <button className="h-10 w-full rounded-full bg-white font-bold text-dark-blue no-underline transition hover:bg-ultramarine-min hover:text-white">
              {sessionData ? "CONTINUE" : "SIGN UP"}
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default OnBoardingPage;
