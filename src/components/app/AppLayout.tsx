import { AppBottomNavigation } from "./BottomNavigation";
import type { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-start">
        <div className="container h-[calc(100vh-4rem)]">{children}</div>
        <AppBottomNavigation />
      </main>
    </>
  );
};

export default AppLayout;
