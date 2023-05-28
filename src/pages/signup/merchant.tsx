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

  const handleCreateAccount = async (e: FormEvent) => {
    e.preventDefault();
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
              placeholder="example@gmail.com"
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
              placeholder="********"
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
          >
            SIGN UP
          </button>
        </form>
      </main>
    </>
  );
};

export default MerchantSignup;
