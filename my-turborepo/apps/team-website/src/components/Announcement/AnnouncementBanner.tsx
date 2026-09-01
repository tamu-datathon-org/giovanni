"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Megaphone, X } from "lucide-react";

import { cn } from "~/lib/utils";

const OPEN_DELAY_MS = 120;
const CLOSE_DELAY_MS = 200;

const RoleLabel = ({ label }: { label: string }) => (
  <span className="group/role relative inline-block cursor-default pb-1 text-white/90 transition-colors duration-200 hover:text-white">
    {/* Reserves the bold width so hovering doesn't shift the row. */}
    <span aria-hidden className="block h-0 overflow-hidden font-bold">
      {label}
    </span>

    <span className="font-medium transition-[font-weight] duration-200 group-hover/role:font-bold">
      {label}
    </span>

    <span
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-datalightblue transition-transform duration-300 ease-out group-hover/role:scale-x-100 motion-reduce:transition-none"
    />
  </span>
);

const AnnouncementBanner = ({ onDismiss }: { onDismiss: () => void }) => {
  const [expanded, setExpanded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const openAfter = useCallback((delay: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setExpanded(true), delay);
  }, []);

  const closeAfter = useCallback((delay: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setExpanded(false), delay);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!expanded) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setExpanded(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="region"
      aria-label="Announcement"
      className="pointer-events-none fixed inset-x-0 top-[88px] z-40 flex justify-center px-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2"
    >
      <div
        ref={rootRef}
        onMouseEnter={() => openAfter(OPEN_DELAY_MS)}
        onMouseLeave={() => closeAfter(CLOSE_DELAY_MS)}
        onFocus={() => openAfter(0)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) closeAfter(0);
        }}
        className={cn(
          // Full width on phones: the details row's intrinsic width would
          // otherwise leak up and stretch the collapsed pill to match.
          "pointer-events-auto flex w-full max-w-[calc(100vw-2rem)] flex-wrap overflow-hidden border border-white/10 bg-[#171C28]/95 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[border-radius] duration-300 sm:w-auto sm:flex-nowrap sm:items-center",
          expanded ? "rounded-3xl sm:rounded-full" : "rounded-full",
        )}
      >
        <button
          type="button"
          onClick={() => openAfter(0)}
          aria-expanded={expanded}
          className="order-1 flex h-14 shrink-0 items-center gap-2.5 rounded-full px-5 text-base text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-datalightblue sm:px-6"
        >
          <Megaphone className="h-5 w-5 shrink-0 text-datalightblue" />
          <span className="truncate font-bold text-lg">Now Recruiting Organizers!</span>
        </button>

        <div
          className={cn(
            "order-3 grid basis-full transition-[grid-template-rows,grid-template-columns] duration-300 ease-out motion-reduce:transition-none sm:order-2 sm:basis-auto",
            expanded
              ? "grid-cols-[1fr] grid-rows-[1fr]"
              : "grid-cols-[1fr] grid-rows-[0fr] sm:grid-cols-[0fr] sm:grid-rows-[1fr]",
          )}
        >
          <div className="overflow-hidden">
            <div
              aria-hidden={!expanded}
              className="flex flex-wrap items-center gap-4 whitespace-nowrap px-5 pb-4 pt-1 text-base sm:w-max sm:flex-nowrap sm:px-0 sm:pb-0 sm:pt-0"
            >
              <span
                aria-hidden
                className="hidden h-5 w-px shrink-0 bg-white/10 sm:block"
              />

              <RoleLabel label="Design" />

              <span aria-hidden className="text-white/20">
                ·
              </span>

              <RoleLabel label="Web Development" />

              <span
                aria-hidden
                className="hidden h-5 w-px shrink-0 bg-white/10 sm:block"
              />

              <span className="text-sm text-white/45">Closes Sept 11</span>

              <a
                href="https://forms.gle/qhatGGHSJRNt1Qey6"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={expanded ? undefined : -1}
                className="rounded-full bg-datadarkblue px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-datadarkblue/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-datalightblue focus-visible:ring-offset-2 focus-visible:ring-offset-[#171C28]"
              >
                Apply
              </a>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss announcement"
          className="order-2 mr-1.5 ml-auto flex h-14 w-11 shrink-0 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/5 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/30 sm:order-3 sm:ml-0"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>,
    document.body,
  );
};

export default AnnouncementBanner;
