"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, FocusEvent } from "react";

import { DieFace } from "./DieFace";
import { useInView, usePrefersReducedMotion } from "./hooks";
import { MarqueeTitle } from "./MarqueeTitle";
import { PRIZE_DIR, prizeLinkProps, prizes } from "./prizedata";
import type { Prize } from "./prizedata";

/** The board art split in two so the dice can move: the board without its dice, and the dice on their own. */
const BOARD = `${PRIZE_DIR}/craps_board_felt.png`;
const DICE = `${PRIZE_DIR}/craps_dice.png`;

const PER_ROLL = 3;
const ROLLS = Math.ceil(prizes.length / PER_ROLL);
const AUTO_ROLL_MS = 4500;
/** When the cards start to turn, as the dice come down. */
const LAND_MS = 550;
/** Matches the cards' duration-[650ms]; each card turns CARD_STAGGER_MS after the one before. */
const FLIP_MS = 650;
const CARD_STAGGER_MS = 90;

/*
 * Spots on the art (1381 x 1120), as percentages of its width and height,
 * taken from the mockup. The cards hang a little past the board's sides.
 */
const CARD_LEFTS = [0.3, 34.2, 68.2];
const CARD = { top: 35.4, width: 31.5, height: 38.7 };
const SMALL_DIE_SIZE = 10.6;
const SMALL_DICE = [
  { left: 56.2, top: 29.9, turn: 1 },
  { left: -1.9, top: 70.5, turn: -1 },
  { left: 90.8, top: 70.5, turn: 1 },
];

/** The three prizes on the table for a roll. Spots past the end of the list are empty (undefined). */
const prizesForRoll = (roll: number): (Prize | undefined)[] =>
  Array.from({ length: PER_ROLL }, (_, i) => prizes[roll * PER_ROLL + i]);

const randomFace = (not: number) => {
  let face = not;
  while (face === not) face = 1 + Math.floor(Math.random() * 6);
  return face;
};

/**
 * Each card has two faces. `flips` counts half turns, so face 0 is up when it's
 * even; on a roll the face that's down is given the next prizes and the card
 * turns over to show it.
 */
interface Table {
  roll: number;
  flips: number;
  faces: [number, number];
}

/** The orange-framed card both sides of every spot share. */
const CARD_FRAME =
  "absolute inset-0 block rounded-[3.2cqw] bg-gradient-to-b from-[#FFB24C] to-[#D9822B] p-[1.3cqw] shadow-[0_0.8cqw_1.6cqw_rgb(0_0_0/0.45)] [backface-visibility:hidden]";

/** Fills a spot the prize list doesn't reach, on the last roll. */
function MorePrizesCard({ up, back }: { up: boolean; back: boolean }) {
  return (
    <div
      aria-hidden={up ? undefined : true}
      className={CARD_FRAME}
      style={back ? { transform: "rotateY(180deg)" } : undefined}
    >
      <span className="relative flex h-full w-full flex-col items-center justify-center gap-[6%] overflow-hidden rounded-[2.2cqw] bg-[#1B3E1B] px-[10%] text-center shadow-[inset_0_0.4cqw_1.2cqw_rgb(0_0_0/0.5)]">
        <svg aria-hidden="true" viewBox="-24 -24 48 48" className="w-[22%] fill-[#FFB24C] drop-shadow-[0_0_1.2cqw_rgb(255_178_76/0.6)]">
          <path d="M0 -24L6.5 -6.5L24 0L6.5 6.5L0 24L-6.5 6.5L-24 0L-6.5 -6.5Z" />
        </svg>
        <span className="font-righteous text-[length:max(11px,3.2cqw)] uppercase leading-tight text-[#FFB24C]">
          And even more
        </span>{" "}
        <span className="font-righteous text-[length:max(9px,2.2cqw)] leading-tight text-[#FDFBED]">
          from sponsored challenges
        </span>
      </span>
    </div>
  );
}

function PrizeCard({ prize, up, back }: { prize: Prize; up: boolean; back: boolean }) {
  return (
    <a
      {...prizeLinkProps(prize.href)}
      aria-hidden={up ? undefined : true}
      tabIndex={up ? undefined : -1}
      className={`group outline-none focus-visible:ring-[0.6cqw] focus-visible:ring-[#3edbd3] ${CARD_FRAME}`}
      style={back ? { transform: "rotateY(180deg)" } : undefined}
    >
      <span className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-[2.2cqw] bg-[#1B3E1B] shadow-[inset_0_0.4cqw_1.2cqw_rgb(0_0_0/0.5)]">
        <span className="relative mt-[9%] w-[78%] flex-1">
          <Image
            src={prize.imageSrc}
            alt=""
            fill
            sizes="(min-width: 800px) 240px, 30vw"
            className="object-contain drop-shadow-[0_0.6cqw_0.6cqw_rgb(0_0_0/0.5)] transition-transform duration-300 group-hover:scale-110"
          />
        </span>
        <span className="font-righteous line-clamp-2 w-full px-[11%] pb-[7%] pt-[4%] text-center text-[length:max(9px,2.3cqw)] leading-tight text-[#FDFBED]">
          {prize.name}
        </span>
      </span>
    </a>
  );
}

export function CrapsBoard() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();
  const [table, setTable] = useState<Table>({ roll: 0, flips: 0, faces: [0, 0] });
  const [rollKey, setRollKey] = useState(0);
  const [smallDice, setSmallDice] = useState([2, 1, 3]);
  const [paused, setPaused] = useState(false);

  const tableRef = useRef(table);
  tableRef.current = table;
  const busy = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  const roll = useCallback(
    (to?: number) => {
      const current = tableRef.current;
      const next = to ?? (current.roll + 1) % ROLLS;
      if (busy.current || next === current.roll) return;
      busy.current = true;

      setRollKey((key) => key + 1);
      setSmallDice((faces) => faces.map(randomFace));

      const land = reducedMotion ? 0 : LAND_MS;
      const settle = reducedMotion ? 0 : FLIP_MS + CARD_STAGGER_MS * (PER_ROLL - 1);
      timers.current.push(
        window.setTimeout(() => {
          setTable((t) => {
            const faces: [number, number] = [...t.faces];
            faces[(t.flips + 1) % 2] = next;
            return { roll: next, flips: t.flips + 1, faces };
          });
        }, land),
        window.setTimeout(() => {
          busy.current = false;
        }, land + settle + 50),
      );
    },
    [reducedMotion],
  );

  useEffect(() => {
    if (!inView || paused || reducedMotion || ROLLS < 2) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") roll();
    }, AUTO_ROLL_MS);
    return () => window.clearInterval(id);
  }, [inView, paused, reducedMotion, roll]);

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
  };

  const upFace = table.flips % 2;

  return (
    <div
      ref={ref}
      className="relative aspect-[1381/1120] w-full [container-type:inline-size]"
      onPointerEnter={(event) => event.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={onBlur}
    >
      <Image
        src={BOARD}
        alt=""
        fill
        sizes="(min-width: 800px) 760px, 92vw"
        className="pointer-events-none select-none object-contain"
        draggable={false}
      />

      <h3 className="absolute left-[10%] top-[12.1%] m-0 h-[13%] w-[46%]">
        <span className="sr-only">And more!</span>
        <MarqueeTitle text="AND MORE!" align="start" className="h-full w-full" />
      </h3>

      <button
        type="button"
        aria-label="Roll the dice for more prizes"
        className="group absolute left-[61.405%] top-0 z-20 h-[27.5%] w-[27.589%] cursor-pointer border-0 bg-transparent p-0 [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#3edbd3]"
        onClick={() => roll()}
      >
        <span key={rollKey} className={`absolute inset-0 block ${rollKey ? "craps-dice-roll" : ""}`}>
          <Image
            src={DICE}
            alt=""
            fill
            sizes="(min-width: 800px) 210px, 26vw"
            className="pointer-events-none select-none object-contain drop-shadow-[0_0.8cqw_0.6cqw_rgb(0_0_0/0.45)] transition-transform duration-200 group-hover:-translate-y-[3%] group-hover:rotate-[-3deg]"
            draggable={false}
          />
        </span>
      </button>

      <ul aria-label="More prizes" className="m-0 list-none p-0">
        {CARD_LEFTS.map((left, i) => (
          <li
            key={left}
            className="absolute z-10 [perspective:150cqw]"
            style={{ left: `${left}%`, top: `${CARD.top}%`, width: `${CARD.width}%`, height: `${CARD.height}%` }}
          >
            <div
              className="relative h-full w-full transition-transform duration-[650ms] ease-[cubic-bezier(0.3,0.7,0.25,1.15)] [transform-style:preserve-3d] motion-reduce:transition-none"
              style={{
                transform: `rotateY(${table.flips * 180}deg)`,
                transitionDelay: reducedMotion ? "0ms" : `${i * CARD_STAGGER_MS}ms`,
              }}
            >
              {table.faces.map((roll, face) => {
                const prize = prizesForRoll(roll)[i];
                const up = face === upFace;
                return prize ? (
                  <PrizeCard key={face} prize={prize} up={up} back={face === 1} />
                ) : (
                  <MorePrizesCard key={face} up={up} back={face === 1} />
                );
              })}
            </div>
          </li>
        ))}
      </ul>

      {SMALL_DICE.map((die, i) => (
        <span
          key={`${i}-${rollKey}`}
          aria-hidden="true"
          className={`pointer-events-none absolute z-20 aspect-square drop-shadow-[0_0.6cqw_0.5cqw_rgb(0_0_0/0.45)] ${rollKey ? "craps-die-tumble" : ""}`}
          style={
            {
              left: `${die.left}%`,
              top: `${die.top}%`,
              width: `${SMALL_DIE_SIZE}%`,
              "--turn": die.turn,
              animationDelay: `${i * 70}ms`,
            } as CSSProperties
          }
        >
          <DieFace value={smallDice[i]} className="block h-full w-full" />
        </span>
      ))}

      {/* One die per roll, showing which three prizes are up; click one to roll to it. */}
      <div className="absolute inset-x-0 top-[88%] z-10 flex h-[7.5%] items-center justify-center gap-[1.6%]">
        {Array.from({ length: ROLLS }, (_, r) => {
          const first = r * PER_ROLL + 1;
          const last = Math.min(first + PER_ROLL - 1, prizes.length);
          const current = r === table.roll;
          return (
            <button
              key={r}
              type="button"
              aria-label={`Show prizes ${first} to ${last}`}
              aria-current={current ? "true" : undefined}
              className={`aspect-square h-full cursor-pointer rounded-[22%] border-0 bg-transparent p-0 transition duration-300 [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#3edbd3] ${
                current
                  ? "scale-110 opacity-100 shadow-[0_0_0_0.5cqw_#FFB24C]"
                  : "opacity-[0.55] hover:opacity-[0.9]"
              }`}
              onClick={() => roll(r)}
            >
              {r < 6 ? (
                <DieFace value={r + 1} className="block h-full w-full" />
              ) : (
                <span className="font-righteous flex h-full w-full items-center justify-center rounded-[22%] bg-[#D50000] text-[length:max(9px,2.4cqw)] text-[#FDFBED]">
                  {r + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
