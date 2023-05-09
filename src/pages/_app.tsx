import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { type PropsWithChildren, useEffect, useState } from "react";

import type { AppPropsType } from "next/dist/shared/lib/utils";
import { useRouter } from "next/navigation";

type NextAuthComponentType = AppPropsType["Component"] & {
  auth?: { role: string; unauthorized: string };
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const AuthComponent = Component as NextAuthComponentType;
  return (
    <SessionProvider session={session}>
      {AuthComponent.auth ? (
        <Auth
          role={AuthComponent.auth.role}
          unauthorized={AuthComponent.auth.unauthorized}
        >
          <AuthComponent {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
};

function Auth({
  children,
  role,
  unauthorized,
}: PropsWithChildren<{ role: string; unauthorized: string }>) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data: sessionData, status } = useSession();
  const [auth, setAuth] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.push(unauthorized);
    if (status === "authenticated") {
      if (sessionData.user.role === 1 && role !== "user")
        router.push(unauthorized);
      if (sessionData.user.role === 1 && role === "user") setAuth(true);
      if (sessionData.user.role === 2 && role !== "merchant")
        router.push(unauthorized);
      if (sessionData.user.role === 2 && role === "merchant") setAuth(true);
    }
  }, [status]);

  if (status === "loading") {
    // TODO: Loading page
    return <div>Loading...</div>;
  }

  return <>{auth && children}</>;
}

export default api.withTRPC(MyApp);
