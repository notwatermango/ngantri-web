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
          <Link href="/signup/user">
            <button className="h-10 w-80 rounded-full bg-dark-blue font-bold text-white no-underline transition hover:bg-ultramarine-min hover:text-white ">
              AS USER
            </button>
          </Link>
          <Link href="/signup/merchant">
            <button className="h-10 w-80 rounded-full text-dark-blue font-bold bg-white no-underline transition hover:bg-ultramarine-min hover:text-white ">
              AS MERCHANT
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default SignUpPage;
