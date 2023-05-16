import { type NextPage } from "next";
import { signOut, signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const OnBoardingPage: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Broh2</title>
        <meta name="description" content="Broh2 page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-ultramarine">
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
        <div className="flex flex-col items-center gap-y-3 p-10">
          {sessionData && (
            <p className="font-semibold text-white">
              Signed in as{" "}
              <b>{sessionData.user.role == 1 ? "User" : "Merchant"}</b>
              {": "}
              {sessionData.user.email}
            </p>
          )}
          <button
            className="h-10 w-80 rounded-full bg-dark-blue font-bold text-white no-underline transition hover:bg-ultramarine-min hover:text-white "
            onClick={
              sessionData
                ? () => void signOut()
                : () =>
                    void signIn(undefined, { callbackUrl: "/auth/redirect" })
            }
          >
            {sessionData ? "SIGN OUT" : "SIGN IN"}
          </button>
          <Link href={sessionData ? "/auth/redirect" : "/signup"}>
            <button className="h-10 w-80 rounded-full bg-white font-bold text-dark-blue no-underline transition hover:bg-ultramarine-min hover:text-white">
              {sessionData ? "CONTINUE" : "SIGN UP"}
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default OnBoardingPage;
