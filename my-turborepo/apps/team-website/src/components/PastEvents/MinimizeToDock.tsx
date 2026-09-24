"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { inter } from "~/app/_components/fonts";
import { Noise } from "~/components/shared/Noise";
import { refreshOnLayoutShift } from "~/lib/scroll-trigger-refresh";
import folderClosed from "../../../public/assets/images/icons8-mac-folder-96.png";
import folderOpen from "../../../public/assets/images/icons8-opened-folder-96.png";
import styles from "./past-events.module.css";

gsap.registerPlugin(ScrollTrigger);

// Keep in sync with the media block in past-events.module.css, which makes
// the frame sticky for exactly this mode.
const FULL_MOTION =
  "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const LITE_MOTION =
  "(max-width: 767px) and (prefers-reduced-motion: no-preference), (pointer: coarse) and (prefers-reduced-motion: no-preference)";

// Arrow tip inside the cursor's 28×28 box — the point that has to land on the button.
const HOTSPOT = { x: 6, y: 3 };

function CursorArrow() {
  return (
    <svg viewBox="0 0 28 28" className="h-full w-full" aria-hidden="true">
      <path
        d="M6 3v19.2l4.6-4.4 2.9 6.7 3.1-1.4-2.9-6.6H20L6 3z"
        fill="#000"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface MinimizeToDockProps {
  children: ReactNode;
  className?: string;
}

/**
 * Past Events shell. The pinned `frame` covers the full viewport (bg, noise,
 * a frozen copy of AboutUs's bridging splotch, and the content), so nothing
 * behind it can be seen moving while the section is pinned — only the
 * scripted cursor, the minimizing window and the folder icon move.
 *
 * While pinned, a scripted cursor clicks the window's yellow button, the
 * window shrinks into a folder icon at the bottom-right (which opens to
 * receive it and closes behind it), and the frame fades out to reveal Meet
 * the Team underneath, so the pin releases without a seam. Meet the Team is
 * pulled up under the frame's final stuck position (`.shell` in
 * past-events.module.css), so it is already in place when the fade ends.
 *
 * Children are looked up by data attributes (see HoverCrossfade):
 * `data-genie-window`, `data-genie-lights`, `data-genie-minimize`, and
 * `data-genie-heading` on the section heading.
 */
export default function MinimizeToDock({
  children,
  className,
}: MinimizeToDockProps) {
  const shellRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);
  const folderWrapRef = useRef<HTMLDivElement>(null);
  const folderIconRef = useRef<HTMLDivElement>(null);
  const folderClosedRef = useRef<HTMLImageElement>(null);
  const folderOpenRef = useRef<HTMLImageElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const shell = shellRef.current;
      const frame = frameRef.current;
      const grid = gridRef.current;
      const noise = noiseRef.current;
      const folderWrap = folderWrapRef.current;
      const folderIcon = folderIconRef.current;
      const folderClosedImg = folderClosedRef.current;
      const folderOpenImg = folderOpenRef.current;
      const cursor = cursorRef.current;
      const hint = hintRef.current;
      if (
        !shell ||
        !frame ||
        !grid ||
        !noise ||
        !folderWrap ||
        !folderIcon ||
        !folderClosedImg ||
        !folderOpenImg ||
        !cursor ||
        !hint
      ) {
        return;
      }

      const jumpToTeam = () =>
        document.getElementById("team")?.scrollIntoView();
      // Swapped per motion mode below; reduced motion keeps the plain jump.
      let onMinimize = jumpToTeam;
      const onClick = (event: MouseEvent) => {
        if (
          event.target instanceof Element &&
          event.target.closest("[data-genie-minimize]")
        ) {
          onMinimize();
        }
      };
      shell.addEventListener("click", onClick);

      const mm = gsap.matchMedia();

      mm.add(FULL_MOTION, () => {
        const windowEl = frame.querySelector<HTMLElement>(
          "[data-genie-window]",
        );
        const lights = frame.querySelector<HTMLElement>("[data-genie-lights]");
        const minimize = frame.querySelector<HTMLElement>(
          "[data-genie-minimize]",
        );
        const heading = frame.querySelector<HTMLElement>(
          "[data-genie-heading]",
        );
        if (!windowEl || !lights || !minimize) return;

        const cursorPath = { fromX: 0, fromY: 0, toX: 0, toY: 0 };
        // Window-center → folder-center delta and the scale that shrinks the
        // window down to the folder's footprint. Plain transform, no clones.
        const shrink = { x: 0, y: 0, scale: 1 };

        gsap.set(windowEl, { transformOrigin: "50% 50%" });

        // Everything is measured relative to the frame, which stays valid
        // wherever the sticky frame currently sits. refreshInit fires before
        // ScrollTrigger reverts the timeline, so a refresh mid-section would
        // otherwise read the already-shrunk window. The window, its minimize
        // button and folderIcon all get transformed, so their *layout*
        // offsets (which transforms don't affect) are used instead of their
        // rendered rects. folderWrap only ever gets an opacity tween (never a
        // transform), so its rect is safe to read directly.
        const measure = () => {
          const origin = frame.getBoundingClientRect();
          const rel = (el: Element) => {
            const r = el.getBoundingClientRect();
            return {
              x: r.left - origin.left,
              y: r.top - origin.top,
              w: r.width,
              h: r.height,
            };
          };
          const layoutRel = (el: HTMLElement) => {
            let x = 0;
            let y = 0;
            let node: Element | null = el;
            while (node instanceof HTMLElement && node !== frame) {
              x += node.offsetLeft;
              y += node.offsetTop;
              node = node.offsetParent;
            }
            return { x, y, w: el.offsetWidth, h: el.offsetHeight };
          };

          const win = layoutRel(windowEl);
          const wrap = rel(folderWrap);
          const folderCx =
            wrap.x + folderIcon.offsetLeft + folderIcon.offsetWidth / 2;
          const folderCy =
            wrap.y + folderIcon.offsetTop + folderIcon.offsetHeight / 2;

          shrink.x = folderCx - (win.x + win.w / 2);
          shrink.y = folderCy - (win.y + win.h / 2);
          shrink.scale = (folderIcon.offsetWidth * 0.6) / win.w;

          const button = layoutRel(minimize);
          cursorPath.fromX = origin.width + 16;
          cursorPath.fromY = win.y + win.h * 0.55;
          cursorPath.toX = button.x + button.w / 2 - HOTSPOT.x;
          cursorPath.toY = button.y + button.h / 2 - HOTSPOT.y;
        };

        measure();
        // refreshInit fires before invalidateOnRefresh re-reads the
        // function-based values below, so they always see fresh geometry.
        ScrollTrigger.addEventListener("refreshInit", measure);

        gsap.set(cursor, { transformOrigin: `${HOTSPOT.x}px ${HOTSPOT.y}px` });

        // fromTo everywhere with immediateRender off: invalidateOnRefresh
        // re-records a `to` tween's start from wherever the element happens to
        // sit at refresh time, while explicit from-vars survive (see Photos).
        const tl = gsap.timeline({
          defaults: { ease: "none", immediateRender: false },
          scrollTrigger: {
            // No ScrollTrigger pin: the frame is `position: sticky` inside a
            // 220svh shell (past-events.module.css), so it sticks for the
            // shell's extra 120svh. The browser composites sticky, so the
            // frame can't lag a frame behind the scroll the way a
            // main-thread transform pin does, and it stays in flow, so it
            // follows the sidebar's padding when that collapses.
            // Top-anchored: the frame — one viewport tall and fully opaque —
            // covers the whole screen for the entire scrub, so nothing behind
            // it (AboutUs, the page background) can show through or move.
            trigger: shell,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            // The shrink only needs transform + opacity, which the browser
            // can composite without ever touching layout or paint.
            onToggle: (self) => {
              windowEl.style.willChange = self.isActive
                ? "transform, opacity"
                : "";
            },
          },
        });

        tl
          // Folder pops in bottom-right while the cursor comes in from the
          // right edge. Cursor x/y use different eases so the path arcs
          // instead of sliding straight.
          .fromTo(
            folderWrap,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.14 },
            0.04,
          )
          .fromTo(
            folderIcon,
            { scale: 0.6 },
            { scale: 1, duration: 0.14, ease: "back.out(1.7)" },
            0.04,
          )
          // Visibility gets its own tween: a property only in the from-vars
          // is a one-off startAt that GSAP reverts on rewind but never
          // re-applies, so the cursor stayed hidden on every pass after the
          // first.
          .fromTo(
            cursor,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.02 },
            0.06,
          )
          .fromTo(
            cursor,
            { x: () => cursorPath.fromX },
            { x: () => cursorPath.toX, duration: 0.28, ease: "power3.out" },
            0.06,
          )
          .fromTo(
            cursor,
            { y: () => cursorPath.fromY },
            { y: () => cursorPath.toY, duration: 0.28, ease: "sine.inOut" },
            0.06,
          )
          // Hover: the traffic lights show their glyphs, and the scroll hint
          // steps aside now that the scroll is visibly doing something.
          .fromTo(
            lights,
            { "--lights-hover": 0 },
            { "--lights-hover": 1, duration: 0.05 },
            0.3,
          )
          // 0.75 is .scrollHint's resting opacity (the bear hint's).
          .fromTo(
            hint,
            { autoAlpha: 0.75 },
            { autoAlpha: 0, duration: 0.06 },
            0.3,
          )
          // Click: press and release.
          .fromTo(
            cursor,
            { scale: 1 },
            { scale: 0.86, duration: 0.03, ease: "power2.in" },
            0.37,
          )
          .fromTo(
            minimize,
            { filter: "brightness(1)" },
            { filter: "brightness(0.72)", duration: 0.03 },
            0.37,
          )
          .fromTo(
            cursor,
            { scale: 0.86 },
            { scale: 1, duration: 0.03, ease: "power2.out" },
            0.4,
          )
          .fromTo(
            minimize,
            { filter: "brightness(0.72)" },
            { filter: "brightness(1)", duration: 0.03 },
            0.4,
          )
          // Plain minimize: the real window shrinks and slides into the
          // folder, then fades as it lands. Transform + opacity only —
          // compositor-only, no clones, no per-frame layout work.
          .fromTo(
            windowEl,
            { x: 0, y: 0, scale: 1 },
            {
              x: () => shrink.x,
              y: () => shrink.y,
              scale: () => shrink.scale,
              duration: 0.3,
              ease: "power2.in",
            },
            0.43,
          )
          .fromTo(
            windowEl,
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.08 },
            0.65,
          )
          .fromTo(
            cursor,
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.1 },
            0.5,
          )
          // The folder opens as the window arrives...
          .fromTo(
            folderClosedImg,
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.02 },
            0.52,
          )
          .fromTo(
            folderOpenImg,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.02 },
            0.52,
          )
          // ...then closes behind it with a little bounce.
          .fromTo(
            folderOpenImg,
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.02 },
            0.74,
          )
          .fromTo(
            folderClosedImg,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.02 },
            0.74,
          )
          .fromTo(
            folderIcon,
            { scale: 1 },
            { scale: 1.12, duration: 0.03, ease: "power2.out" },
            0.74,
          )
          .fromTo(
            folderIcon,
            { scale: 1.12 },
            { scale: 1, duration: 0.06, ease: "bounce.out" },
            0.77,
          )
          // Fade the whole frame out to reveal Meet the Team underneath —
          // the fixed grid behind it lines up with AboutTeam's own, so the
          // hand-off has no seam. autoAlpha hides the faded frame so it stops
          // swallowing clicks and wheel pans meant for the bubbles below.
          .fromTo(
            frame,
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.16 },
            0.84,
          )
          .fromTo(grid, { opacity: 0 }, { opacity: 0.1, duration: 0.1 }, 0.9)
          .fromTo(
            folderWrap,
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.12 },
            0.86,
          );
        if (heading) {
          tl.fromTo(
            heading,
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.1 },
            0.82,
          );
        }

        onMinimize = () => {
          const end = tl.scrollTrigger?.end;
          if (end !== undefined)
            window.scrollTo({ top: end, behavior: "smooth" });
        };

        // Watch the shell, not the sticky frame: the frame's page offset
        // changes while it sticks, which would read as a layout shift.
        const stopRefreshing = refreshOnLayoutShift(shell);

        return () => {
          stopRefreshing();
          ScrollTrigger.removeEventListener("refreshInit", measure);
          windowEl.style.willChange = "";
          onMinimize = jumpToTeam;
        };
      });

      // Touch and small screens: no pin, no cursor — the window just fades as
      // the section leaves and the frame fades to reveal Meet the Team.
      mm.add(LITE_MOTION, () => {
        const windowEl = frame.querySelector<HTMLElement>(
          "[data-genie-window]",
        );
        if (!windowEl) return;

        gsap
          .timeline({
            defaults: { ease: "none", immediateRender: false },
            scrollTrigger: {
              trigger: shell,
              start: "bottom 70%",
              end: "bottom 20%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            windowEl,
            { autoAlpha: 1, scale: 1, y: 0 },
            {
              autoAlpha: 0,
              scale: 0.94,
              y: 24,
              duration: 0.7,
              ease: "power1.in",
            },
            0,
          )
          .fromTo(
            frame,
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.6 },
            0.4,
          );

        return refreshOnLayoutShift(shell);
      });

      return () => shell.removeEventListener("click", onClick);
    },
    { scope: shellRef },
  );

  return (
    <main
      ref={shellRef}
      className={`${className ?? ""} ${styles.shell} relative overflow-x-clip bg-[#e9f6ff]`}
    >
      {/* Same fixed grid as AboutTeam's stage; faded in as `frame` fades out
          so the hand-off between the two sections has no seam. */}
      <div
        ref={gridRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background: "url('/images/team/grid.png') repeat",
          backgroundAttachment: "fixed",
        }}
      />

      {/* The sticky, full-bleed frame. z-[2] sits above AboutUs (z-index 1),
          so its own bg/noise/splotch replace what AboutUs would otherwise
          paint over this area (see about.module.css .splotchesRightShell) —
          nothing behind the frame can be seen moving while it's stuck. */}
      <div
        ref={frameRef}
        className={`${styles.frame} z-[2] overflow-hidden bg-[#377BB0] px-6 pb-16 pt-4 md:flex md:h-svh md:flex-col md:justify-center md:pb-6`}
      >
        <div
          ref={noiseRef}
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <Noise />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/about-us/splotches.svg"
          alt=""
          aria-hidden
          width={641}
          height={650}
          className={styles.splotchOverhang}
        />

        <div className="relative z-10 mx-auto w-full max-w-5xl">{children}</div>

        <p
          ref={hintRef}
          aria-hidden
          className={`${styles.scrollHint} ${inter.className}`}
        >
          SCROLL TO CONTINUE
        </p>

        <div
          ref={folderWrapRef}
          aria-hidden
          // Same inset from the bottom and right. @vanni/ui's ScrollToTop
          // (fixed bottom-8 right-8) only shows at the very bottom of the
          // page, so it never covers the folder while this section is stuck.
          className="pointer-events-none invisible absolute bottom-6 right-6 z-20 hidden opacity-0 md:block"
        >
          <div ref={folderIconRef} className="relative h-16 w-16">
            <Image
              ref={folderClosedRef}
              src={folderClosed}
              alt=""
              fill
              sizes="64px"
              className="object-contain"
            />
            <Image
              ref={folderOpenRef}
              src={folderOpen}
              alt=""
              fill
              sizes="64px"
              className="object-contain opacity-0"
            />
          </div>
        </div>

        <div
          ref={cursorRef}
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 z-30 h-7 w-7 drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
        >
          <CursorArrow />
        </div>
      </div>
    </main>
  );
}
