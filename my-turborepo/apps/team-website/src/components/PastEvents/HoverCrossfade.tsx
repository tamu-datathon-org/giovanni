"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import gsap from "gsap";

export interface HoverCrossfadeItem {
  id: string;
  label: string;
  image: StaticImageData | string;
  alt?: string;
  caption?: string;
  kicker?: string; // small label above the caption, e.g. "Event Poster"
  url?: string;
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
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
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
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 1.5h5L12.5 5v9.5h-9v-13z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M9 1.5V5h3.5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
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
  const [activeId, setActiveId] = useState<string | null>(allItems[0]?.id ?? null);

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
          "(prefers-reduced-motion: reduce)"
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
    [activeId, duration]
  );

  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#0d1526] shadow-2xl ${
        className ?? ""
      }`}
    >
      {/* Editor title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-green-400/80" />
        <span className="ml-3 font-mono text-xs text-slate-500">
          past_events/
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr]">
        {/* LEFT: file tree */}
        <nav
          aria-label="Past events"
          className="max-h-[70vh] overflow-y-auto border-b border-white/10 p-4 font-mono text-sm md:border-b-0 md:border-r"
        >
          {groups.map((group) => (
            <div key={group.title} className="mb-5">
              <h3 className="mb-2 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                <ChevronIcon className="h-3 w-3" />
                {group.title}
              </h3>
              <ul className="ml-3 space-y-0.5 border-l border-white/10 pl-3">
                {group.items.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.url ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => handleHover(item)}
                        onFocus={() => handleHover(item)}
                        aria-current={isActive ? "true" : undefined}
                        className={`group relative flex w-full select-none items-center gap-2 rounded-md px-2 py-1.5 text-left outline-none transition-colors before:absolute before:left-0 before:top-1/2 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                          isActive
                              ? "bg-emerald-400/15 text-white before:bg-emerald-400"
                              : "text-slate-400 before:bg-transparent hover:bg-white/5 hover:text-slate-200"
                        }`}
                      >
                        <FileIcon
                        className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                            isActive ? "text-emerald-400" : "text-sky-400/60"
                        }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* RIGHT: crossfading poster stage */}
        <div className="p-4">
          <div className="group relative mx-auto my-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg bg-slate-950 ring-1 ring-white/10">
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
                        sizes="(max-width: 768px) 100vw, 50vw"
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