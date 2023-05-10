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
        <h1>Scan QR</h1>
        {errorMessage && <div className="text-rose-800">{errorMessage}</div>}
        <div>Silakan klik kamera di bawah untuk membuka kamera</div>
        <div className="flex h-[60vh] w-full flex-col items-center justify-center">
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

        <button onClick={() => setShowQrScanner(!showQrScanner)}>
          Button logo kamera
        </button>
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
