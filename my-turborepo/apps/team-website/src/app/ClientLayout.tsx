"use client";

import ScrollToTop from "@vanni/ui/scroll-to-top";

import Footer from "~/components/Footer";
import Header from "~/components/Header/index";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "./providers";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TRPCReactProvider>
      <Providers>
        <main className="min-h-screen w-full">
          <div className="flex w-full items-center justify-center">
            <Header />
          </div>
          {children}
          <ScrollToTop />
          <Footer />
        </main>
      </Providers>
      <div className="absolute bottom-4 right-4" />
      <Toaster />
    </TRPCReactProvider>
  );
}
