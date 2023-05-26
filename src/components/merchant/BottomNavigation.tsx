import Link from "next/link";

// type IAppButtonNavProps = {};

const MerchantBottomNavigation = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 h-16 w-full bg-white">
        <div className="mx-auto grid h-full max-w-xs grid-cols-3 ">
          <Link
            href="/merchant/profile"
            className="inline-flex items-center justify-center rounded from-ultramarine-min to-white hover:bg-gradient-to-br"
          >
            <button type="button">
              <img
                className="w-10"
                src="https://i.postimg.cc/F77vvF4v/profile1.png"
                alt="Profile"
              />
            </button>
          </Link>
          <Link
            href="/merchant/dashboard"
            className="inline-flex items-center justify-center rounded from-ultramarine-min to-white hover:bg-gradient-to-br"
          >
            <button type="button">
              <img
                className="w-10"
                src="https://i.postimg.cc/r0kD91tj/dashboard.png"
                alt="Dashboard"
              />
            </button>
          </Link>
          <Link
            href="/merchant/queue"
            className="inline-flex items-center justify-center rounded from-ultramarine-min to-white hover:bg-gradient-to-br"
          >
            <button
              type="button"
              className="inline-flex flex-col items-center justify-center px-5"
            >
              <img
                className="w-10"
                src="https://i.postimg.cc/jWNWNgCC/queue.png"
                alt="Queue"
              />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export { MerchantBottomNavigation };
