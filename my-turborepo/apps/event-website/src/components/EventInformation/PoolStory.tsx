"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import styles from "./PoolStory.module.css";

// One right-rail bounce, then a final roll to the left. Coordinates are
// fractions of the play area, with the information arranged around the path.
const POINTS = [
  { x: 0.28, y: 0.1 },
  { x: 0.9, y: 0.48 },
  { x: 0.12, y: 0.96 },
] as const;

const PATH = `M ${POINTS.map(({ x, y }) => `${x * 1000} ${y * 1000}`).join(" L ")}`;

export default function PoolStory({
  titleClassName,
}: {
  titleClassName: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const playArea =
          root.querySelector<HTMLDivElement>("[data-play-area]")!;
        const ball = root.querySelector<HTMLDivElement>("[data-ball]")!;
        const spin = root.querySelector<HTMLDivElement>("[data-spin]")!;
        const cueAxis = root.querySelector<HTMLDivElement>("[data-cue-axis]")!;
        const cue = root.querySelector<HTMLDivElement>("[data-cue]")!;
        const trail = root.querySelector<SVGPathElement>("[data-trail]")!;
        const copy = gsap.utils.toArray<HTMLElement>("[data-copy]", root);
        const impacts = gsap.utils.toArray<HTMLElement>("[data-impact]", root);
        const position = (index: number) => ({
          x: POINTS[index]!.x * playArea.clientWidth,
          y: POINTS[index]!.y * playArea.clientHeight,
        });
        const measureCue = () => {
          const start = position(0);
          const next = position(1);
          gsap.set(cueAxis, {
            rotation:
              Math.atan2(next.y - start.y, next.x - start.x) * (180 / Math.PI),
          });
        };

        measureCue();
        ScrollTrigger.addEventListener("refreshInit", measureCue);
        gsap.set(copy, { opacity: 0, y: 32 });
        gsap.set(ball, { xPercent: -50, yPercent: -50 });
        gsap.set(impacts, { opacity: 0, scale: 0.5 });
        gsap.set(trail, {
          attr: { "stroke-dasharray": 1, "stroke-dashoffset": 1 },
        });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: playArea,
            start: "top 75%",
            end: "clamp(bottom 45%)",
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        });

        // The cue's right end is its tip. Pull back along its rotated axis,
        // strike the edge of the ball, then withdraw as the ball rolls away.
        timeline
          .fromTo(
            cue,
            { x: -16 },
            { x: -90, duration: 0.075, ease: "power1.inOut" },
            0,
          )
          .to(cue, { x: 0, duration: 0.025, ease: "power3.in" }, 0.075)
          .to(cue, { x: -30, opacity: 0, duration: 0.08 }, 0.105)
          // All the information is fully revealed by the single bounce.
          .to(
            copy,
            { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" },
            POINTS[1].y - 0.16,
          );

        let distance = 0;
        const segmentLengths = POINTS.slice(1).map((point, i) =>
          Math.hypot(point.x - POINTS[i]!.x, point.y - POINTS[i]!.y),
        );
        const totalLength = segmentLengths.reduce(
          (sum, length) => sum + length,
          0,
        );

        POINTS.slice(1).forEach((point, i) => {
          const previous = POINTS[i]!;
          const start = previous.y;
          const duration = point.y - previous.y;
          const ease = i === 0 ? "none" : "power1.out";
          const direction = point.x > previous.x ? 1 : -1;
          const rotation = () => {
            const from = position(i);
            const to = position(i + 1);
            return `+=${
              ((direction * Math.hypot(to.x - from.x, to.y - from.y)) /
                (Math.PI * ball.clientWidth)) *
              360
            }`;
          };

          timeline.fromTo(
            ball,
            {
              x: () => position(i).x,
              y: () => position(i).y,
            },
            {
              x: () => position(i + 1).x,
              y: () => position(i + 1).y,
              duration,
              ease,
              immediateRender: i === 0,
            },
            start,
          );
          timeline.to(spin, { rotation, duration, ease }, start);
          distance += segmentLengths[i]!;
          timeline.to(
            trail,
            {
              attr: { "stroke-dashoffset": 1 - distance / totalLength },
              duration,
              ease,
            },
            start,
          );

          if (i === 0) {
            // A small compression and a ripple make the change of direction
            // read as a cushion bounce. Text remains readable once revealed.
            timeline
              .to(
                spin,
                { scaleX: 0.84, scaleY: 1.12, duration: 0.012 },
                point.y - 0.012,
              )
              .to(
                spin,
                { scaleX: 1, scaleY: 1, duration: 0.025, ease: "power2.out" },
                point.y,
              )
              .fromTo(
                impacts[i]!,
                { opacity: 0.65, scale: 0.5 },
                {
                  opacity: 0,
                  scale: 2.4,
                  duration: 0.08,
                  immediateRender: false,
                },
                point.y,
              );
          }
        });

        // Let the ball settle at the end of the leftward roll.
        timeline.to({}, { duration: 0.04 }, POINTS[2].y);
        let disposed = false;
        void document.fonts.ready.then(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
        return () => {
          disposed = true;
          ScrollTrigger.removeEventListener("refreshInit", measureCue);
        };
      },
      root,
    );

    return () => media.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.story}>
      <div data-play-area className={styles.art} aria-hidden="true">
        <svg
          className={styles.path}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d={PATH}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 12"
            vectorEffect="non-scaling-stroke"
            opacity="0.2"
          />
          <path
            data-trail
            d={PATH}
            pathLength="1"
            stroke="currentColor"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            opacity="0.45"
          />
        </svg>
        <div data-cue-axis className={styles.cueAxis}>
          <div data-cue className={styles.cue}>
            <Image
              src="/event_assets/poolstick.svg"
              alt=""
              width={935}
              height={40}
              className={styles.cueImage}
            />
          </div>
        </div>
        {POINTS.slice(1, 2).map((point, i) => (
          <div
            key={i}
            className={styles.contact}
            style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}
          >
            <span className={styles.rail} />
            <span data-impact className={styles.impact} />
          </div>
        ))}
        <div data-ball className={styles.ball}>
          <div data-spin className={styles.spin}>
            <Image
              src="/event_assets/eightball.svg"
              alt=""
              width={194}
              height={229}
              className={styles.ballImage}
            />
          </div>
        </div>
      </div>

      <article className={`${styles.information} ${styles.about}`}>
        <div data-copy>
          <h3 className={`${titleClassName} ${styles.title}`}>
            WHAT IS DATATHON?
          </h3>
          <p className={styles.description}>
            We are the largest data science and machine learning focused
            hackathon in Texas located at Texas A&amp;M University in College
            Station.
          </p>
        </div>
      </article>
      <article className={`${styles.information} ${styles.location}`}>
        <div data-copy>
          <h3 className={`${titleClassName} ${styles.title}`}>LOCATION</h3>
          <p className={styles.description}>
            Where: MSC 2300
            <br />
            When: November 7-8
          </p>
        </div>
      </article>
      <article className={`${styles.information} ${styles.parking}`}>
        <div data-copy>
          <h3 className={`${titleClassName} ${styles.title}`}>PARKING</h3>
          <p className={styles.description}>
            Lot 74 is reserved for Datathon participants. Lots 100 and 97 are
            also free on weekends.
          </p>
        </div>
      </article>
    </div>
  );
}
