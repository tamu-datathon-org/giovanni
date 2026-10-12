"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import styles from "./CasinoTransition.module.css";

type Variant = "coins" | "cards";
type SceneStyle = CSSProperties & Record<`--${string}`, string | number>;

const DURATION = 1.3; // seconds for the shower to pass the screen

const COIN_KINDS = ["red", "gold", "green", "gold"];
const COIN_SYMBOLS = ["✦", "♠", "TD", "♦"];
const SCROLL_KEYS = new Set([
  " ",
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
]);

interface Coin {
  x: number;
  y: number;
  size: number;
  kind: string;
  symbol: string;
  turn: number;
}

interface Shower {
  back: Coin[];
  front: Coin[];
  /** The solid band of the back sheet that hides the screen. */
  panel: { top: number; height: number };
  backHeight: number;
  frontHeight: number;
  /** Sheet y at which the back sheet first hides the whole screen. */
  coveredAt: number;
}

function makeCoin(x: number, y: number, size: number): Coin {
  const pick = Math.floor(Math.random() * COIN_KINDS.length);
  return {
    x,
    y,
    size,
    kind: COIN_KINDS[pick],
    symbol: COIN_SYMBOLS[pick],
    turn: Math.random() * 100 - 50,
  };
}

/**
 * Two static sheets: only the sheets move, so the shower costs two transforms
 * a frame. The back sheet is a solid band taller than the screen, which is
 * what hides the page while it jumps; coins only dress its edges (two rows
 * leading, a sparser one trailing) plus a few loose ones past each end. The
 * front sheet is a handful of large loose coins that fall faster for depth.
 * Covering the screen with the coins themselves took ~200 overlapping ones.
 */
function layoutShower(width: number, height: number): Shower {
  const gap = Math.min(150, Math.max(96, width / 10));
  const cols = Math.ceil(width / gap) + 1;
  const fringe = gap * 2.5;
  const panelHeight = height * 1.4;
  const backHeight = panelHeight + fringe * 2;
  const bottom = fringe + panelHeight;
  const jitter = () => (Math.random() - 0.5) * 0.3 * gap;
  const size = () => gap * (1.2 + Math.random() * 0.3);

  const back: Coin[] = [];
  for (let col = 0; col < cols; col++) {
    const x = (col - 0.25) * gap;
    back.push(makeCoin(x + jitter(), bottom + jitter(), size()));
    if (col < cols - 1) {
      back.push(
        makeCoin(x + gap / 2 + jitter(), bottom + gap * 0.6 + jitter(), size()),
      );
    }
    if (Math.random() < 0.55) {
      back.push(makeCoin(x + jitter(), fringe + jitter(), size()));
    }
  }
  const loose = (from: number) =>
    makeCoin(
      Math.random() * width,
      from + Math.random() * (fringe - gap * 1.5),
      size(),
    );
  back.push(loose(0), loose(0), loose(bottom + gap * 1.5), loose(bottom + gap * 1.5));

  const frontHeight = backHeight * 1.4;
  const front = Array.from({ length: Math.max(5, Math.round(cols * 0.6)) }, () =>
    makeCoin(
      Math.random() * width,
      Math.random() * frontHeight,
      gap * (1.6 + Math.random() * 0.4),
    ),
  );
  return {
    back,
    front,
    panel: { top: fringe, height: panelHeight },
    backHeight,
    frontHeight,
    coveredAt: height - fringe - panelHeight,
  };
}

/** Freezes the page without hiding the scrollbar, which shifts layout. */
function lockScroll() {
  const block = (event: Event) => {
    if (!(event instanceof KeyboardEvent) || SCROLL_KEYS.has(event.key)) {
      event.preventDefault();
    }
  };
  const types = ["wheel", "touchmove", "keydown"] as const;
  types.forEach((type) =>
    window.addEventListener(type, block, { passive: false }),
  );
  return () => types.forEach((type) => window.removeEventListener(type, block));
}

function ShowerSheet({
  coins,
  height,
  panel,
  front = false,
}: {
  coins: Coin[];
  height: number;
  panel?: Shower["panel"];
  front?: boolean;
}) {
  return (
    <div
      data-sheet
      className={`${styles.sheet} ${front ? styles.front : ""}`}
      style={{ height }}
    >
      {panel && (
        <div
          className={styles.panel}
          style={{ top: panel.top, height: panel.height }}
        />
      )}
      {coins.map((coin, i) => (
        <div
          key={i}
          className={styles.coin}
          style={
            {
              left: coin.x,
              top: coin.y,
              "--size": `${coin.size}px`,
              "--turn": `${coin.turn}deg`,
            } as SceneStyle
          }
        >
          <div className={`${styles.face} ${styles[coin.kind]}`}>
            <span className={styles.tokenCenter}>{coin.symbol}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Sits right above the section it introduces. The first time the reader
 * scrolls down onto it, a coin shower sweeps over the screen; while it hides
 * everything the page moves to the section underneath, which is simply there
 * once the shower has passed.
 */
function CoinCurtain() {
  const markerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const [shower, setShower] = useState<Shower | null>(null);

  useEffect(() => {
    const marker = markerRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!marker || reduced.matches) return;
    const isBelowFold = (top: number) => top >= window.innerHeight - 1;
    let wasBelow = isBelowFold(marker.getBoundingClientRect().top);
    const onScroll = () => {
      const top = marker.getBoundingClientRect().top;
      // Only a scroll down onto the boundary plays it; a restored scroll
      // position or the End key jumping straight past it doesn't.
      if (wasBelow && top > 0 && !isBelowFold(top)) {
        window.removeEventListener("scroll", onScroll);
        setShower(layoutShower(window.innerWidth, window.innerHeight));
        return;
      }
      wasBelow = isBelowFold(top);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const marker = markerRef.current;
    const curtain = curtainRef.current;
    if (!shower || !marker || !curtain) return;

    const [back, front] = curtain.querySelectorAll<HTMLElement>("[data-sheet]");
    const height = window.innerHeight;
    const unlock = lockScroll();
    let moved = false;
    const timeline = gsap
      .timeline({ paused: true, onComplete: () => setShower(null) })
      .fromTo(
        back,
        { y: -shower.backHeight },
        {
          y: height,
          duration: DURATION,
          ease: "none",
          onUpdate: () => {
            if (moved) return;
            const y = Number(gsap.getProperty(back, "y"));
            if (y < shower.coveredAt) return;
            moved = true;
            window.scrollTo({
              top: marker.getBoundingClientRect().top + window.scrollY,
              behavior: "instant",
            });
            unlock();
          },
        },
      )
      .fromTo(
        front,
        { y: -shower.frontHeight },
        { y: height, duration: DURATION, ease: "none" },
        0,
      );
    // Start once the parked sheets have painted, so the slow first paint
    // doesn't make the shower skip ahead.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        timeline.play();
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      timeline.kill();
      unlock();
    };
  }, [shower]);

  return (
    <>
      <div ref={markerRef} aria-hidden="true" />
      {shower &&
        createPortal(
          <div ref={curtainRef} className={styles.curtain} aria-hidden="true">
            <ShowerSheet
              coins={shower.back}
              height={shower.backHeight}
              panel={shower.panel}
            />
            <ShowerSheet
              front
              coins={shower.front}
              height={shower.frontHeight}
            />
          </div>,
          document.body,
        )}
    </>
  );
}

const CARDS = [
  { rank: "A", suit: "♠", red: false, angle: -27, x: -1.55, y: 26 },
  { rank: "A", suit: "♦", red: true, angle: -14, x: -0.8, y: 7 },
  { rank: "TD", suit: "✦", red: false, angle: 0, x: 0, y: 0 },
  { rank: "A", suit: "♣", red: false, angle: 14, x: 0.8, y: 7 },
  { rank: "A", suit: "♥", red: true, angle: 27, x: 1.55, y: 26 },
];

/**
 * Coins play a one-time curtain into the next section; cards form a
 * scroll-driven divider.
 */
export function CasinoTransition({ variant }: { variant: Variant }) {
  return variant === "coins" ? <CoinCurtain /> : <CardFan />;
}

function CardFan() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
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
  }, []);

  return (
    <div
      ref={rootRef}
      className={`${styles.scene} ${styles.cards}`}
      data-casino-transition="cards"
      aria-hidden="true"
    >
      <div className={styles.halo} />
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
    </div>
  );
}
