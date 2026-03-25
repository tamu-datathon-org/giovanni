"use client";

import ScrollToTop from "@vanni/ui/scroll-to-top";
import { usePathname } from "next/navigation";

import Footer from "~/components/Footer";
import Header from "~/components/Header/index";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideMarketingChrome = pathname.startsWith("/organizer");

  return (
    <TRPCReactProvider>
      <main className="min-h-screen w-full">
        {!hideMarketingChrome && (
          <div className="flex w-full items-center justify-center">
            <Header />
          </div>
        )}
        {children}
        <ScrollToTop />
        {!hideMarketingChrome && <Footer />}
      </main>
      <div className="absolute bottom-4 right-4" />
      <Toaster />
    </TRPCReactProvider>
  );
}
