"use client";

import { useState } from "react";
import Image from "next/image";

import CafeMenuBoardContainer from "./CafeMenuBoardContainer";

function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 rounded-2xl border-2 border-[#b4d8ee]/40 bg-[#fdf3e3] px-4 py-3 text-[#4C321B] shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
    >
      <span className="relative block h-4 w-6">
        <span className="absolute left-0 top-0 block h-[3px] w-6 rounded-full bg-[#4C321B]" />
        <span className="absolute left-0 top-1.5 block h-[3px] w-6 rounded-full bg-[#4C321B]" />
        <span className="absolute left-0 top-3 block h-[3px] w-6 rounded-full bg-[#4C321B]" />
      </span>
    </button>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuActiveId, setMenuActiveId] = useState("menu");

  return (
    <>
      <div className="fixed left-4 top-16 z-50 hidden md:bottom-10 md:left-6 md:top-auto md:block">
        <div className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border-4 border-[#b4d8ee]/40 bg-[#fdf3e3] px-4 py-3 text-left text-[#4C321B] shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-shadow"
          >
            <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_10%,rgba(180,216,238,0.45),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(180,216,238,0.25),transparent_55%)]" />
            <div
              className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/></filter><rect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.35\'/></svg>")',
              }}
            />
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-2 bg-[#b4d8ee]/10" />
            <span className="relative z-10 flex shrink-0 items-center">
              <Image src="/images/tdlite2026.png" alt="" width={40} height={40} />
            </span>
            <span className="font-darumadrop-one relative z-10 text-lg tracking-[0.14em]">
              MENU
            </span>
          </button>
        </div>
      </div>

      <div className="fixed left-4 top-4 z-50 md:hidden">
        <MenuButton onClick={() => setMenuOpen((v) => !v)} />
      </div>

      {menuOpen ? (
        <div className="fixed left-4 top-16 z-50 md:top-auto md:bottom-28 md:left-6">
          <CafeMenuBoardContainer
            activeId={menuActiveId}
            onActiveIdChange={setMenuActiveId}
            onItemSelected={() => setMenuOpen(false)}
          />
        </div>
      ) : null}
    </>
  );
}
