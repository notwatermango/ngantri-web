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

      <main className="flex min-h-screen flex-col items-center gap-y-5 bg-white">
        <div className="flex w-full flex-col items-center justify-center bg-ultramarine bg-gradient-to-r from-ultramarine-min to-ultramarine-max p-10 ">
          <div className="block max-w-screen-sm">
            <div className="flex flex-row items-center justify-center space-x-5">
              <div className="basis-1/2 ">
                <p className="font-semibold text-white">
                  Scan the code in the restaurant you’re queueing in
                </p>
              </div>
              <div className="basis-1/2 place-self-center">
                <img
                  className="mx-auto w-auto rounded"
                  src="https://i.postimg.cc/872sjpg8/lp1.png"
                  alt="Gambar Landing page 1"
                />
              </div>
            </div>

            <div className="flex flex-row items-center justify-center space-x-5">
              <div className="basis-1/2 ">
                <img
                  className="mx-auto w-auto rounded"
                  src="https://i.postimg.cc/Ff0zSMhY/lp2.png"
                  alt="Gambar Landing page 2"
                />
              </div>
              <div className="basis-1/2 ">
                <p className="font-semibold text-white">
                  Come back later when you are infront of the line
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-5 p-5">
          <img
            className="h-auto w-20 rounded"
            src="https://i.postimg.cc/hhczLtzc/logo-kcl-dark.png"
            alt="logo kecil dark"
          />
          <img
            className="h-10 w-auto rounded"
            src="https://i.postimg.cc/V0fJmKQd/logo-pjg-dark.png"
            alt="logo pjg dark"
          />

          <p className="w-48 text-center font-semibold text-dark-blue ">
            Reserve your seat wherever and whenever
          </p>

          <Link href="/onboarding">
            <button className="rounded-full bg-gradient-to-r from-ultramarine-min to-ultramarine-max px-7 py-3 text-xl font-bold text-dark-blue no-underline transition hover:text-white">
              Get Started
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
