"use client"

import type { ComponentProps, CSSProperties, PointerEvent } from "react"
import { useEffect, useRef, useState } from "react"
import { Chip } from "@/components/menu/Chip"
import { cn } from "@/lib/utils"

type MenuLink = {
  label: string
  href: string
  /** Element to scroll to, if not the one href names. */
  target?: string
} & Pick<ComponentProps<typeof Chip>, "color" | "textClassName">

const links: MenuLink[] = [
  // Re-enable once <Prizes /> is rendered in app/page.tsx
  // { label: "PRIZES", href: "#prizes", color: "teal" },
  { label: "INFO", href: "#event-information", color: "green" },
  { label: "SCHEDULE", href: "#schedule", color: "yellow", textClassName: "text-[8px] sm:text-sm" },
  { label: "SPONSORS", href: "#sponsors", color: "teal", textClassName: "text-[8px] sm:text-sm" },
  { label: "FAQ", href: "#faq", target: "faq-content", color: "blue" },
]

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Scrolls so the section is centered in the viewport, or top-aligned if it's taller than the viewport. */
function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight
  const { top, height } = el.getBoundingClientRect()
  const offset = height < viewportHeight ? (viewportHeight - height) / 2 : 0
  window.scrollTo({
    top: Math.max(0, top + window.scrollY - offset),
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  })
}

export function Menu() {
  const [hovered, setHovered] = useState(false)
  // Clicking MENU pins it open, so it stays open when the mouse leaves or a link is clicked
  const [pinned, setPinned] = useState(false)
  const open = hovered || pinned
  const navRef = useRef<HTMLElement>(null)

  // Tapping/clicking anywhere outside the menu closes it, even when pinned
  useEffect(() => {
    if (!open) return
    const closeIfOutside = (e: globalThis.PointerEvent) => {
      if (navRef.current?.contains(e.target as Node)) return
      setHovered(false)
      setPinned(false)
    }
    document.addEventListener("pointerdown", closeIfOutside)
    return () => document.removeEventListener("pointerdown", closeIfOutside)
  }, [open])

  // Only a real mouse opens on hover; touch uses the MENU tap instead
  const hoverTo = (value: boolean) => (e: PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(value)
  }

  return (
    <nav
      ref={navRef}
      onPointerEnter={hoverTo(true)}
      onPointerLeave={hoverTo(false)}
      // --peek = how much of each chip shows below MENU when stacked (about half the outer ring)
      // --step = chip size + gap, how far apart the chips are when open (they fan downward)
      className="fixed right-3 top-3 z-50 grid [--peek:4px] [--step:72px] sm:right-5 sm:top-5 sm:[--peek:8px] sm:[--step:140px]"
    >
      {links.map((link, i) => (
        <a
          key={link.label}
          href={link.href}
          onClick={(e) => {
            e.preventDefault()
            scrollToSection(link.target ?? link.href.slice(1))
            history.pushState(null, "", link.href)
          }}
          // first link sits closest to MENU; nearer chips stack on top of farther ones
          style={{ "--i": i + 1, zIndex: -i } as CSSProperties}
          className={cn(
            "col-start-1 row-start-1 cursor-pointer pt-2 transition-transform duration-300 ease-out sm:pt-3",
            open
              ? "translate-y-[calc(var(--i)*var(--step))]"
              : "pointer-events-none translate-y-[calc(var(--i)*var(--peek))]",
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
        onClick={() => setPinned(!pinned)}
        className="col-start-1 row-start-1 flex cursor-pointer self-end"
      >
        <Chip color="red">MENU</Chip>
      </button>
    </nav>
  )
}
