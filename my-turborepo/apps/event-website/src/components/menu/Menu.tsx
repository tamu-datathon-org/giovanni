"use client"

import type { ComponentProps, CSSProperties, PointerEvent } from "react"
import { useEffect, useRef, useState } from "react"
import { Chip } from "@/components/menu/Chip"
import { cn } from "@/lib/utils"

type MenuLink = { label: string; href: string } & Pick<ComponentProps<typeof Chip>, "color" | "textClassName">

const links: MenuLink[] = [
  { label: "PRIZES", href: "#prizes", color: "teal" },
  { label: "SCHEDULE", href: "#schedule", color: "yellow", textClassName: "text-[10px] sm:text-sm" },
  { label: "INFO", href: "#event-information", color: "green" },
  { label: "FAQ", href: "#faq", color: "blue" },
]

export function Menu() {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Tapping anywhere outside the menu closes it on mobile
  useEffect(() => {
    if (!open) return
    const closeIfOutside = (e: globalThis.PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", closeIfOutside)
    return () => document.removeEventListener("pointerdown", closeIfOutside)
  }, [open])

  // Only a real mouse opens/closes on hover; touch uses the MENU tap instead
  const hoverTo = (value: boolean) => (e: PointerEvent) => {
    if (e.pointerType === "mouse") setOpen(value)
  }

  return (
    <nav
      ref={navRef}
      onPointerEnter={hoverTo(true)}
      onPointerLeave={hoverTo(false)}
      // --peek = how much of each chip shows when stacked (about half the outer ring)
      // --step = chip size + gap, how far apart the chips are when open
      className="fixed bottom-3 right-3 z-50 grid [--peek:5px] [--step:88px] sm:bottom-5 sm:right-5 sm:[--peek:8px] sm:[--step:140px]"
    >
      {links.map((link, i) => (
        <a
          key={link.label}
          href={link.href}
          onClick={() => setOpen(false)}
          style={{ "--i": links.length - i } as CSSProperties}
          className={cn(
            "col-start-1 row-start-1 cursor-pointer pb-2 transition-transform duration-300 ease-out sm:pb-3",
            open
              ? "-translate-y-[calc(var(--i)*var(--step))]"
              : "pointer-events-none -translate-y-[calc(var(--i)*var(--peek))]",
          )}
        >
          <Chip
            color={link.color}
            textClassName={link.textClassName}
            // only grow on non-mobile, so a tap on mobile doesn't leave a chip stuck big
            className="transition-transform duration-150 [@media(hover:hover)]:hover:scale-110"
          >
            {link.label}
          </Chip>
        </a>
      ))}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="col-start-1 row-start-1 flex cursor-pointer self-start"
      >
        <Chip color="red">MENU</Chip>
      </button>
    </nav>
  )
}
