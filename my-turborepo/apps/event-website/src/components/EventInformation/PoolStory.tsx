"use client";

import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const INFORMATION =
  "absolute z-[3] min-w-0 -translate-y-1/2 text-center motion-reduce:static motion-reduce:mx-auto motion-reduce:!w-[min(100%,800px)] motion-reduce:transform-none [@media(scripting:none)]:static [@media(scripting:none)]:mx-auto [@media(scripting:none)]:!w-[min(100%,800px)] [@media(scripting:none)]:transform-none";
const TITLE =
  "mb-3 font-sekuya text-balance text-[clamp(22px,2.9vw,40px)] leading-none text-[#ffb24c] md:mb-[18px]";
const DESCRIPTION =
  "font-righteous text-pretty text-[clamp(17px,2.1vw,29px)] leading-none text-[#fdfbed] [text-shadow:0_4px_4px_#00000040]";

// One right-rail bounce, then a final roll to the left. Coordinates are
// fractions of the play area, with the information arranged around the path.
const POINTS = [
  { x: 0.28, y: 0.17 },
  { x: 0.9, y: 0.48 },
  { x: 0.12, y: 0.96 },
] as const;

const PATH = `M ${POINTS.map(({ x, y }) => `${x * 1000} ${y * 1000}`).join(" L ")}`;
const SHOT_AT = 0.24;

/**
 * The event details laid out around an eight ball's path. Scrolling draws the
 * cue back and strikes, the ball banks off the right rail as the details fade
 * in, then rolls on (off the left wall if it reaches it) until it passes
 * behind `borderRef`, flashing the rail's stars. With reduced motion or no
 * JavaScript, the details simply stack.
 */
export function PoolStory({
  borderRef,
}: {
  borderRef: RefObject<HTMLDivElement | null>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  // A passive effect, so the border (rendered after this story) has its ref.
  useEffect(() => {
    const root = rootRef.current;
    const border = borderRef.current;
    if (!root || !border) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add(
      "(prefers-reduced-motion: no-preference)",
      (_context, contextSafe) => {
        // Tweens started later from scroll callbacks still belong to this
        // context, so media.revert() stops and undoes them too.
        const safe = <T extends () => void>(fn: T) =>
          contextSafe ? (contextSafe(fn) as T) : fn;

        const playArea = root.querySelector<HTMLDivElement>("[data-play-area]");
        const ball = root.querySelector<HTMLDivElement>("[data-ball]");
        const spin = root.querySelector<HTMLDivElement>("[data-spin]");
        // The exit spins the artwork inside the spin wrapper, so it never
        // fights the main timeline's rotation of the wrapper itself.
        const roll = spin?.querySelector("img");
        const cueAxis = root.querySelector<HTMLDivElement>("[data-cue-axis]");
        const cue = root.querySelector<HTMLDivElement>("[data-cue]");
        const trail = root.querySelector<SVGPathElement>("[data-trail]");
        const flash = border.querySelector<SVGEllipseElement>(
          "[data-border-flash]",
        );
        if (
          !playArea ||
          !ball ||
          !spin ||
          !roll ||
          !cueAxis ||
          !cue ||
          !trail ||
          !flash
        ) {
          return;
        }
        const copy = gsap.utils.toArray<HTMLElement>("[data-copy]", root);
        const impacts = gsap.utils.toArray<HTMLElement>("[data-impact]", root);
        const position = (index: number) => ({
          x: POINTS[index].x * playArea.clientWidth,
          y: POINTS[index].y * playArea.clientHeight,
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

        // The trail is redrawn from the corners the ball has passed to where
        // the ball actually is, so it never runs ahead or falls behind.
        // exitCorners is filled in by the roll off to the rail below.
        let exitCorners: { x: number; y: number }[] = [];
        const drawTrail = () => {
          const time = timeline.time();
          const corners: { x: number; y: number }[] = [];
          if (time > SHOT_AT) {
            corners.push(position(0));
            if (time > POINTS[1].y) corners.push(position(1));
            corners.push(...exitCorners, {
              x: gsap.getProperty(ball, "x") as number,
              y: gsap.getProperty(ball, "y") as number,
            });
          }

          // Stop the line a little behind the ball, measured back along the
          // path so the gap holds around corners.
          let gap = ball.clientWidth * 2.5;
          while (corners.length > 1 && gap > 0) {
            const end = corners[corners.length - 1];
            const previous = corners[corners.length - 2];
            const length = Math.hypot(end.x - previous.x, end.y - previous.y);
            if (length > gap) {
              const keep = (length - gap) / length;
              corners[corners.length - 1] = {
                x: previous.x + (end.x - previous.x) * keep,
                y: previous.y + (end.y - previous.y) * keep,
              };
              break;
            }
            corners.pop();
            gap -= length;
          }
          trail.setAttribute(
            "d",
            corners.length > 1
              ? `M ${corners.map(({ x, y }) => `${x} ${y}`).join(" L ")}`
              : "",
          );
        };

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: drawTrail,
          scrollTrigger: {
            trigger: playArea,
            start: "top 75%",
            end: "clamp(bottom 45%)",
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
        });

        // A longer draw and a brief hold make the wind-up deliberate. The
        // ball stays still until the fast strike finishes at SHOT_AT.
        timeline
          .fromTo(
            cue,
            { x: -16 },
            {
              x: () => -gsap.utils.clamp(128, 240, playArea.clientWidth * 0.2),
              duration: 0.17,
              ease: "power2.inOut",
            },
            0,
          )
          .to(
            cue,
            { x: 0, duration: 0.035, ease: "power3.in" },
            SHOT_AT - 0.035,
          )
          .to(cue, { x: -40, duration: 0.08 }, SHOT_AT + 0.005)
          // All the information is fully revealed by the single bounce.
          .to(
            copy,
            { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" },
            POINTS[1].y - 0.16,
          );

        POINTS.slice(1).forEach((point, i) => {
          const previous = POINTS[i];
          const start = i === 0 ? SHOT_AT : previous.y;
          const duration = point.y - start;
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
              immediateRender: i === 0,
            },
            start,
          );
          timeline.to(spin, { rotation, duration }, start);

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
                impacts[i],
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

        // Once the story finishes, the ball keeps rolling along its last
        // diagonal, banking off the left edge if it reaches it, until it
        // passes behind the rail below the section. The rail's stars ripple
        // outward as it crosses the line.
        const stars = gsap.utils.toArray<SVGGElement>(
          "[data-border-star]",
          border,
        );
        const glows = gsap.utils.toArray<SVGGElement>(
          "[data-border-star-glow]",
          border,
        );
        // The exit starts where the story's scroll range ends.
        const mainStart = () => timeline.scrollTrigger?.start ?? 0;
        const mainEnd = () => timeline.scrollTrigger?.end ?? 0;
        const last = POINTS.length - 1;
        // Offsets from the play area, so they hold at any scroll position.
        const below = (edge: "top" | "bottom") =>
          border.getBoundingClientRect()[edge] -
          playArea.getBoundingClientRect().top;
        const exitY = () => below("bottom") + ball.clientHeight;
        // Measured on refresh: the last leg's heading, the left wall for the
        // ball's center, and where along the exit it banks and passes behind
        // the rail.
        const path = { x: 0, y: 0, ux: 0, uy: 1, wall: 0, bank: Infinity };
        const exitState = { traveled: 0 };
        let lineDistance = Infinity;
        let passed = false;
        let banked = false;

        const measureExit = () => {
          const from = position(last - 1);
          const to = position(last);
          const length = Math.hypot(to.x - from.x, to.y - from.y);
          path.x = to.x;
          path.y = to.y;
          path.ux = (to.x - from.x) / length;
          path.uy = (to.y - from.y) / length;
          path.wall =
            border.getBoundingClientRect().left -
            playArea.getBoundingClientRect().left +
            ball.clientWidth / 2;
          path.bank = path.ux < 0 ? (path.wall - path.x) / path.ux : Infinity;
          lineDistance = (below("top") - path.y) / path.uy;
        };

        const flashRail = safe(() => {
          const rail = border.getBoundingClientRect();
          const ballBox = ball.getBoundingClientRect();
          const ballX = ballBox.left + ballBox.width / 2;
          const offsets = stars.map((star) => {
            const box = star.getBoundingClientRect();
            return Math.abs(box.left + box.width / 2 - ballX);
          });
          const stagger = {
            each: 0.06,
            from: offsets.indexOf(Math.min(...offsets)),
          };

          gsap.set(flash, {
            attr: { cx: ((ballX - rail.left) / rail.width) * 1440 },
          });
          gsap.fromTo(
            flash,
            { opacity: 0.95 },
            { opacity: 0, duration: 0.9, ease: "power2.out", overwrite: true },
          );
          gsap.fromTo(
            stars,
            { scale: 1 },
            {
              scale: 1.7,
              transformOrigin: "50% 50%",
              duration: 0.16,
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
              overwrite: true,
              stagger,
            },
          );
          // The glow lingers a little after the pulse before fading out.
          gsap.fromTo(
            glows,
            { opacity: 0 },
            {
              keyframes: [
                { opacity: 1, duration: 0.18, ease: "power2.out" },
                { opacity: 0, duration: 0.6, ease: "power1.in" },
              ],
              overwrite: true,
              stagger,
            },
          );
        });

        // The squash when the ball banks off the left wall.
        const squashBall = safe(() => {
          gsap.fromTo(
            spin,
            { scaleX: 0.84, scaleY: 1.12 },
            { scaleX: 1, scaleY: 1, duration: 0.25, ease: "power2.out" },
          );
        });

        const placeBall = () => {
          const { traveled } = exitState;
          const pastBank = traveled > path.bank;
          const rawX = path.x + path.ux * traveled;
          const before = Math.min(traveled, path.bank);
          const after = Math.max(0, traveled - path.bank);
          // Rolling left spins counterclockwise, and the bank reverses it.
          const turns = (after - before) / (Math.PI * ball.clientWidth);
          gsap.set(ball, {
            x: pastBank ? 2 * path.wall - rawX : rawX,
            y: path.y + path.uy * traveled,
          });
          gsap.set(roll, { rotation: turns * 360 });

          exitCorners = traveled > 0 ? [position(last)] : [];
          if (pastBank) {
            exitCorners.push({ x: path.wall, y: path.y + path.uy * path.bank });
          }
          drawTrail();

          if (pastBank && !banked) squashBall();
          banked = pastBank;

          const crossedLine = traveled >= lineDistance;
          if (crossedLine && !passed) flashRail();
          passed = crossedLine;
        };

        measureExit();
        ScrollTrigger.addEventListener("refreshInit", measureExit);

        gsap.fromTo(
          exitState,
          { traveled: 0 },
          {
            traveled: () => (exitY() - path.y) / path.uy,
            ease: "none",
            immediateRender: false,
            onUpdate: placeBall,
            scrollTrigger: {
              trigger: border,
              start: mainEnd,
              // Match the scroll-to-pixel rate of the main story so the ball
              // carries on at the same speed it arrived with.
              end: () =>
                mainEnd() +
                ((exitY() - path.y) * (mainEnd() - mainStart())) /
                  (playArea.clientHeight * timeline.duration()),
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          },
        );

        let disposed = false;
        void document.fonts.ready.then(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
        return () => {
          disposed = true;
          ScrollTrigger.removeEventListener("refreshInit", measureCue);
          ScrollTrigger.removeEventListener("refreshInit", measureExit);
        };
      },
      root,
    );

    return () => media.revert();
  }, [borderRef]);

  return (
    <div
      ref={rootRef}
      className="relative isolate mx-auto mt-12 h-[clamp(700px,75vw,1040px)] max-w-[1200px] [--ball-size:clamp(38px,5vw,64px)] motion-reduce:mt-16 motion-reduce:grid motion-reduce:h-auto motion-reduce:gap-12 [@media(scripting:none)]:mt-16 [@media(scripting:none)]:grid [@media(scripting:none)]:h-auto [@media(scripting:none)]:gap-12"
    >
      <div
        data-play-area
        className="pointer-events-none absolute inset-0 motion-reduce:hidden [@media(scripting:none)]:hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute h-full w-full text-[#ffb24c]"
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
        </svg>
        {/* Play-area pixels, so the trail can follow the ball past the
            bottom edge down to the rail. */}
        <svg
          className="absolute left-0 top-0 h-px w-px overflow-visible text-[#ffb24c]"
          fill="none"
        >
          <path
            data-trail
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            opacity="0.45"
          />
        </svg>
        <div
          data-cue-axis
          className="absolute left-[28%] top-[17%] h-0 w-0 rotate-[40deg]"
        >
          <div
            data-cue
            className="absolute right-[calc(var(--ball-size)/2)] w-[clamp(280px,55vw,790px)] -translate-x-4"
          >
            <Image
              src="/event_assets/poolstick.svg"
              alt=""
              width={935}
              height={40}
              className="block h-auto w-full -translate-y-1/2"
            />
          </div>
        </div>
        {POINTS.slice(1, 2).map((point, i) => (
          <div
            key={i}
            className="absolute h-[var(--ball-size)] w-[var(--ball-size)] [translate:-50%_-50%]"
            style={{ left: `${point.x * 100}%`, top: `${point.y * 100}%` }}
          >
            <span className="absolute -right-[1.5px] -top-[35%] h-[170%] w-[3px] rounded-[100%] [background:linear-gradient(transparent,#ffb24c80,transparent)]" />
            <span
              data-impact
              className="absolute inset-0 rounded-full border border-[#ffb24c] opacity-0"
            />
          </div>
        ))}
        <div
          data-ball
          // Cast the shadow from the moving wrapper so only the artwork spins.
          className="absolute left-0 top-0 z-[2] h-[var(--ball-size)] w-[var(--ball-size)] rounded-full shadow-[6px_8px_5px_#00000040] will-change-transform md:shadow-[10px_14px_8px_#00000040]"
        >
          <div data-spin className="h-full w-full origin-center">
            <Image
              src="/event_assets/eightball.svg"
              alt=""
              width={161}
              height={161}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>

      <article
        className={`${INFORMATION} right-0 top-[15%] w-[54%] md:top-[18%] md:w-[40%]`}
      >
        <div data-copy>
          <h3 className={TITLE}>WHAT IS DATATHON?</h3>
          <p className={DESCRIPTION}>
            We are the largest data science and machine learning focused
            hackathon in Texas located at Texas A&amp;M University in College
            Station.
          </p>
        </div>
      </article>
      <article
        className={`${INFORMATION} left-0 top-[48%] w-[56%] md:top-[51%] md:w-[54%]`}
      >
        <div data-copy>
          <h3 className={TITLE}>LOCATION</h3>
          <p className={DESCRIPTION}>
            Where: MSC 2300
            <br />
            When: November 7-8
          </p>
          <a
            href="https://maps.app.goo.gl/6FNTTaWyddiWnbCH8"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open 275 Joe Routt Blvd, College Station, TX 77843 in Google Maps (new tab)"
            className="group/map mx-auto mt-4 block w-full max-w-[400px] overflow-hidden rounded-xl border border-[#ffb24c]/40 bg-[#0c1808] p-1.5 shadow-[0_6px_20px_rgb(0_0_0/0.25)] transition-colors hover:border-[#ffb24c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffb24c] md:mt-5"
          >
            <span className="relative block aspect-video overflow-hidden rounded-lg">
              <Image
                src="/event_assets/event-map.png"
                alt="Campus map marking the Memorial Student Center beside Simpson Drill Field and Joe Routt Boulevard."
                fill
                sizes="(min-width: 768px) 400px, 56vw"
                className="object-cover object-center saturate-[0.85] sepia-[0.15]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-[#ffb24c]/20"
              />
            </span>
            <span className="flex items-center justify-center gap-2 px-1 pb-1 pt-2 font-righteous text-[clamp(10px,1vw,13px)] leading-snug text-[#ffcb82] group-hover/map:text-[#ffe0ac]">
              <span className="text-balance">
                275 Joe Routt Blvd, College Station, TX 77843
              </span>
              <span aria-hidden="true" className="shrink-0">
                ↗
              </span>
            </span>
          </a>
        </div>
      </article>
      <article
        className={`${INFORMATION} right-0 top-[87%] w-[54%] md:top-[86%] md:w-[44%]`}
      >
        <div data-copy>
          <h3 className={TITLE}>PARKING</h3>
          <p className={DESCRIPTION}>
            Lot 74 is reserved for Datathon participants. Lots 100 and 97 are
            also free on weekends.
          </p>
        </div>
      </article>
    </div>
  );
}
