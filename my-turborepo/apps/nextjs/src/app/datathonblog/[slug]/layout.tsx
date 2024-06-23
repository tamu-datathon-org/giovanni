import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@vanni/ui";
import { ThemeProvider, ThemeToggle } from "@vanni/ui/theme";
import { Toaster } from "@vanni/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

import "./blogstyling.css";

import { env } from "~/env";
import { headers } from "next/headers";
import Link from "next/link";

export default function RootLayout(props: { children: React.ReactNode }) {

    let header = (
        <header>
            <Link href={"/"}>
            <h1>The Daily Datathon</h1>

            </Link>
        </header>
    )

    let footer = (
        <footer>
            <p>
            NOT made with ❤️‍🔥❤️‍🔥
            </p>
        </footer>
    )
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >

          <TRPCReactProvider>
            {header}
            {props.children}
            {footer}
            </TRPCReactProvider>
          <div className="absolute bottom-4 right-4">
          </div>
     </body>
    </html>
  );
}
