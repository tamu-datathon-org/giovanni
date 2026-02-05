import "~/app/globals.css";

import { Inter } from "next/font/google";

import { w95fa } from "~/app/_components/fonts";
import ClientLayout from "~/app/ClientLayout";

import "../styles/index.css";

import type { Metadata } from "next";

import { env } from "~/env";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "TAMU Datathon",
  description: "A&M's Data Science Hackathon",
  openGraph: {
    title: "TAMU Datathon",
    description: "A&M's Data Science Hackathon",
    url: "https://tamudatathon.com",
    siteName: "TAMU Datathon",
  },
  icons: {
    icon: "/images/past-logos/TD2024.png",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={w95fa.className}>
      <head />
      <body
        className={`bg-white text-black dark:bg-black dark:text-white ${inter.className}`}
      >
        <ClientLayout>{props.children}</ClientLayout>
      </body>
    </html>
  );
}
