"use client";

/* eslint-disable @next/next/no-img-element */
import type { PointerEvent, ReactNode } from "react";
import { Component, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

import type { BearMotion, ProjectAnchors } from "./bear-config";
import { inter } from "~/app/_components/fonts";
import {
  BEAR_BACKDROP_URL,
  BEAR_POSTER_URL,
  BEAR_STATS,
  bearZoom,
  wrapRotation,
} from "./bear-config";
import styles from "./bear.module.css";

const BearScene = dynamic(() => import("./BearScene"), { ssr: false });
gsap.registerPlugin(ScrambleTextPlugin);

class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function BearShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const overlay = useRef<SVGSVGElement>(null);
  const [nearby, setNearby] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const revealed = useRef(new Set<string>());
  const motion = useRef<BearMotion>({
    yaw: 0,
    pitch: 0,
    dragging: false,
    returnAt: 0,
    fromYaw: 0,
    fromPitch: 0,
  });
  const wake = useRef<() => void>(() => undefined);
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    yaw: number;
    pitch: number;
  } | null>(null);

  const release = useCallback(() => {
    drag.current = null;
    const state = motion.current;
    state.dragging = false;
    state.returnAt = performance.now();
    state.fromYaw = reduced ? 0 : wrapRotation(state.yaw);
    state.fromPitch = reduced ? 0 : wrapRotation(state.pitch);
    state.yaw = state.fromYaw;
    state.pitch = state.fromPitch;
    wake.current();
  }, [reduced]);

  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => {
    setFailed(true);
    setReady(false);
  }, []);

  const project = useCallback<ProjectAnchors>((points, width, height) => {
    const svg = overlay.current;
    if (!svg) return;
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    BEAR_STATS.forEach((stat, index) => {
      const point = points[index];
      const group = svg.children.item(index);
      if (!group) return;
      const boxWidth = stat.box[0] * height;
      const boxHeight = stat.box[1] * height;
      const left = point.x - boxWidth / 2;
      const top = point.y - boxHeight / 2;
      const box = group.querySelector("[data-box]");
      if (!box) return;
      box.setAttribute("x", String(left));
      box.setAttribute("y", String(top));
      box.setAttribute("width", String(boxWidth));
      box.setAttribute("height", String(boxHeight));
      const startX = stat.side === "left" ? left : left + boxWidth;
      const endX =
        (stat.side === "left"
          ? stat.labelPosition[0]
          : stat.labelPosition[0] + 0.23) * width;
      const endY =
        stat.labelPosition[1] * height +
        Math.min(94, Math.max(44, width * 0.078)) * 1.05 +
        2;
      const elbowX =
        stat.side === "left"
          ? width * 0.225
          : width * (stat.labelPosition[0] - 0.015);
      group
        .querySelector("path")
        ?.setAttribute(
          "d",
          `M ${startX} ${point.y} H ${elbowX} V ${endY} H ${endX}`,
        );
      group
        .querySelector("[data-anchor]")
        ?.setAttribute("transform", `translate(${left - 8} ${top - 8})`);
      group
        .querySelector("[data-corner]")
        ?.setAttribute(
          "transform",
          `translate(${left + boxWidth - 6} ${top + boxHeight - 6})`,
        );
      group
        .querySelector("[data-end]")
        ?.setAttribute("transform", `translate(${endX - 3} ${endY - 3})`);
    });
  }, []);

  useEffect(() => {
    const element = root.current;
    const stageElement = stage.current;
    if (!element || !stageElement) return;
    const preload = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearby(true);
          preload.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    const visibility = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    preload.observe(element);
    visibility.observe(stageElement);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduced(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    const resize = new ResizeObserver(() => {
      if (ready) {
        wake.current();
        return;
      }
      const { width, height } = stageElement.getBoundingClientRect();
      const zoom = bearZoom(width, height);
      project(
        BEAR_STATS.map(({ anchor }) => ({
          x: width / 2 + anchor[0] * zoom,
          y: height / 2 - anchor[1] * zoom,
        })),
        width,
        height,
      );
    });
    resize.observe(stageElement);
    return () => {
      preload.disconnect();
      visibility.disconnect();
      resize.disconnect();
      preference.removeEventListener("change", updatePreference);
    };
  }, [project, ready]);

  useEffect(() => {
    if (!visible) release();
  }, [visible, release]);

  useEffect(() => {
    const element = root.current;
    if (!element || reduced) return;
    const context = gsap.context(() => undefined, root);
    // Observe the statistics themselves: the lower callouts (and the stacked
    // mobile text) can still be offscreen when the bear first becomes visible.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.5) continue;
          const stat = BEAR_STATS.find(
            (item) => item.id === entry.target.getAttribute("data-stat"),
          );
          if (!stat || revealed.current.has(stat.id)) continue;
          revealed.current.add(stat.id);
          observer.unobserve(entry.target);
          entry.target.setAttribute("data-revealed", "true");
          context.add(() => {
            const timeline = gsap.timeline();
            timeline.from(`[data-lines="${stat.id}"]`, {
              opacity: 0,
              duration: 0.2,
            });
            timeline.fromTo(
              `[data-lines="${stat.id}"] path`,
              { strokeDasharray: 1, strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 0.45 },
              0,
            );
            timeline.fromTo(
              `[data-value="${stat.id}"]`,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.65,
                scrambleText: {
                  text: stat.value,
                  chars: "0123456789!<>/",
                  revealDelay: 0.1,
                  speed: 0.5,
                },
              },
              0.25,
            );
            timeline.fromTo(
              `[data-label="${stat.id}"]`,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.65,
                scrambleText: {
                  text: stat.label,
                  chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ_",
                  revealDelay: 0.1,
                  speed: 0.5,
                },
              },
              0.35,
            );
          });
        }
      },
      { threshold: 0.5 },
    );
    element
      .querySelectorAll("[data-stat]")
      .forEach((stat) => observer.observe(stat));
    return () => {
      observer.disconnect();
      context.revert();
    };
  }, [reduced]);

  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!ready || event.button !== 0 || !event.isPrimary) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      yaw: motion.current.yaw,
      pitch: motion.current.pitch,
    };
    motion.current.dragging = true;
  }

  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    const origin = drag.current;
    if (origin?.id !== event.pointerId) return;
    // One full turn across 80% of the stage, including on narrow touchscreens.
    const yawSensitivity =
      (Math.PI * 2) / (event.currentTarget.clientWidth * 0.8);
    const pitchSensitivity =
      (Math.PI * 2) / (event.currentTarget.clientHeight * 0.8);
    motion.current.yaw =
      origin.yaw + (event.clientX - origin.x) * yawSensitivity;
    motion.current.pitch =
      event.pointerType === "touch"
        ? 0
        : origin.pitch + (event.clientY - origin.y) * pitchSensitivity;
    wake.current();
  }

  return (
    <div ref={root} className={styles.showcase}>
      <noscript>
        <style>{`[data-stat] [data-value], [data-stat] [data-label] { opacity: 1; }`}</style>
      </noscript>
      <div className={styles.composition}>
        <div
          ref={stage}
          className={styles.stage}
          role="group"
          tabIndex={ready ? 0 : -1}
          aria-label="Interactive snowflake bear"
          aria-describedby="bear-instructions"
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={release}
          onPointerCancel={release}
          onLostPointerCapture={release}
          onBlur={release}
          onKeyDown={(event) => {
            if (
              !ready ||
              ![
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown",
                "Escape",
              ].includes(event.key)
            )
              return;
            event.preventDefault();
            if (event.key === "Escape") {
              release();
              return;
            }
            const state = motion.current;
            state.dragging = true;
            state.yaw +=
              event.key === "ArrowRight"
                ? 0.08
                : event.key === "ArrowLeft"
                  ? -0.08
                  : 0;
            state.pitch +=
              event.key === "ArrowDown"
                ? 0.04
                : event.key === "ArrowUp"
                  ? -0.04
                  : 0;
            wake.current();
          }}
          onKeyUp={(event) => {
            if (event.key.startsWith("Arrow")) release();
          }}
        >
          <img
            className={styles.backdrop}
            src={BEAR_BACKDROP_URL}
            alt=""
            aria-hidden
            draggable={false}
          />
          <img
            className={styles.poster}
            data-loaded={ready}
            src={BEAR_POSTER_URL}
            alt="White snowflake bear with turquoise ears"
            draggable={false}
          />
          <div className={styles.canvas}>
            {nearby && !failed && (
              <SceneBoundary onError={onError}>
                <BearScene
                  active={visible}
                  motion={motion}
                  wake={wake}
                  onProject={project}
                  onReady={onReady}
                  onError={onError}
                />
              </SceneBoundary>
            )}
          </div>
        </div>
        <svg
          ref={overlay}
          className={styles.connectors}
          aria-hidden
          fill="none"
          stroke="white"
          strokeWidth="1.2"
        >
          {BEAR_STATS.map((stat) => (
            <g key={stat.id} data-lines={stat.id}>
              <rect data-box />
              <path pathLength="1" />
              <rect data-anchor width="16" height="16" />
              <rect data-corner width="12" height="12" />
              <rect data-end width="6" height="6" />
            </g>
          ))}
        </svg>
        <ul className={styles.stats} aria-label="TAMU Datathon statistics">
          {BEAR_STATS.map((stat) => (
            <li
              key={stat.id}
              data-stat={stat.id}
              className={styles.stat}
              style={{
                left: `${stat.labelPosition[0] * 100}%`,
                top: `${stat.labelPosition[1] * 100}%`,
              }}
            >
              <span className="sr-only">
                {stat.value} {stat.label}
              </span>
              <span aria-hidden className={styles.value} data-value={stat.id}>
                {stat.value}
              </span>
              <span
                aria-hidden
                className={`${styles.label} ${inter.className}`}
                data-label={stat.id}
              >
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
        <p
          id="bear-instructions"
          className={`${styles.hint} ${inter.className}`}
        >
          {failed ? "SNOWFLAKE BEAR" : "DRAG TO ROTATE · RELEASE TO RECENTER"}
          <span className="sr-only">
            . Keyboard: focus the bear and hold an arrow key to rotate. Release
            to recenter.
          </span>
        </p>
      </div>
    </div>
  );
}
