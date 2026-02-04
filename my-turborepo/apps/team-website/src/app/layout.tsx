import "~/app/globals.css";

import { Inter } from "next/font/google";

import { w95fa } from "~/app/_components/fonts";
import ClientLayout from "~/app/ClientLayout";

import "../styles/index.css";

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
