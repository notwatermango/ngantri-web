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
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>Sign Up</h1>
        <Link href="/signup/merchant">
          <button className="py-3 font-semibold no-underline transition hover:text-sky-500">
            as Merchant
          </button>
        </Link>
        <Link href="/signup/user">
          <button className="py-3 font-semibold no-underline transition hover:text-sky-500">
            as User
          </button>
        </Link>
      </main>
    </>
  );
};

export default SignUpPage;
