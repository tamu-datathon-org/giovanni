"use client";

import { Inter } from "next/font/google";
import Image from "next/image";
// import Footer from "@/components/Footer";
import Header from "@/components/Header";

import ScrollToTop from "@vanni/ui/scroll-to-top";

import "../styles/index.css";

// Optimize font loading with next/font/google
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // redirect("https://tamudatathon.org/apply");

  return (
    <html lang="en">
      <body className={`m-0 h-full w-full ${inter.variable}`}>


        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
        {/* <ScrollToTop /> */}
      </body>
    </html>
  );
}
