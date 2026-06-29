"use client";

import ScrollToTop from "@vanni/ui/scroll-to-top";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TRPCReactProvider>
      <main className="min-h-screen w-full">
        {children}
        <ScrollToTop />
      </main>
      <Toaster />
    </TRPCReactProvider>
  );
}