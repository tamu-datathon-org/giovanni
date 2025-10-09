"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "../styles/index.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // redirect("https://tamudatathon.org/apply");

  return (
    <html lang="en">
      <body className="h-full m-0 w-full">
        <a
          id="mlh-trust-badge"
          style={{
            display: "block",
            maxWidth: "100px",
            minWidth: "60px",
            position: "fixed",
            right: "50px",
            top: "0",
            width: "10%",
            zIndex: 10000,
          }}
          href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=black"
          target="_blank"
        >
          <img
            src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-black.svg"
            alt="Major League Hacking 2026 Hackathon Season"
            style={{ width: "100%" }}
          />
        </a>

        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html >
  );
}
