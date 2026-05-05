import { Inter, Darumadrop_One, Chilanka } from "next/font/google";
import Header from "@/components/Header";

import ScrollToTop from "@vanni/ui/scroll-to-top";

import "../styles/index.css";
import Footer from "@/components/Footer";

// Optimize font loading with next/font/google
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const darumadropOne = Darumadrop_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-darumadrop-one",
  display: "swap",
});

const chilanka = Chilanka({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-chilanka",
  display: "swap",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // redirect("https://tamudatathon.org/apply");

  return (
    <html lang="en" className="overflow-x-clip">
      <body className={`m-0 h-full w-full overflow-x-clip ${inter.variable} ${darumadropOne.variable} ${chilanka.variable}`}>


        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
