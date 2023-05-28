import { hash } from "bcryptjs";
import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";

const MerchantSignup: NextPage = () => {
  const createAccount = api.account.createMerchantAccount.useMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const handleCreateAccount = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingButton(true);
    const hashedPassword = await hash(password, 12);
    await createAccount.mutateAsync(
      {
        email,
        password: hashedPassword,
        name,
        phone,
        address,
      },
      {
        onSuccess: async (ret) => {
          setLoadingButton(false);
          if (ret.status === "success") {
            await signIn("credentials", {
              email,
              password,
              callbackUrl: "/merchant",
            });
          }
          if (ret.status === "error") {
            setErrorMessage(ret.message);
          }
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>Merchant Sign Up</title>
        <meta name="description" content="Sign up merchant" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-ultramarine">
        <h1 className="text-center font-bold text-white">Reserve your seat</h1>
        <h1 className="mb-4 text-center font-bold text-white">
          wherever and whenever
        </h1>
        {errorMessage && <p>{errorMessage}</p>}
        <form className="flex flex-col">
          <div>
            <label htmlFor="email" className="font-bold text-white">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-64 rounded-lg border border-white bg-white p-2 pl-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-bold text-white">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-64 rounded-lg border border-white bg-white p-2 pl-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="name" className="font-bold text-white">
              Store Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Borger Kingus Paskal 34"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 block w-64 rounded-lg border border-white bg-white p-2 pl-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="font-bold text-white">
              Phone
            </label>
            <input
              name="phone"
              type="text"
              // minLength="9"
              placeholder="08535102030"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 block w-64 rounded-lg border border-white bg-white p-2 pl-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="address" className="font-bold text-white">
              Address
            </label>
            <input
              name="address"
              type="text"
              placeholder="Paskal lt. 5"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 block w-64 rounded-lg border border-white bg-white p-2 pl-5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={(e) => void handleCreateAccount(e)}
            className="mb-2 mt-5 place-content-center rounded-3xl border border-gray-300 bg-white px-5 py-2 text-sm font-bold text-dark-blue hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
            disabled={loadingButton}
          >
            {loadingButton ? (
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
              "SIGN UP"
            )}
          </button>
        </form>
      </main>
    </>
  );
};

export default MerchantSignup;
