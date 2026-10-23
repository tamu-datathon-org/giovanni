import type { RefObject } from "react";
import { useLayoutEffect } from "react";
import gsap from "gsap";

import styles from "./application.module.css";

/**
 * Page-load entrance for the application: header text rises in, the star rows
 * do the same left-to-right flip as the About Us stars, and the panel lifts
 * into place.
 */
export function useApplicationEntrance(
  root: RefObject<HTMLElement | null>,
  ready: boolean,
) {
  // Layout effect so the hidden starting state is applied before first paint.
  useLayoutEffect(() => {
    const element = root.current;
    if (!ready || !element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const q = gsap.utils.selector(element);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out", clearProps: "all" },
      });

      timeline
        .from(q(`.${styles.backLink}`), { autoAlpha: 0, x: -16, duration: 0.4 })
        .from(q(`.${styles.title}`), { autoAlpha: 0, y: 28, duration: 0.6 }, 0.1)
        .from(
          q(`.${styles.description}`),
          { autoAlpha: 0, y: 18, duration: 0.6 },
          0.22,
        )
        .from(
          q(`.${styles.starsLeft}, .${styles.starsRight}`),
          { autoAlpha: 0, duration: 0.3 },
          0.2,
        );

      flipStars(timeline, q(`.${styles.starsLeft} [data-star]`), 0.25);
      flipStars(timeline, q(`.${styles.starsRight} [data-star]`), 0.4);

      timeline.from(
        q(`.${styles.panel}`),
        { autoAlpha: 0, y: 48, duration: 0.7 },
        0.35,
      );
      flipStars(timeline, q(`.${styles.whiteStars} [data-star]`), 0.8);
    }, element);

    return () => context.revert();
  }, [root, ready]);
}

/** Left-to-right flip wave that settles with a bounce, as in AboutStars. */
function flipStars(
  timeline: gsap.core.Timeline,
  stars: Element[],
  start: number,
) {
  if (!stars.length) return;

  gsap.set(stars, { transformOrigin: "50% 50%", transformPerspective: 800 });
  stars.forEach((star, index) => {
    timeline.fromTo(
      star,
      { rotateY: -90, scale: 0.88, y: 4 },
      {
        rotateY: 360,
        scale: 1.18,
        y: -6,
        duration: 0.55,
        ease: "power2.out",
        clearProps: "",
      },
      start + index * 0.16,
    );
  });
  timeline.to(
    stars,
    {
      rotateY: 360,
      scale: 1,
      y: 0,
      duration: 0.55,
      ease: "elastic.out(1, 0.55)",
      stagger: 0.06,
    },
    start + (stars.length - 1) * 0.16 + 0.55,
  );
}
