"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import styles from "./CasinoTransition.module.css";

type Variant = "coins" | "cards";
type SceneStyle = CSSProperties & Record<`--${string}`, string | number>;

// Fixed arrangements keep server/client markup identical and the composition
// intentional. Alternate depths, finishes, and landing times give the shower
// some weight without a physics loop or any per-frame React updates.
const TOKENS = Array.from({ length: 60 }, (_, i) => ({
  x: 1.5 + (i % 30) * 3.34 + (i >= 30 ? 1.2 : 0),
  // The second layer lands on the first: every token belongs to the floor.
  lift: i >= 30 ? (16 + ((i * 7) % 13)) * 1.5 : 0,
  size: (54 + ((i * 13) % 35)) * 1.5,
  rotation: ((i * 47) % 100) - 50,
  flatten: 0.52 + (i % 3) * 0.12,
  depth: i >= 30 ? 1 : 2,
  kind: i % 4 === 0 ? "red" : i % 4 === 2 ? "green" : "gold",
  symbol: ["✦", "♠", "TD", "♦"][i % 4],
}));

const CARDS = [
  { rank: "A", suit: "♠", red: false, angle: -27, x: -1.55, y: 26 },
  { rank: "A", suit: "♦", red: true, angle: -14, x: -0.8, y: 7 },
  { rank: "TD", suit: "✦", red: false, angle: 0, x: 0, y: 0 },
  { rank: "A", suit: "♣", red: false, angle: 14, x: 0.8, y: 7 },
  { rank: "A", suit: "♥", red: true, angle: 27, x: 1.55, y: 26 },
];

function animateCoinShower(root: HTMLDivElement) {
  const tokens = Array.from(root.querySelectorAll<HTMLElement>("[data-token]"));
  // Keep a single section-relative layer for the flight and the pile. The
  // entry point follows the viewport without switching fixed/absolute modes.
  gsap.set(tokens, { x: 0, y: 0 });
  const drops = tokens.map((token) => ({
    token,
    progress: 0,
    bounce: 0,
    height: 0,
    visible: true,
    setX: gsap.quickSetter(token, "x", "px") as (value: number) => void,
    setY: gsap.quickSetter(token, "y", "px") as (value: number) => void,
  }));
  let floor = 0;
  let drift = 0;
  const measure = () => {
    floor = root.getBoundingClientRect().bottom + window.scrollY;
    drift = Math.min(64, root.clientWidth * 0.055);
    drops.forEach((drop) => {
      drop.height = drop.token.clientHeight;
      drop.visible = drop.token.getClientRects().length > 0;
    });
  };
  const placeDrops = () => {
    const ground = floor - window.scrollY;
    drops.forEach(({ height, visible, progress, bounce, setX, setY }, i) => {
      if (!visible) return;
      setY(-(ground + height) * (1 - progress) + bounce);
      setX(Math.sin(progress * Math.PI) * drift * (i % 2 ? -1 : 1));
    });
  };
  measure();
  const timeline = gsap.timeline({
    paused: true,
    onUpdate: () => {
      const progress = timeline.progress();
      root.dataset.coinState =
        progress === 0 ? "idle" : progress === 1 ? "settled" : "falling";
      placeDrops();
    },
  });

  drops.forEach((drop, i) => {
    const start = (i >= 30 ? 0.18 : 0) + ((i * 11) % 30) * 0.014;
    const fall = 1.7 + (i % 5) * 0.06;
    timeline.fromTo(
      drop,
      { progress: 0, bounce: 0 },
      {
        progress: 1,
        duration: fall,
        ease: "power1.in",
      },
      start,
    );
    timeline.to(
      drop,
      {
        keyframes: [
          { bounce: -12 - (i % 3) * 4, duration: 0.14, ease: "power2.out" },
          { bounce: 0, duration: 0.2, ease: "power1.in" },
        ],
      },
      start + fall,
    );
    timeline.fromTo(
      drop.token,
      { scaleY: 0.92 },
      {
        scaleY: TOKENS[i].flatten,
        duration: 0.5,
        ease: "sine.inOut",
      },
      start + fall - 0.16,
    );
    const face = drop.token.firstElementChild;
    if (face) {
      timeline.fromTo(
        face,
        {
          rotation: TOKENS[i].rotation + (i % 2 ? -1 : 1) * (90 + (i % 4) * 16),
          rotationY: (i % 2 ? -1 : 1) * (30 + (i % 3) * 10),
        },
        {
          rotation: TOKENS[i].rotation,
          rotationY: 0,
          duration: fall + 0.34,
          ease: "sine.out",
        },
        start,
      );
    }
  });

  root.dataset.coinState = "idle";
  const scroll = ScrollTrigger.create({
    trigger: root,
    animation: timeline,
    scrub: 0.55,
    start: "top 92%",
    end: "bottom 65%",
    onUpdate: placeDrops,
    onRefresh: () => {
      measure();
      placeDrops();
    },
  });
  // The dynamic Prizes component can replace a shorter loading placeholder.
  const resize = new ResizeObserver(() => scroll.refresh());
  resize.observe(root);
  let disposed = false;
  void document.fonts.ready.then(() => {
    if (!disposed) ScrollTrigger.refresh();
  });
  return () => {
    disposed = true;
    resize.disconnect();
    scroll.kill();
    delete root.dataset.coinState;
  };
}

/** Coins overlay their parent section; cards form a scroll-driven divider. */
export function CasinoTransition({ variant }: { variant: Variant }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        if (variant === "coins") return animateCoinShower(root);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 92%",
            end: "bottom 65%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        {
          root
            .querySelectorAll<HTMLElement>("[data-card]")
            .forEach((card, i) => {
              const final = CARDS[i];
              timeline.fromTo(
                card,
                {
                  x: () => -root.clientWidth * 0.38,
                  y: 90 + i * 2,
                  rotation: -65 + i * 3,
                  rotationY: 75,
                  opacity: 0,
                },
                {
                  x: () => final.x * card.clientWidth,
                  y: final.y,
                  rotation: final.angle,
                  rotationY: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: "power3.out",
                },
                i * 0.12,
              );
            });
          timeline.fromTo(
            root.querySelectorAll("[data-flourish]"),
            {
              scaleX: 0.3,
              opacity: 0,
            },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
            },
            0.45,
          );
        }

        // Font loading above can change section heights after the first measure.
        let disposed = false;
        void document.fonts.ready.then(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
        return () => {
          disposed = true;
        };
      },
      root,
    );

    return () => media.revert();
  }, [variant]);

  return (
    <div
      ref={rootRef}
      className={`${styles.scene} ${variant === "coins" ? styles.coins : styles.cards}`}
      data-casino-transition={variant}
      aria-hidden="true"
    >
      {variant === "cards" && <div className={styles.halo} />}
      {variant === "coins" ? (
        <div className={styles.shower}>
          {TOKENS.map((token, i) => (
            <div
              key={i}
              data-token
              className={styles.token}
              style={
                {
                  left: `${token.x}%`,
                  "--lift": `${token.lift}px`,
                  "--size": `${token.size}px`,
                  "--turn": `${token.rotation}deg`,
                  "--flatten": token.flatten,
                  zIndex: token.depth,
                } as SceneStyle
              }
            >
              <div className={`${styles.face} ${styles[token.kind]}`}>
                <span className={styles.tokenCenter}>{token.symbol}</span>
                <span className={styles.shine} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div
            data-flourish
            className={`${styles.flourish} ${styles.leftFlourish}`}
          >
            <span>✦</span>
          </div>
          <div className={styles.hand}>
            {CARDS.map((card, i) => (
              <div
                key={i}
                data-card
                className={`${styles.card} ${card.red ? styles.redCard : ""} ${i === 2 ? styles.houseCard : ""}`}
                style={
                  {
                    "--card-x": card.x,
                    "--card-y": `${card.y}px`,
                    "--card-angle": `${card.angle}deg`,
                    zIndex: i === 2 ? 5 : i,
                  } as SceneStyle
                }
              >
                <span className={styles.corner}>
                  {card.rank}
                  <span>{card.suit}</span>
                </span>
                {i === 2 ? (
                  <Image
                    src="/event_assets/faq/bear-dealer-body.png"
                    alt=""
                    width={732}
                    height={909}
                    sizes="90px"
                    draggable={false}
                    className={styles.houseBear}
                  />
                ) : (
                  <span className={styles.cardSuit}>{card.suit}</span>
                )}
                {i === 2 && <span className={styles.houseLabel}>DATATHON</span>}
                <span className={`${styles.corner} ${styles.bottomCorner}`}>
                  {card.rank}
                  <span>{card.suit}</span>
                </span>
              </div>
            ))}
          </div>
          <div
            data-flourish
            className={`${styles.flourish} ${styles.rightFlourish}`}
          >
            <span>✦</span>
          </div>
        </>
      )}
    </div>
  );
}
