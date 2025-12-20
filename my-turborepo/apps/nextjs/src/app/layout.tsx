"use client";

import "~/app/globals.css";

import { Inter } from "next/font/google";

import ScrollToTop from "@vanni/ui/scroll-to-top";

import { w95fa } from "~/app/_components/fonts";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "./providers";

import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={w95fa.className}>
      <head></head>

      <body className={`bg-black ${inter.className}`}>
        <TRPCReactProvider>
          <Providers>
            <main className="min-h-screen">
              <Header />
              {props.children}
              <ScrollToTop />
              <Footer />
            </main>
          </Providers>
        </TRPCReactProvider>
        <div className="absolute bottom-4 right-4"></div>
        <Toaster />
      </body>
    </html>
  );
}
