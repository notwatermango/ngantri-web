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
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>On boarding</h1>
        {sessionData && (
          <p>
            Signed in as{" "}
            <b>{sessionData.user.role == 1 ? "User" : "Merchant"}</b>
            {": "}
            {sessionData.user.email}
          </p>
        )}
        <button
          className="py-3 font-semibold no-underline transition hover:text-sky-500"
          onClick={
            sessionData
              ? () => void signOut()
              : () => void signIn(undefined, { callbackUrl: "/auth/redirect" })
          }
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
        <Link href={sessionData ? "/auth/redirect" : "/signup"}>
          <button className="py-3 font-semibold no-underline transition hover:text-sky-500">
            {sessionData ? "Continue" : "Sign up"}
          </button>
        </Link>
      </main>
    </>
  );
};

export default OnBoardingPage;
