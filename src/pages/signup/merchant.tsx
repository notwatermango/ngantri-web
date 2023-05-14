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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>Sign Up</h1>
        {errorMessage && <p>{errorMessage}</p>}
        <form className="flex flex-col">
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="name">Store Name</label>
            <input
              name="name"
              type="text"
              placeholder="Borger Kingus Paskal 34"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              type="text"
              // minLength="9"
              placeholder="08535102030"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              name="address"
              type="text"
              placeholder="Paskal lt. 5"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button onClick={(e) => void handleCreateAccount(e)}>
            Create account
          </button>
        </form>
      </main>
    </>
  );
};

export default MerchantSignup;
