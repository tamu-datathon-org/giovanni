"use client";

import { Inter } from "next/font/google";

import Footer from "~/components/Footer";
import Header from "~/components/Header";
import ScrollToTop from "~/components/ScrollToTop";
import { Toaster } from "~/components/ui/toaster";
import { Providers } from "./providers";
// import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`bg-normal dark:bg-black ${inter.className}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
