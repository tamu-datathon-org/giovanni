import "~/app/globals.css";

import type { Metadata, Viewport } from "next";

import BackgroundImage from "./_components/images/background";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";
import { cn } from "@vanni/ui";
import { env } from "~/env";
import Link from "next/link";

import { w95fa } from "~/app/_components/fonts";
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
        className={cn("min-h-screen bg-background text-foreground antialiased")}
      >
        <Link id="mlh-trust-badge" className="mlh-trust-badge" href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=white" target="_blank">
          <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-white.svg" alt="Major League Hacking 2025 Hackathon Season" className="w-full" />
        </Link>
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
