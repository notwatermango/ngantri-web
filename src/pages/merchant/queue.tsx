import Head from "next/head";
import MerchantLayout from "~/components/merchant/MerchantLayout";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";

const MerchantQueue: AuthNextPage = () => {
  const { data: merchant } = api.merchant.getMerchantAndQueueList.useQuery();
  return (
    <>
      <Head>
        <title>Queue</title>
        <meta name="description" content="Queue list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MerchantLayout>
        <div className="flex h-full flex-col bg-ultramarine">
          <h1 className="mt-10 text-center text-5xl font-bold text-white">
            Queue Page
          </h1>
          <h2 className="mt-10 text-center text-2xl font-bold text-white">
            Total Queue: {merchant ? merchant.tickets.length : 0}
          </h2>
          <ul className="flex max-h-full w-full flex-col items-center gap-y-2 overflow-y-auto overflow-x-hidden px-5 py-2">
            {merchant &&
              merchant.tickets.map((ticket) => {
                return (
                  <li className="flex w-full flex-row justify-between rounded-2xl bg-white p-3">
                    <div className="flex items-center">
                      <div className="flex-col">
                        <div className="mr-5">
                          {ticket.user ? ticket.user.name : "Guest"}
                        </div>
                        <div className="text-sm font-thin">
                          {ticket.message ? ticket.message : ""}
                        </div>
                      </div>
                    </div>
                    {ticket.status == 1 ? (
                      <div className="flex flex-row gap-2">
                        <div className="group flex h-full items-center rounded-lg bg-indigo-100 fill-rose-900 px-2 hover:cursor-pointer">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z"
                              fill-rule="nonzero"
                            />
                          </svg>
                        </div>
                        <div className="group flex h-full items-center rounded-lg bg-indigo-100 fill-amber-500 px-2 hover:cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M15.137 3.945c-.644-.374-1.042-1.07-1.04-1.82v-.003c0-1.172-.939-2.122-2.097-2.122s-2.097.95-2.097 2.122v.003c.002.751-.396 1.446-1.04 1.82-4.668 2.712-1.986 11.715-6.863 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm5.015-12.521c-.246-1.504-.933-3.682-2.817-5.515l1.396-1.434c1.8 1.752 2.974 4.044 3.395 6.626l-1.974.323zm-18.015-.322c.421-2.583 1.595-4.874 3.395-6.627l1.396 1.434c-1.884 1.833-2.572 4.011-2.817 5.515l-1.974-.322z" />
                          </svg>
                        </div>
                      </div>
                    ) : ticket.status == 4 ? (
                      <div className="flex flex-row gap-2">
                        <div className="group flex h-full items-center rounded-lg fill-rose-200 px-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M15.137 3.945c-.644-.374-1.042-1.07-1.04-1.82v-.003c0-1.172-.939-2.122-2.097-2.122s-2.097.95-2.097 2.122v.003c.002.751-.396 1.446-1.04 1.82-4.668 2.712-1.986 11.715-6.863 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm5.015-12.521c-.246-1.504-.933-3.682-2.817-5.515l1.396-1.434c1.8 1.752 2.974 4.044 3.395 6.626l-1.974.323zm-18.015-.322c.421-2.583 1.595-4.874 3.395-6.627l1.396 1.434c-1.884 1.833-2.572 4.011-2.817 5.515l-1.974-.322z" />
                          </svg>
                        </div>
                        <div className="group flex h-full items-center rounded-lg bg-indigo-100 fill-emerald-500 px-2 hover:cursor-pointer">
                          <svg
                            stroke-linejoin="round"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
                              fill-rule="nonzero"
                            />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </li>
                );
              })}
            {/* Item start */}
            {/* Item end */}
          </ul>
        </div>
      </MerchantLayout>
    </>
  );
};

MerchantQueue.auth = {
  role: "merchant",
  unauthorized: "/",
};

export default MerchantQueue;
