import { type NextPage } from "next";
import { useQRCode } from "next-qrcode";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MerchantLayout from "~/components/merchant/MerchantLayout";

const QrPage: NextPage = () => {
  const router = useRouter();
  const { merchantId } = router.query;

  const { Canvas } = useQRCode();
  const fullURL =
    (process.env.NEXT_PUBLIC_URL
      ? process.env.NEXT_PUBLIC_URL
      : "ERRunspecifieddotENV") +
    "/app/qr/confirmation/" +
    (typeof merchantId === "string" ? merchantId : "");
  useEffect(() => {
    console.log(fullURL);
  }, [fullURL]);

  return (
    <>
      <Head>
        <title>Qr Ngantri</title>
        <meta name="description" content="Show QR Ngantri" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MerchantLayout>
        <div className="flex h-full w-full flex-col items-center justify-center bg-ultramarine text-white">
          <div>User can scan the qr code below</div>
          <div className="flex flex-row flex-wrap items-center justify-center">
            <div className="p-3">
              <Canvas
                text={fullURL}
                options={{
                  level: "M",
                  margin: 1,
                  scale: 4,
                  width: 250,
                  color: {
                    dark: "#000",
                    light: "#fff",
                  },
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded  ">
            <Link href={`/merchant/profile`} className="h-full w-full">
              <button className="w-full rounded-lg bg-blue-800 p-2 font-bold text-white no-underline transition hover:bg-blue-900 ">
                Back to profile
              </button>
            </Link>
          </div>
        </div>
      </MerchantLayout>
    </>
  );
};

export default QrPage;
