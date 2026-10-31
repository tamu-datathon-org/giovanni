"use client";

import ScrollToTop from "@vanni/ui/scroll-to-top";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Footer from "~/components/Footer";
import Header from "~/components/Header/index";
import LoadingScreen from "~/components/Loading";
import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Collapsing the sidebar swaps it for the dots rail (Figma 36:492). Kept
  // here rather than in Header so the content offset can follow it.
  const [navCollapsed, setNavCollapsed] = useState(false);

  useEffect(() => {
    try {
      setNavCollapsed(localStorage.getItem("td-nav-collapsed") === "1");
    } catch {
      // Safari private mode and friends — the default is fine.
    }
  }, []);

  const toggleNav = () => {
    setNavCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("td-nav-collapsed", next ? "1" : "0");
      } catch {
        // non-fatal: the toggle still works for this session
      }
      return next;
    });
  };
  const hideMarketingChrome = pathname.startsWith("/organizer");

  return (
    <TRPCReactProvider>
      <LoadingScreen />
      {/* offset for the fixed sidebar so it never overlaps content */}
      <main
        className={`min-h-screen w-full transition-[padding] duration-300 ${
          navCollapsed ? "lg:pl-[80px]" : "lg:pl-[184px] xl:pl-[240px]"
        }`}
      >
        {!hideMarketingChrome && (
          <div className="flex w-full items-center justify-center">
            <Header collapsed={navCollapsed} onToggle={toggleNav} />
          </div>
        )}
        {children}
        <ScrollToTop />
        {!hideMarketingChrome && <Footer />}
      </main>
      <div className="absolute bottom-4 right-4" />
      <Toaster />
    </TRPCReactProvider>
  );
}
