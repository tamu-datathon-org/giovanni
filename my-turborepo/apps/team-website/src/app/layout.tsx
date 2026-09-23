import "~/app/globals.css";

import { inter, w95fa } from "~/app/_components/fonts";
import ClientLayout from "~/app/ClientLayout";
import { Noise } from "~/components/shared/Noise";

import "../styles/index.css";

import type { Metadata } from "next";

import { env } from "~/env";

export const metadata: Metadata = {
  metadataBase: new URL("https://tamudatathon.org"),
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

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${w95fa.variable} ${inter.variable}`}>
      <head />
      <body className={`relative bg-[#377BB0] text-[#121723] ${inter.className}`}>
        <div className="pointer-events-none absolute inset-0">
          <Noise />
        </div>
        <div className="relative z-10">
          <ClientLayout>{props.children}</ClientLayout>
        </div>
      </body>
    </html>
  );
}
