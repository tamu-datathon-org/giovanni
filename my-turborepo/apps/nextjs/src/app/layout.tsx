import "~/app/globals.css";

import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { cn } from "@vanni/ui";

import { w95fa } from "~/app/_components/fonts";
import { Toaster } from "~/components/ui/toaster";
import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";
import BackgroundImage from "./_components/images/background";

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
  // TODO: Find out if this is important
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@jullerino",
  //   creator: "@jullerino",
  // },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={w95fa.className}>
      <body
        className={cn("min-h-screen text-foreground antialiased bg-black bg-opacity-70")}
      >
        <TRPCReactProvider>
          <main>
            <BackgroundImage
              desktop_src={"/assets/wallpaper.png"}
              mobile_src={"/assets/wallpaper-mobile.png"}
              alt={"Preregistration background"}
            />
            {props.children}
            <SpeedInsights />
          </main>
        </TRPCReactProvider>
        <div className="absolute bottom-4 right-4"></div>
        <Toaster />
      </body>
    </html>
  );
}
