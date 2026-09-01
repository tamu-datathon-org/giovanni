"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { konkhmerSleokchher } from "~/app/_components/fonts";

/** Sidebar blue and active-label teal, Figma 36:317 / 36:320. */
const PANEL_BG = "#377BB0";
const ACCENT = "#83EFE8";

/**
 * Full-screen loader shown until the page has finished loading. Self-contained
 * on purpose: it owns its own keyframes rather than adding them to
 * tailwind.config, so it cannot conflict with the other in-progress branches.
 */
export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const finish = () => setDone(true);
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }
    // Never trap someone behind the loader if a slow asset stalls.
    const bail = setTimeout(finish, 5000);
    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(bail);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setRemoved(true), 550);
    return () => clearTimeout(t);
  }, [done]);

  if (removed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className={`${konkhmerSleokchher.variable} fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-500 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: PANEL_BG }}
    >
      <style>{`
        @keyframes td-bob {
          0%, 100% { transform: translateY(0) }
          50% { transform: translateY(-10px) }
        }
        @keyframes td-sweep {
          0% { transform: translateX(-100%) }
          100% { transform: translateX(300%) }
        }
        .td-bob { animation: td-bob 1.6s ease-in-out infinite }
        .td-sweep { animation: td-sweep 1.3s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) {
          .td-bob, .td-sweep { animation: none }
        }
      `}</style>

      <Image
        src="/images/td-logos/logo/logoTD26.png"
        alt=""
        width={348}
        height={242}
        sizes="132px"
        priority
        className="td-bob h-auto w-[104px] xl:w-[132px]"
      />

      <p className="mt-7 font-konkhmer text-[16px] uppercase tracking-[0.64px] text-white/85 xl:text-[18px]">
        loading
      </p>

      <div className="mt-4 h-[3px] w-[150px] overflow-hidden rounded-full bg-white/25 xl:w-[180px]">
        <div
          className="td-sweep h-full w-1/3 rounded-full"
          style={{ backgroundColor: ACCENT }}
        />
      </div>
    </div>
  );
}
