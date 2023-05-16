import Link from "next/link";

// type IAppButtonNavProps = {};

const AppBottomNavigation = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 h-16 w-full rounded-full bg-white">
        <div className="mx-auto grid h-full max-w-xs grid-cols-3 ">
          <Link
            href="/app/profile"
            className="inline-flex items-center justify-center hover:bg-gradient-to-br from-ultramarine-min to-white rounded"
          >
            <button
              type="button"
            >
            <img
              src="https://i.ibb.co/hMcMLfk/profile.png"
              alt="Profile"
            />
            </button>
          </Link>
          <Link
            href="/app/qr"
            className="inline-flex items-center justify-center hover:bg-gradient-to-br from-ultramarine-min to-white rounded"
          >
            <button
              type="button"
            >
              <img
                src="https://i.ibb.co/88gPcWK/scan.png"
                alt="Scan"
              />
            </button>
          </Link>
          <Link
            href="/app/history"
            className="inline-flex items-center justify-center hover:bg-gradient-to-br from-ultramarine-min to-white rounded"
            >
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-5"
            >
              <img
                src="https://i.ibb.co/w6L7dpC/history.png"
                alt="History"
              />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export { AppBottomNavigation };
