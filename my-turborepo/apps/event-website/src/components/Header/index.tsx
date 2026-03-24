"use client";

import { useState } from "react";

const MOBILE_MENU_ITEMS = [
  { label: "Home", targetId: "menu" },
  { label: "Location", targetId: "find-us" },
  { label: "FAQ", targetId: "baristas-note" },
] as const;

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
      <span className="font-darumadrop-one text-lg tracking-[0.14em]">
        MENU
      </span>
      <span
        aria-hidden
        className="relative block h-4 w-6"
      >
        <span className="absolute left-0 top-0 block h-[3px] w-6 rounded-full bg-[#4C321B]" />
        <span className="absolute left-0 top-1.5 block h-[3px] w-6 rounded-full bg-[#4C321B]" />
        <span className="absolute left-0 top-3 block h-[3px] w-6 rounded-full bg-[#4C321B]" />
      </span>
    </button>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const goToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.location.href = `/#${targetId}`;
  };

  return (
    <>
      <div className="fixed bottom-8 left-4 z-50">
        <MenuButton
          onClick={() => setMenuOpen((v) => !v)}
          ariaExpanded={menuOpen}
        />
      </div>

      {/* Expand menu near the button */}
      <div
        className={`fixed bottom-[5.85rem] left-4 z-50 w-[min(85vw,280px)] origin-bottom-left transition-all duration-300 ${menuOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0"}`}
      >
        <div className="rounded-2xl border-[3px] border-[#4C321B] bg-[#fdf3e3] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.16)]">
          <div className="grid gap-2">
            {MOBILE_MENU_ITEMS.map((item) => (
              <button
                key={item.targetId}
                type="button"
                className="rounded-xl border-2 border-[#4C321B]/20 bg-white/70 px-4 py-3 text-left font-darumadrop-one text-[23px] leading-none text-[#4C321B]"
                onClick={() => {
                  goToSection(item.targetId);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
