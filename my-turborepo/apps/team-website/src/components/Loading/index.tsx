"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Full-screen loader shown until the page has finished loading. Colours are the
 * sidebar blue and active-label teal (Figma 36:317 / 36:320); the bob and sweep
 * keyframes live in tailwind.config.
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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-td-blue transition-opacity duration-500 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >

      <Image
        src="/images/td-logos/logo/logoTD26.png"
        alt=""
        width={348}
        height={242}
        sizes="132px"
        priority
        className="h-auto w-[104px] animate-loader-bob motion-reduce:animate-none xl:w-[132px]"
      />

      <p className="mt-7 font-konkhmer text-[16px] uppercase tracking-[0.64px] text-white/85 xl:text-[18px]">
        loading
      </p>

      <div className="mt-4 h-[3px] w-[150px] overflow-hidden rounded-full bg-white/25 xl:w-[180px]">
        <div className="h-full w-1/3 animate-loader-sweep rounded-full bg-td-aqua motion-reduce:animate-none" />
      </div>
    </div>
  );
}
