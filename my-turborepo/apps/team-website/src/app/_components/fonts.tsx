import { Inter, Konkhmer_Sleokchher } from "next/font/google";
import localFont from "next/font/local";

export const w95fa = localFont({
  src: "./fonts/w95fa.woff2",
  display: "swap",
  variable: "--font-w95fa",
});

export const kodeMono = localFont({
  src: [
    { path: "./fonts/KodeMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/KodeMono-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/KodeMono-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  fallback: ["monospace"],
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: "400",
});

export const konkhmerSleokchher = Konkhmer_Sleokchher({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-konkhmer-sleokchher",
});
