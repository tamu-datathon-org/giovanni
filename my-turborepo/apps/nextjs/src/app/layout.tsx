import "~/app/globals.css";

import type { Metadata, Viewport } from "next";

import BackgroundImage from "./_components/images/background";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";
import { cn } from "@vanni/ui";
import { env } from "~/env";
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
        <TRPCReactProvider>
          <main>
            <BackgroundImage
              desktop_src={"/assets/wallpaper.png"}
              mobile_src={"/assets/wallpaper-mobile.png"}
              alt={"Preregistration background"}
            />
            {props.children}
          </main>
        </TRPCReactProvider>
        <div className="absolute bottom-4 right-4"></div>
        <Toaster />
      </body>
    </html>
  );
}
