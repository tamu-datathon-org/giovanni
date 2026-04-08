"use client";

import { type ReactNode, useEffect, useMemo, useRef } from "react";
import clsx from "clsx";

export type CafeMenuBoardItem = {
  id: string;
  label: string;
  subtitle?: string;
  disabled?: boolean;
};

type CafeMenuBoardProps = {
  items: CafeMenuBoardItem[];
  activeId: string;
  onItemClick: (id: string) => void;
  footer?: ReactNode;
};

export default function CafeMenuBoard({
  items,
  activeId,
  onItemClick,
  footer,
}: CafeMenuBoardProps) {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const prevActiveIdRef = useRef<string | null>(null);
  const underlineSelector = useMemo(() => '[data-chalk-underline="true"]', []);

  useEffect(() => {
    void (async () => {
      const { default: gsap } = await import("gsap");

      if (!boardRef.current) return;

      gsap.fromTo(
        boardRef.current,
        { opacity: 0, transformOrigin: "left center" },
        {
          x: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        },
      );
    })();
  }, []);

  useEffect(() => {
    void (async () => {
      const { default: gsap } = await import("gsap");
      if (!boardRef.current) return;

      const getUnderline = (id: string) => {
        return boardRef.current?.querySelector<HTMLSpanElement>(
          `span[data-chalk-underline="true"][data-menu-id="${id}"]`,
        );
      };

      gsap.set(boardRef.current.querySelectorAll(underlineSelector), {
        scaleX: 0,
        opacity: 0.35,
        transformOrigin: "left center",
      });

      const activeUnderline = getUnderline(activeId);
      if (!activeUnderline) return;

      const prevActiveId = prevActiveIdRef.current;
      prevActiveIdRef.current = activeId;

      gsap.killTweensOf(boardRef.current);
      gsap.set(boardRef.current, { scale: 1, opacity: 1 });
      gsap.to(boardRef.current, {
        scale: 1.02,
        duration: 0.18,
        ease: "power2.out",
        transformOrigin: "left top",
      });
      gsap.to(boardRef.current, {
        scale: 1,
        duration: 0.22,
        delay: 0.08,
        ease: "power2.out",
        transformOrigin: "left top",
      });

      if (prevActiveId && prevActiveId !== activeId) {
        const prevUnderline = getUnderline(prevActiveId);
        if (prevUnderline) {
          gsap.to(prevUnderline, {
            scaleX: 0,
            opacity: 0.35,
            duration: 0.18,
            ease: "power2.out",
          });
        }
      }

      gsap.to(activeUnderline, {
        scaleX: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    })();
  }, [activeId, underlineSelector]);

  return (
    <div className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
      <div
        ref={boardRef}
        className="relative w-60 rounded-2xl border-4 border-[#b4d8ee]/40 bg-[#fdf3e3] p-6 text-[#4C321B] shadow-[0_16px_40px_rgba(0,0,0,0.12)] md:w-64"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[calc(1rem-3px)] opacity-10 [background-image:radial-gradient(circle_at_20%_10%,rgba(180,216,238,0.45),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(180,216,238,0.25),transparent_55%)]" />
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[calc(1rem-3px)] opacity-30 mix-blend-multiply"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/></filter><rect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.35\'/></svg>")',
          }}
        />
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-2 overflow-hidden rounded-l-[calc(1rem-3px)] bg-[#b4d8ee]/10" />

        <div className="relative z-10">
          <div className="flex flex-col">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-menu-id={item.id}
                  disabled={item.disabled}
                  onClick={() => onItemClick(item.id)}
                  className={clsx(
                    "group relative flex w-full items-start gap-3 rounded-xl px-2 py-3.5 text-left transition-colors",
                    isActive
                      ? "text-[#4C321B]"
                      : "text-[#8D6E5E] hover:text-[#4C321B]",
                  )}
                >
                  <span
                    className={clsx(
                      "pointer-events-none absolute inset-y-1 left-1.5 right-1.5 rounded-lg bg-[#b4d8ee]/15 opacity-0 transition-opacity",
                      isActive && "opacity-100",
                    )}
                  />

                  <span
                    className={clsx(
                      "relative z-10 mt-2.5 h-2 w-2 rounded-full",
                      isActive ? "bg-[#b4d8ee]" : "bg-[#b4d8ee]/40",
                    )}
                  />

                  <div className="relative z-10 flex flex-col pb-1">
                    <span className="font-darumadrop-one text-lg tracking-wide leading-none">
                      {item.label}
                    </span>

                    {item.subtitle ? (
                      <span
                        className={clsx(
                          "mt-1 text-[11px] uppercase tracking-[0.18em] font-chilanka",
                          isActive ? "text-[#b4d8ee]/70" : "text-[#b4d8ee]/40",
                        )}
                      >
                        {item.subtitle}
                      </span>
                    ) : null}

                    <span
                      className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] origin-left scale-x-0 rounded-full bg-[#b4d8ee] opacity-95"
                      data-chalk-underline="true"
                      data-menu-id={item.id}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {footer ? (
            <div className="mt-3 border-t border-[#b4d8ee]/25 pt-4">{footer}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
