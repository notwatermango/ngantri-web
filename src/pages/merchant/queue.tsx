import Head from "next/head";
import { useState } from "react";
import MerchantLayout from "~/components/merchant/MerchantLayout";
import type { AuthNextPage } from "~/types/pages";
import { api } from "~/utils/api";

const MerchantQueue: AuthNextPage = () => {
  const [isActiveQueue, setIsActiveQueue] = useState(true);
  const { data: merchant, refetch } =
    api.merchant.getMerchantQueueList.useQuery({ isActiveQueue });
  const cancelTicket = api.ticket.cancelTicket.useMutation();
  const finishTicket = api.ticket.finishTicket.useMutation();
  const callCustomer = api.ticket.callTicketCustomer.useMutation();
  const [loadingButtonFinish, setLoadingButtonFinish] = useState(false);
  const [loadingButtonCancel, setLoadingButtonCancel] = useState(false);
  const [loadingButtonCall, setLoadingButtonCall] = useState(false);
  const [thisTicketId, setThisTicketId] = useState("");
  const handleCancelTicket = async (ticketId: string) => {
    setThisTicketId(ticketId);
    setLoadingButtonCancel(true);
    await cancelTicket.mutateAsync({
      ticketId,
    });
    await refetch();
    setLoadingButtonCancel(false);
  };
  const handleFinishTicket = async (ticketId: string) => {
    setThisTicketId(ticketId);
    setLoadingButtonFinish(true);
    await finishTicket.mutateAsync({
      ticketId,
    });
    await refetch();
    setLoadingButtonFinish(false);
  };
  const handleCallCustomer = async (ticketId: string) => {
    setThisTicketId(ticketId);
    setLoadingButtonCall(true);
    await callCustomer.mutateAsync({
      ticketId,
    });
    await refetch();
    setLoadingButtonCall(false);
  };
  return (
    <>
      <Head>
        <title>Queue</title>
        <meta name="description" content="Queue list" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <MerchantLayout>
        <div className="flex h-full w-full flex-col items-center bg-ultramarine">
          <h1 className="p-5 text-3xl font-bold text-white">Queue Page</h1>
          <div className="flex flex-row justify-center rounded-full bg-white">
            <div
              onClick={() => setIsActiveQueue(true)}
              className={`flex w-1/2 flex-col items-center px-3 py-1 text-sm text-black ${
                isActiveQueue
                  ? "h-full rounded-l-full bg-indigo-800 font-bold text-white"
                  : ""
              }`}
            >
              Active
            </div>
            <div
              onClick={() => setIsActiveQueue(false)}
              className={`flex w-1/2 flex-col items-center px-3 py-1 text-sm text-black ${
                !isActiveQueue
                  ? "h-full rounded-r-full bg-indigo-800 font-bold text-white"
                  : ""
              }`}
            >
              Inactive
            </div>
          </div>
          <div className="px-5 text-left text-sm text-white">
            count: {merchant ? merchant.tickets.length : 0}
          </div>
          <ul className="flex max-h-full w-full flex-col items-center gap-y-2 overflow-y-auto overflow-x-hidden px-5 py-2">
            {merchant &&
              merchant.tickets.map((ticket) => {
                return (
                  <li
                    key={ticket.id}
                    className="flex w-full flex-row justify-between rounded-2xl bg-white p-3"
                  >
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
                        <div
                          onClick={() => handleCancelTicket(ticket.id)}
                          className="group flex h-full items-center rounded-lg bg-indigo-100 fill-rose-900 px-2 hover:cursor-pointer"
                        >
                          {ticket.id == thisTicketId && loadingButtonCancel ? (
                            <div>
                              <svg
                                aria-hidden="true"
                                role="status"
                                className="mr-3 inline h-4 w-4 animate-spin text-white"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="#E5E7EB"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentColor"
                                />
                              </svg>
                              Loading...
                            </div>
                          ) : (
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
                          )}
                        </div>
                        <div
                          onClick={() => handleCallCustomer(ticket.id)}
                          className="group flex h-full items-center rounded-lg bg-indigo-100 fill-amber-500 px-2 hover:cursor-pointer"
                        >
                          {ticket.id == thisTicketId && loadingButtonCall ? (
                            <div>
                              <svg
                                aria-hidden="true"
                                role="status"
                                className="mr-3 inline h-4 w-4 animate-spin text-white"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="#E5E7EB"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentColor"
                                />
                              </svg>
                              Loading...
                            </div>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M15.137 3.945c-.644-.374-1.042-1.07-1.04-1.82v-.003c0-1.172-.939-2.122-2.097-2.122s-2.097.95-2.097 2.122v.003c.002.751-.396 1.446-1.04 1.82-4.668 2.712-1.986 11.715-6.863 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm5.015-12.521c-.246-1.504-.933-3.682-2.817-5.515l1.396-1.434c1.8 1.752 2.974 4.044 3.395 6.626l-1.974.323zm-18.015-.322c.421-2.583 1.595-4.874 3.395-6.627l1.396 1.434c-1.884 1.833-2.572 4.011-2.817 5.515l-1.974-.322z" />
                            </svg>
                          )}
                        </div>
                      </div>
                    ) : ticket.status == 4 ? (
                      <div className="flex flex-row gap-2">
                        <div className="group flex h-full items-center rounded-lg fill-rose-200 px-2">
                          {ticket.id == thisTicketId && loadingButtonCall ? (
                            <div>
                              <svg
                                aria-hidden="true"
                                role="status"
                                className="mr-3 inline h-4 w-4 animate-spin text-white"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="#E5E7EB"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentColor"
                                />
                              </svg>
                              Loading...
                            </div>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M15.137 3.945c-.644-.374-1.042-1.07-1.04-1.82v-.003c0-1.172-.939-2.122-2.097-2.122s-2.097.95-2.097 2.122v.003c.002.751-.396 1.446-1.04 1.82-4.668 2.712-1.986 11.715-6.863 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm5.015-12.521c-.246-1.504-.933-3.682-2.817-5.515l1.396-1.434c1.8 1.752 2.974 4.044 3.395 6.626l-1.974.323zm-18.015-.322c.421-2.583 1.595-4.874 3.395-6.627l1.396 1.434c-1.884 1.833-2.572 4.011-2.817 5.515l-1.974-.322z" />
                            </svg>
                          )}
                        </div>
                        <div
                          onClick={() => handleFinishTicket(ticket.id)}
                          className="group flex h-full items-center rounded-lg bg-indigo-100 fill-emerald-500 px-2 hover:cursor-pointer"
                        >
                          {ticket.id == thisTicketId && loadingButtonFinish ? (
                            <div>
                              <svg
                                aria-hidden="true"
                                role="status"
                                className="mr-3 inline h-4 w-4 animate-spin text-white"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="#E5E7EB"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentColor"
                                />
                              </svg>
                              Loading...
                            </div>
                          ) : (
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
                          )}
                        </div>
                      </div>
                    ) : ticket.status == 2 ? (
                      <div className="flex max-h-6 flex-row items-center rounded-lg bg-green-700 p-2 text-sm font-semibold text-white">
                        {ticket.id == thisTicketId && loadingButtonFinish ? (
                          <div>
                            <svg
                              aria-hidden="true"
                              role="status"
                              className="mr-3 inline h-4 w-4 animate-spin text-white"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                              />
                            </svg>
                            Loading...
                          </div>
                        ) : (
                          "Finished"
                        )}
                      </div>
                    ) : ticket.status == 3 ? (
                      <div className="flex max-h-6 flex-row items-center rounded-lg bg-red-900 p-2 text-sm font-semibold text-white">
                        {ticket.id == thisTicketId && loadingButtonFinish ? (
                          <div>
                            <svg
                              aria-hidden="true"
                              role="status"
                              className="mr-3 inline h-4 w-4 animate-spin text-white"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                              />
                            </svg>
                            Loading...
                          </div>
                        ) : (
                          "Cancelled"
                        )}
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
