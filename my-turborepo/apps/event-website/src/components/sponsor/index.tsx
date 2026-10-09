"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { SectionGround } from "@/components/SectionGround";

const STAR = "/event_assets/sponsors/Star.png";
// The visible side of a chip: copies of its outline stepped down the screen.
const EDGE_DEPTH = 4; // % of the chip's size
const EDGE_LAYERS = Array.from({ length: 10 }, (_, index) => index + 1);
const CHIP_PERSPECTIVE = 1200;

/**
 * The SVG's outer-rim stripes (16 segments, white first, clockwise from 3
 * o'clock). Each side layer only shows a thin sliver at its rim, so stacking
 * them extends every rim stripe straight down, and because the stripes are
 * painted on the chip rather than the screen they stay lined up mid-flip.
 */
const rimStripes = (color: string) =>
  `repeating-conic-gradient(from 90deg, #F1F1F1 0 22.5deg, ${color} 22.5deg 45deg)`;

interface Chip {
  id: string;
  name: string;
  src: string;
  /** Desktop center of the chip, as a percentage of the field's width / height. */
  x: number;
  y: number;
  /** Mobile center (the field is taller and narrower there). */
  mx: number;
  my: number;
  /** Chip colors, matching the SVG; used for the chip back. */
  color: string;
  color2: string;
  rimColor: string;
  /** Chip width as a percentage of the field's width (desktop). */
  size: number;
  rotation: number;
}

/** Hand-scattered so the chips look random but never overlap. */
const CHIPS: Chip[] = [
  {
    id: "heb",
    name: "H-E-B",
    src: "/event_assets/heb.svg",
    x: 73,
    y: 82,
    mx: 32,
    my: 86,
    color: "#E70020",
    color2: "#E70020",
    rimColor: "#B10018",
    size: 22,
    rotation: -12,
  },
  {
    id: "databricks",
    name: "Databricks",
    src: "/event_assets/databricks.svg",
    x: 36,
    y: 17,
    mx: 69,
    my: 18,
    color: "#FF3621",
    color2: "#1B3139",
    rimColor: "#C4281A",
    size: 23,
    rotation: 8,
  },
  {
    id: "qualcomm",
    name: "Qualcomm",
    src: "/event_assets/qualcomm.svg",
    x: 60,
    y: 38,
    mx: 31,
    my: 35,
    color: "#3253DC",
    color2: "#3253DC",
    rimColor: "#233CA0",
    size: 21,
    rotation: -6,
  },
  {
    id: "hitachi",
    name: "Hitachi",
    src: "/event_assets/hitachi.svg",
    x: 86,
    y: 20,
    mx: 71,
    my: 43,
    color: "#E60012",
    color2: "#E60012",
    rimColor: "#AE000D",
    size: 22,
    rotation: 14,
  },
  {
    id: "sec",
    name: "SEC",
    src: "/event_assets/sec.svg",
    x: 13,
    y: 30,
    mx: 30,
    my: 10,
    color: "#1F1F1F",
    color2: "#1F1F1F",
    rimColor: "#000000",
    size: 23,
    rotation: -15,
  },
  {
    id: "conocophillips",
    name: "ConocoPhillips",
    src: "/event_assets/conocophillips.svg",
    x: 47,
    y: 70,
    mx: 69,
    my: 69,
    color: "#E4002B",
    color2: "#1A1A1A",
    rimColor: "#A80020",
    size: 22,
    rotation: 6,
  },
  {
    id: "phillips",
    name: "Phillips 66",
    src: "/event_assets/phillips.svg",
    x: 90,
    y: 56,
    mx: 71,
    my: 91,
    color: "#E31937",
    color2: "#1A1A1A",
    rimColor: "#A8122A",
    size: 21,
    rotation: -9,
  },
  {
    id: "serp",
    name: "SerpApi",
    src: "/event_assets/serp.svg",
    x: 19,
    y: 69,
    mx: 28,
    my: 61,
    color: "#3B4BF0",
    color2: "#161A3A",
    rimColor: "#2A36AF",
    size: 22,
    rotation: 11,
  },
];

/** Distance from the top-right corner (y is scaled to the field's 3:2 shape). */
const FLIP_ORDER = new Map(
  [...CHIPS]
    .sort((p, q) => 100 - p.x + p.y * (2 / 3) - (100 - q.x + q.y * (2 / 3)))
    .map((chip, index) => [chip.id, index]),
);

function Sponsors() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    media.add(
      {
        desktop: "(min-width: 768px)",
        mobile: "(max-width: 767px)",
        reducedMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions?.reducedMotion) return;

        const flips = gsap.utils.toArray<HTMLElement>("[data-flip]", list);
        const desktop = context.conditions?.desktop;
        const cleanups: (() => void)[] = [];

        // Flip end-over-end around the horizontal axis, then land face-up.
        flips.forEach((el) => {
          const button = el.closest("button");
          // The side layers turn in lockstep with the chip.
          const targets = [
            el,
            ...gsap.utils.toArray<HTMLElement>("[data-flip-layer]", button),
          ];

          const entrance = gsap.fromTo(
            targets,
            { rotationX: -180 },
            {
              rotationX: 0,
              duration: 0.75,
              delay: desktop ? Number(el.dataset.flip) * 0.08 : 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: desktop ? list : el.closest("li"),
                start: desktop ? "top 75%" : "top 85%",
                once: true,
              },
            },
          );

          let spin: gsap.core.Timeline | undefined;
          const onClick = () => {
            context.add(() => {
              // Ignore extra taps until the chip lands; never queue up spins.
              if (spin?.isActive()) return;

              // Clicking during the reveal takes over from the entrance animation.
              entrance.progress(1).pause();
              entrance.scrollTrigger?.kill();
              gsap.set(targets, { rotationX: 0, rotationY: 0, y: 0 });
              spin = gsap.timeline();
              spin.to(
                targets,
                {
                  rotationY: 360,
                  duration: 0.85,
                  ease: "power2.out",
                },
                0,
              );
              spin.to(
                targets,
                {
                  y: -24,
                  duration: 0.3,
                  ease: "power2.out",
                },
                0,
              );
              spin.to(
                targets,
                {
                  y: 0,
                  duration: 0.55,
                  ease: "bounce.out",
                },
                0.3,
              );
            });
          };
          button?.addEventListener("click", onClick);
          cleanups.push(() => button?.removeEventListener("click", onClick));
        });

        return () => cleanups.forEach((cleanup) => cleanup());
      },
    );

    return () => media.revert();
  }, []);

  return (
    <section
      id="sponsors"
      aria-label="Sponsors"
      className="relative overflow-x-clip bg-[#6C0204]"
    >
      <SectionGround>
        <div className="flex flex-col items-center px-4 pb-8 pt-14 md:pb-10 md:pt-20">
          <h2 className="font-righteous flex items-center justify-center gap-[0.4em] text-[clamp(42px,7vw,88px)] uppercase leading-none tracking-[0.04em] text-[#FDFBED] [-webkit-text-stroke:0.06em_#FFB24C] [paint-order:stroke_fill]">
            <Image
              src={STAR}
              alt=""
              width={47}
              height={48}
              draggable={false}
              className="h-[0.7em] w-auto [-webkit-user-drag:none] [user-drag:none]"
            />
            Sponsors
            <Image
              src={STAR}
              alt=""
              width={47}
              height={48}
              draggable={false}
              className="h-[0.7em] w-auto [-webkit-user-drag:none] [user-drag:none]"
            />
          </h2>

          <ul
            ref={listRef}
            className="relative mt-8 aspect-[3/4.5] w-full max-w-[1300px] md:mt-12 md:aspect-[3/2]"
          >
            {CHIPS.map((chip) => (
              <li
                key={chip.id}
                // Chips lower on the table sit in front, so a side never covers the chip below it.
                className="absolute left-[var(--mx)] top-[var(--my)] z-[var(--mz)] aspect-square w-[var(--mobile)] -translate-x-1/2 -translate-y-1/2 md:left-[var(--x)] md:top-[var(--y)] md:z-[var(--z)] md:w-[var(--desktop)]"
                style={
                  {
                    "--x": `${chip.x}%`,
                    "--y": `${chip.y}%`,
                    "--mx": `${chip.mx}%`,
                    "--my": `${chip.my}%`,
                    "--z": chip.y,
                    "--mz": chip.my,
                    "--mobile": `${chip.size * 1.5}%`,
                    "--desktop": `${chip.size}%`,
                  } as CSSProperties
                }
              >
                <button
                  type="button"
                  aria-label={`Spin the ${chip.name} sponsor chip`}
                  className="group relative block h-full w-full cursor-pointer rounded-full border-0 bg-transparent p-0 outline-none focus-visible:ring-4 focus-visible:ring-[#FFB24C] focus-visible:ring-offset-4 focus-visible:ring-offset-[#6C0204]"
                >
                  {/* The shadow stays on the table while the chip lifts and flips. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full bg-black/20 blur-[2px]"
                    style={{ transform: `translateY(calc(${EDGE_DEPTH}% + 4px))` }}
                  />
                  <span
                    className="relative block h-full w-full rounded-full transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-2 motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:-translate-y-2 motion-safe:group-focus-visible:scale-105 motion-reduce:transition-none"
                    style={{ perspective: CHIP_PERSPECTIVE }}
                  >
                    {/*
                      The chip's side: copies of the chip's outline that flip in step
                      with it, each pushed straight down the screen. Painted under the
                      chip, so the thickness only ever shows below it, mid-flip too.
                    */}
                    {/* Deepest first, so each layer only peeks out below the one above it. */}
                    {[...EDGE_LAYERS].reverse().map((layer) => {
                      const shade = 0.2 + (layer / EDGE_LAYERS.length) * 0.24;
                      const background = `linear-gradient(rgb(0 0 0 / ${shade}), rgb(0 0 0 / ${shade})), ${rimStripes(chip.color2)}`;
                      return (
                        <span
                          key={layer}
                          aria-hidden
                          className="pointer-events-none absolute inset-0"
                          style={{
                            transform: `translateY(${(layer / EDGE_LAYERS.length) * EDGE_DEPTH}%)`,
                            // Same camera as the chip, so mid-flip outlines match exactly.
                            perspective: CHIP_PERSPECTIVE,
                          }}
                        >
                          <span
                            className="block h-full w-full [transform-style:preserve-3d]"
                            style={{ transform: `rotateZ(${chip.rotation}deg)` }}
                          >
                            <span
                              data-flip-layer
                              className="relative block h-full w-full [--chip-half-depth:8px] [transform-style:preserve-3d]"
                            >
                              {/* Front and back, placed exactly like the faces so the stripes match each rim. */}
                              <span
                                className="absolute inset-0 rounded-full [backface-visibility:hidden] [transform:translateZ(var(--chip-half-depth))]"
                                style={{ background }}
                              />
                              <span
                                className="absolute inset-0 rounded-full [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(var(--chip-half-depth))]"
                                style={{ background }}
                              />
                            </span>
                          </span>
                        </span>
                      );
                    })}
                    {/* Keep the resting faces top-down so the logos stay undistorted. */}
                    <span
                      className="relative block h-full w-full [transform-style:preserve-3d]"
                      style={{ transform: `rotateZ(${chip.rotation}deg)` }}
                    >
                      <span
                        data-flip={FLIP_ORDER.get(chip.id)}
                        className="relative block h-full w-full [--chip-half-depth:8px] [transform-style:preserve-3d]"
                      >
                        {/* Match the artwork's rim and rings on the reverse face. */}
                        <svg
                          aria-hidden
                          viewBox="0 0 270 270"
                          className="absolute inset-0 h-full w-full rounded-full [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(var(--chip-half-depth))]"
                        >
                          <circle cx="135" cy="135" r="135" fill={chip.color} />
                          <circle
                            cx="135"
                            cy="135"
                            r="117.5"
                            fill="none"
                            stroke="#F1F1F1"
                            strokeWidth="35"
                            strokeDasharray="46.142142 46.142142"
                          />
                          <circle
                            cx="135"
                            cy="135"
                            r="117.5"
                            fill="none"
                            stroke={chip.color2}
                            strokeWidth="35"
                            strokeDasharray="46.142142 46.142142"
                            strokeDashoffset="-46.142142"
                          />
                          <circle
                            cx="134.5"
                            cy="134.5"
                            r="86"
                            fill="none"
                            stroke={chip.rimColor}
                            strokeWidth="5"
                          />
                          <circle
                            cx="134.5"
                            cy="134.5"
                            r="86"
                            fill="none"
                            stroke="#F1F1F1"
                            strokeWidth="5"
                            strokeDasharray="40 20"
                          />
                          <circle cx="135" cy="135" r="74.5" fill="white" />
                        </svg>

                        <Image
                          src={chip.src}
                          alt={chip.name}
                          width={270}
                          height={270}
                          draggable={false}
                          className="absolute inset-0 h-full w-full select-none rounded-full [backface-visibility:hidden] [transform:translateZ(var(--chip-half-depth))]"
                        />
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </SectionGround>
    </section>
  );
}

export default Sponsors;
