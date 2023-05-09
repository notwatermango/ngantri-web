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
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateAccount = async (e: FormEvent) => {
    e.preventDefault();
    const hashedPassword = await hash(password, 12);
    await createAccount.mutateAsync(
      {
        email,
        password: hashedPassword,
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
        <form>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={(e) => void handleCreateAccount(e)}>
            Create account
          </button>
        </form>
      </main>
    </>
  );
};

export default MerchantSignup;
