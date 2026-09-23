"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import gsap from "gsap";

import styles from "./about.module.css";

/** Left-to-right flip through the three stars, then settle; plays once on scroll-in. */
export default function AboutStars() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const stars = element.querySelectorAll<HTMLElement>("[data-star]");
    if (!stars.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(stars, { rotateY: 0, scale: 1, y: 0 });
      return;
    }

    gsap.set(stars, {
      rotateY: -90,
      scale: 0.9,
      transformOrigin: "50% 50%",
      transformPerspective: 800,
    });

    let played = false;
    const context = gsap.context(() => undefined, root);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || played) return;
        played = true;
        observer.disconnect();

        context.add(() => {
          const timeline = gsap.timeline();

          // Flip wave left → right (full turn)
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
              },
              index * 0.16,
            );
          });

          // Settle and stay
          timeline.to(stars, {
            rotateY: 360,
            scale: 1,
            y: 0,
            duration: 0.55,
            ease: "elastic.out(1, 0.55)",
            stagger: 0.06,
          });
        });
      },
      { threshold: 0.45 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      context.revert();
    };
  }, []);

  return (
    <div ref={root} className={styles.stars} aria-hidden>
      <img
        src="/images/about-us/star.svg"
        alt=""
        data-star
        className={styles.star}
      />
      <img
        src="/images/about-us/star.svg"
        alt=""
        data-star
        className={styles.star}
      />
      <img
        src="/images/about-us/star.svg"
        alt=""
        data-star
        className={styles.star}
      />
    </div>
  );
}
