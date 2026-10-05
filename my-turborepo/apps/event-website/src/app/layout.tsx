import { Inter } from "next/font/google";
import Header from "@/components/Header";
import MlhBadge from "@/components/MlhBadge";

import ScrollToTop from "@vanni/ui/scroll-to-top";

import "../styles/index.css";
import Footer from "@/components/Footer";

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
    <html lang="en" className="overflow-x-clip">
      <body className={`m-0 h-full w-full overflow-x-clip ${inter.variable}`}>


        {/* <Header /> */}
        <MlhBadge />
        {children}
        {/* <Footer /> */}
        <ScrollToTop />
      </body>
    </html>
  );
}
