"use client";

import type { StaticImageData } from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export interface HoverCrossfadeItem {
  id: string;
  label: string;
  image: StaticImageData | string;
  alt?: string;
  caption?: string;
  kicker?: string; // small label above the caption, e.g. "Event Poster"
  href?: string; // link to that year's archived site, opens in a new tab
}

export interface HoverCrossfadeGroup {
  title: string;
  items: HoverCrossfadeItem[];
}

interface HoverCrossfadeProps {
  groups: HoverCrossfadeGroup[];
  className?: string;
  duration?: number;
}

/* ---------- tiny inline icons (no extra deps) ---------- */

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 1.5h5L12.5 5v9.5h-9v-13z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M9 1.5V5h3.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const LIGHT_CLASS = "block h-3 w-3 shrink-0 rounded-full p-0";

// Glyph opacity follows real hover/focus via CSS and the scripted cursor via
// the --lights-hover var, so the two never fight over an inline opacity.
function LightGlyph({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="h-full w-full opacity-[var(--lights-hover,0)] group-focus-within/lights:opacity-100 group-hover/lights:opacity-100"
    >
      <path
        d={d}
        stroke="rgba(0,0,0,0.55)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------- */

export default function HoverCrossfade({
  groups,
  className,
  duration = 0.7,
}: HoverCrossfadeProps) {
  const allItems = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  const [layers, setLayers] = useState<
    [HoverCrossfadeItem | null, HoverCrossfadeItem | null]
  >([allItems[0] ?? null, null]);

  // Reactive active id so the sidebar can show a selected state.
  const [activeId, setActiveId] = useState<string | null>(
    allItems[0]?.id ?? null,
  );

  const activeIndexRef = useRef<0 | 1>(0);
  const layerRefs = useRef<[HTMLDivElement | null, HTMLDivElement | null]>([
    null,
    null,
  ]);

  const handleHover = useCallback(
    (item: HoverCrossfadeItem) => {
      if (item.id === activeId) return;
      setActiveId(item.id);

      const current = activeIndexRef.current;
      const next: 0 | 1 = current === 0 ? 1 : 0;

      setLayers((prev) => {
        const updated = [...prev] as typeof prev;
        updated[next] = item;
        return updated;
      });

      requestAnimationFrame(() => {
        const incoming = layerRefs.current[next];
        const outgoing = layerRefs.current[current];
        if (!incoming) return;

        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const d = reduce ? 0 : duration;

        gsap.killTweensOf([incoming, outgoing]);
        gsap.set(incoming, { zIndex: 2, opacity: 0, scale: reduce ? 1 : 1.08 });
        gsap.set(outgoing, { zIndex: 1 });
        gsap.to(incoming, {
          opacity: 1,
          scale: 1,
          duration: d,
          ease: "power3.out",
        });
        if (outgoing) {
          gsap.to(outgoing, {
            opacity: 0,
            duration: d * 0.85,
            ease: "power2.out",
          });
        }

        activeIndexRef.current = next;
      });
    },
    [activeId, duration],
  );

  return (
    <div
      data-genie-window
      className={`shadow-two overflow-hidden rounded-xl border border-[#E3E8EF] bg-white ${
        className ?? ""
      }`}
    >
      {/* Editor title bar. The lights show their glyphs on hover like macOS;
          MinimizeToDock drives the same state through --lights-hover. */}
      <div className="flex items-center gap-2 border-b border-[#E3E8EF] bg-[#F3F3F3] px-4 py-3">
        <div data-genie-lights className="group/lights flex items-center gap-2">
          <span className={`${LIGHT_CLASS} bg-red-400/80`}>
            <LightGlyph d="M4.25 4.25l3.5 3.5M7.75 4.25l-3.5 3.5" />
          </span>
          <button
            type="button"
            data-genie-minimize
            aria-label="Minimize window"
            className={`${LIGHT_CLASS} bg-yellow-400/80 outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1`}
          >
            <LightGlyph d="M3.5 6h5" />
          </button>
          <span className={`${LIGHT_CLASS} bg-green-400/80`}>
            <LightGlyph d="M6 3.5v5M3.5 6h5" />
          </span>
        </div>
        <span className="ml-3 font-mono text-xs text-slate-500">
          past_events/
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
        {/* LEFT: file tree */}
        <nav
          aria-label="Past events"
          // Bounded by 100svh on md+ (MinimizeToDock pins this window inside
          // one viewport): 19rem covers the heading, title bar and padding.
          className="max-h-[70vh] overflow-y-auto border-b border-[#E3E8EF] p-4 font-mono text-sm md:max-h-[min(70vh,calc(100svh_-_19rem))] md:border-b-0 md:border-r"
        >
          {groups.map((group) => (
            <div key={group.title} className="mb-5">
              <h3 className="mb-2 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                <ChevronIcon className="h-3 w-3" />
                {group.title}
              </h3>
              <ul className="ml-3 space-y-0.5 border-l border-[#E3E8EF] pl-3">
                {group.items.map((item) => {
                  const isActive = activeId === item.id;
                  const rowClassName = `group relative flex w-full select-none items-center gap-2 rounded-md px-2 py-1.5 text-left outline-none transition-colors before:absolute before:left-0 before:top-1/2 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                    isActive
                      ? "bg-emerald-600/10 text-[#121723] before:bg-emerald-600"
                      : "text-slate-600 before:bg-transparent hover:bg-black/[0.04] hover:text-[#121723]"
                  }`;
                  const rowChildren = (
                    <>
                      <FileIcon
                        className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                          isActive ? "text-emerald-600" : "text-sky-500/70"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </>
                  );
                  return (
                    <li key={item.id}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => handleHover(item)}
                          onFocus={() => handleHover(item)}
                          onClick={() => handleHover(item)}
                          aria-current={isActive ? "true" : undefined}
                          className={rowClassName}
                        >
                          {rowChildren}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onMouseEnter={() => handleHover(item)}
                          onFocus={() => handleHover(item)}
                          onClick={() => handleHover(item)}
                          aria-pressed={isActive}
                          className={rowClassName}
                        >
                          {rowChildren}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* RIGHT: crossfading poster stage */}
        <div className="p-4">
          <div className="group relative aspect-[1659/1779] max-h-[70vh] w-full overflow-hidden rounded-lg bg-[#F3F3F3] ring-1 ring-[#E3E8EF] md:max-h-[min(70vh,calc(100svh_-_19rem))]">
            {([0, 1] as const).map((i) => {
              const item = layers[i];
              return (
                <div
                  key={i}
                  ref={(el) => {
                    layerRefs.current[i] = el;
                  }}
                  className="absolute inset-0"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  {item && (
                    <>
                      <Image
                        src={item.image}
                        alt={item.alt ?? item.caption ?? ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        priority={i === 0}
                      />
                      {item.caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5">
                          <span className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-emerald-400">
                            {item.kicker ?? "Event Poster"}
                          </span>
                          <span className="block font-sans text-2xl font-bold leading-tight text-white">
                            {item.caption}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
