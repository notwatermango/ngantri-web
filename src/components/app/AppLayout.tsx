import { AppBottomNavigation } from "./BottomNavigation";
import type { PropsWithChildren } from "react";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="min-w-screen flex min-h-screen flex-col items-center justify-start p-0">
        <div className="h-[calc(100vh-4rem)] w-full flex flex-col">{children}</div>
        <AppBottomNavigation />
      </main>
    </>
  );
};

export default AppLayout;
