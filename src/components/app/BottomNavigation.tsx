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
              className="w-10"
              src="https://i.postimg.cc/F77vvF4v/profile1.png"
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
                className="w-10"
                src="https://i.postimg.cc/XXN32c1p/scan.png"
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
                className="w-10"
                src="https://i.postimg.cc/py0v3h3k/history1.png"
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
