"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { SectionGround } from "@/components/SectionGround";
import { CHIPS } from "./chips";
import { SponsorChip } from "./SponsorChip";

const STAR = "/event_assets/sponsors/Star.png";

function Star() {
  return (
    <Image
      src={STAR}
      alt=""
      width={47}
      height={48}
      draggable={false}
      className="h-[0.7em] w-auto [-webkit-user-drag:none] [user-drag:none]"
    />
  );
}

/**
 * Sponsor chips scattered on the table. Scrolling in flips each chip face-up
 * (in a wave from the top right on desktop), and clicking one spins it.
 */
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
        reducedMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions?.reducedMotion) return;

        const desktop = context.conditions?.desktop;
        const cleanups: (() => void)[] = [];

        gsap.utils.toArray<HTMLElement>("[data-flip]", list).forEach((chip) => {
          const button = chip.closest("button");
          // The side layers turn in lockstep with the chip.
          const targets = [
            chip,
            ...gsap.utils.toArray<HTMLElement>("[data-flip-layer]", button),
          ];

          // Flip end-over-end around the horizontal axis, then land face-up.
          const entrance = gsap.fromTo(
            targets,
            { rotationX: -180 },
            {
              rotationX: 0,
              duration: 0.75,
              delay: desktop ? Number(chip.dataset.flip) * 0.08 : 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: desktop ? list : chip.closest("li"),
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
              spin = gsap
                .timeline()
                .to(targets, { rotationY: 360, duration: 0.85, ease: "power2.out" }, 0)
                .to(targets, { y: -24, duration: 0.3, ease: "power2.out" }, 0)
                .to(targets, { y: 0, duration: 0.55, ease: "bounce.out" }, 0.3);
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
            <Star />
            Sponsors
            <Star />
          </h2>

          <ul
            ref={listRef}
            className="relative mt-8 aspect-[3/4.5] w-full max-w-[1300px] md:mt-12 md:aspect-[3/2]"
          >
            {CHIPS.map((chip) => (
              <SponsorChip key={chip.id} chip={chip} />
            ))}
          </ul>
        </div>
      </SectionGround>
    </section>
  );
}

export default Sponsors;
