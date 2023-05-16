import Head from "next/head";
import AppLayout from "~/components/app/AppLayout";
import type { AuthNextPage } from "~/types/pages";
import { useEffect, useState } from "react";
import Html5QrcodePlugin from "~/utils/Html5QrcodePlugin";
import { useRouter } from "next/navigation";

const QRPage: AuthNextPage = () => {
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [qrData, setQrData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const onNewScanResult = (decodedText: string, decodedResult: string) => {
    setQrData(decodedText);
  };

  useEffect(() => {
    if (!qrData) return;
    if (isNgantriURL(qrData)) {
      router.push(qrData);
    } else {
      setErrorMessage("Invalid QR");
      setShowQrScanner(false);
    }
  }, [qrData]);

  return (
    <>
      <Head>
        <title>Scan QR</title>
        <meta name="description" content="QR index" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-5 bg-ultramarine">
          <img
            className="h-10 w-auto rounded"
            src="https://i.postimg.cc/jLkDY68S/logo-pjg-lgt.png"
            alt="logo pjg light"
          />
          <p className="w-60 text-center font-semibold text-white">
            Silakan klik tombol kamera di bawah untuk membuka kamera
          </p>
          <div className="container flex w-72 flex-col items-center justify-center rounded-lg bg-white pb-5">
            <div>
              {errorMessage && (
                <div className="text-rose-800">{errorMessage}</div>
              )}
              {/* <div>Silakan klik kamera di bawah untuk membuka kamera</div> */}
              <div className="flex h-[30vh] w-full flex-col items-center justify-center">
                {showQrScanner && (
                  <Html5QrcodePlugin
                    fps={10}
                    qrbox={300}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                    className="max-h-full max-w-full"
                  />
                )}
              </div>
            </div>
            <button
              className="inline-flex flex-col items-center justify-center px-5"
              onClick={() => setShowQrScanner(!showQrScanner)}
            >
              <img
                className="h-14"
                src="https://i.postimg.cc/D4zT8n4q/camera-1.png"
              />
            </button>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

QRPage.auth = {
  role: "user",
  unauthorized: "/",
};

export default QRPage;

function isNgantriURL(qrData: string) {
  const regex = new RegExp("app/qr/confirmation/");
  return regex.test(qrData);
}
