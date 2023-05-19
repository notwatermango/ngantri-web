import Head from "next/head";
import MerchantLayout from "~/components/merchant/MerchantLayout";
import type { AuthNextPage } from "~/types/pages";

const MerchantProfile: AuthNextPage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Merchant profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MerchantLayout>
        {/* <h1>Merchant profile</h1> */}
        <main className="flex min-h-screen flex-col items-center justify-center bg-ultramarine">
          <div>
            <p>STORE PROFILE</p>

            <p>Burger King Cihampelas Walk</p>
            <p>0812 XXXX XXXX</p>
            <p>burgerkingcw@gmail.com</p>
            <p>
              Jl. Cihampelas Walk No.160, Cipaganti, Kecamatan Coblong, Kota
              Bandung, Jawa Barat 40131
            </p>
          </div>
          {/* <div className="flex flex-col items-center gap-y-3 p-10">
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
              // onClick={
               
              // }
            >
              
            </button>
            
          </div> */}
        </main>
      </MerchantLayout>
    </>
  );
};

MerchantProfile.auth = {
  role: "merchant",
  unauthorized: "/",
};

export default MerchantProfile;
