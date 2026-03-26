"use client";

import { useState } from "react";

import CafeMenuBoardContainer from "./CafeMenuBoardContainer";

function MenuButton({
  onClick,
  ariaExpanded,
}: {
  onClick: () => void;
  ariaExpanded: boolean;
}) {
  return (
    <button
      type="button"
      aria-label="Open menu"
      aria-expanded={ariaExpanded}
      onClick={onClick}
      className="flex items-center gap-3 rounded-2xl border-2 border-[#b4d8ee]/40 bg-[#fdf3e3] px-4 py-3 text-[#4C321B] shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
    >
      {/* <span className="font-darumadrop-one text-lg tracking-[0.14em]">
        MENU
      </span> */}
      <span aria-hidden className="relative block h-4 w-6">
        <span className="absolute left-0 top-0 block h-[3px] w-6 rounded-full bg-[#4C321B]" />
        <span className="absolute left-0 top-1.5 block h-[3px] w-6 rounded-full bg-[#4C321B]" />
        <span className="absolute left-0 top-3 block h-[3px] w-6 rounded-full bg-[#4C321B]" />
      </span>
    </button>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop: keep the menu board fixed. */}
      <div className="fixed left-4 top-16 z-50 hidden md:bottom-10 md:left-6 md:top-auto md:block">
        <CafeMenuBoardContainer />
      </div>

      {/* Mobile: collapse into a smaller toggle button. */}
      <div className="fixed left-4 top-4 z-50 md:hidden">
        <MenuButton
          onClick={() => setMenuOpen((v) => !v)}
          ariaExpanded={menuOpen}
        />
      </div>

      {/* Mobile: menu overlay */}
      {menuOpen ? (
        <div className="fixed left-4 top-16 z-50 md:hidden">
          <CafeMenuBoardContainer onItemSelected={() => setMenuOpen(false)} />
        </div>
      ) : null}
    </>
  );
}
