import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Redirect() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status !== "loading") {
      if (!sessionData) {
        router.push("/onboarding");
      }
      if (sessionData) {
        if (sessionData.user.role == 1) {
          router.push("/app");
        } else {
          router.push("/merchant");
        }
      }
    }
  }, [status, sessionData, router]);

  return <div>Redirecting...</div>;
}
