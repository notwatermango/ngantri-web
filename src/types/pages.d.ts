import type { NextPage } from "next";

type AuthNextPage = NextPage & {
  auth?: { role: string; unauthorized: string };
};
