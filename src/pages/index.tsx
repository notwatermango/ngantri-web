import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Broh</title>
        <meta name="description" content="Landing page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>Landing Page</h1>
        <Link href="/onboarding">
          <button className="py-3 font-semibold no-underline transition hover:text-sky-500">
            Get Started
          </button>
        </Link>
      </main>
    </>
  );
};

export default Home;
