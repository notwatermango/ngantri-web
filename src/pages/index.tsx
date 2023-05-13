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

      <main className="bg-white flex min-h-screen flex-col items-center justify-center space-y-5">
        
        <div className="bg-ultramarine bg-gradient-to-r from-ultramarine-min to-ultramarine-max p-10">

          <div className="flex flex-row items-center justify-center space-x-5">
            <div className="basis-1/2 ">
              <p className="text-white font-semibold">Scan the code in the restaurant you’re queueing in</p>
            </div>
            <div className="basis-1/2 place-self-center">
              <img className="w-auto rounded mx-auto" src="https://i.ibb.co/55WS7HG/lp1.png" alt="Gambar Landing page 1"/>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center space-x-5">
            <div className="basis-1/2 ">
              <img className="w-auto rounded mx-auto" src="https://i.ibb.co/M86ZsQN/lp2.png" alt="Gambar Landing page 2"/>
            </div>
            <div className="basis-1/2 ">
              <p className="text-white font-semibold">Come back later when you are infront of the line</p>                
            </div>
          </div>

        </div>
        
        <img className="w-20 h-auto rounded" src="https://i.ibb.co/DKjkNkp/logo-kcl-dark.png" alt="logo kecil dark"/>
        <img className="h-10 w-auto rounded" src="https://i.ibb.co/YyCd68t/logo-pjg-dark.png" alt="logo pjg dark"/>
        
        <p className="text-center w-48 text-dark-blue font-semibold ">Reserve your seat wherever and whenever</p>
        
        <Link href="/onboarding">
          <button className="text-xl py-3 px-7 font-bold text-dark-blue no-underline rounded-full bg-gradient-to-r from-ultramarine-min to-ultramarine-max transition hover:text-white">
            Get Started
          </button>
        </Link>
        
      </main>
    </>
  );
};


export default Home;
