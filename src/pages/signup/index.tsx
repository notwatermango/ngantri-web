import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const SignUpPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign up page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-y-5 bg-ultramarine">
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
        <div className="flex w-full flex-col items-center gap-y-3">
          <Link href="/signup/user" className="flex w-3/4">
            <button className="h-10 w-full rounded-full bg-dark-blue font-bold text-white no-underline transition hover:bg-ultramarine-min hover:text-white ">
              AS USER
            </button>
          </Link>
          <Link href="/signup/merchant" className="flex w-3/4">
            <button className="h-10 w-full rounded-full bg-white font-bold text-dark-blue no-underline transition hover:bg-ultramarine-min hover:text-white ">
              AS MERCHANT
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default SignUpPage;
