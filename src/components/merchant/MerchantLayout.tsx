import type { PropsWithChildren } from "react";
import { MerchantBottomNavigation } from "./BottomNavigation";

const MerchantLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className="min-w-screen flex min-h-screen flex-col items-center justify-start p-0">
        <div className="flex h-[calc(100vh-4rem)] w-full flex-col">
          {children}
        </div>
        <MerchantBottomNavigation />
      </main>
    </>
  );
};

export default MerchantLayout;
