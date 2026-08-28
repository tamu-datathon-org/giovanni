"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Sparkles, X } from "lucide-react";

import { announcement } from "./announcement";

interface AnnouncementBannerProps {
  /** Reopen the full modal. */
  onReopen: () => void;
  /** Dismiss for the rest of the session. */
  onDismiss: () => void;
}

const AnnouncementBanner = ({
  onReopen,
  onDismiss,
}: AnnouncementBannerProps) => {
  const pillRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = pillRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width > 0) setPill({ width, height });
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (typeof document === "undefined") return null;

  const size = pill.width * 2;

  return createPortal(
    <div
      role="region"
      aria-label="Announcement"
      className="pointer-events-none fixed inset-x-0 top-[88px] z-40 flex justify-center px-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2"
    >
      <div
        ref={pillRef}
        className="pointer-events-auto relative overflow-hidden rounded-full p-[1.5px] shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
      >
        {size > 0 && (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ transform: `scaleY(${pill.height / pill.width})` }}
          >
            <span
              className="absolute animate-border-spin rounded-full bg-[conic-gradient(from_0deg,#2C41DB_0%,#6EFEEB_50%,#2C41DB_100%)] motion-reduce:animate-none"
              style={{
                width: size,
                height: size,
                left: `calc(50% - ${size / 2}px)`,
                top: `calc(50% - ${size / 2}px)`,
              }}
            />
          </div>
        )}

        <div className="relative flex h-11 items-center gap-1 rounded-full bg-[#171C28]/95 px-1 backdrop-blur-md">
          <button
            type="button"
            onClick={onReopen}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-datalightblue"
          >
            <Sparkles className="h-4 w-4 shrink-0 text-datalightblue" />
            <span className="truncate">{announcement.bannerText}</span>
          </button>

          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss announcement"
            className="rounded-full p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AnnouncementBanner;
