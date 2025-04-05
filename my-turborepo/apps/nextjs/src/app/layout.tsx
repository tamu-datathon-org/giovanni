"use client";
import "~/app/globals.css";

import ScrollToTop from "~/components/ScrollToTop";
import { Providers } from "./providers";
import { w95fa } from "~/app/_components/fonts";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";
import { Inter } from "next/font/google";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={w95fa.className}>
      <head>
        {/* <script crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js" /> */}
      </head>

      <body
        className={`bg-normal dark:bg-black ${inter.className}`}
      >
        <TRPCReactProvider>
          <Providers>
            <main>
              {props.children}
              <ScrollToTop />
            </main>
          </Providers>
        </TRPCReactProvider>
        <div className="absolute bottom-4 right-4"></div>
        <Toaster />
      </body>
    </html>
  );
}
