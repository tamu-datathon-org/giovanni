"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import { SectionGround } from "@/components/SectionGround";

const CURTAINS = "/event_assets/faq/curtains.png";
const TABLE = "/event_assets/faq/poker-table-faq.png";
const BOTTOM = "/event_assets/faq/faq-btm.png";
const BEAR = "/event_assets/faq/bear-dealer-body.png";
const HANDS = "/event_assets/faq/bear-hands.png";
const STACK = "/event_assets/faq/card-stack.png";
const CARD = "/event_assets/faq/card.png";
const CHIP_STACK = "/event_assets/faq/chip-stack.png";
const BUBBLE = "/event_assets/faq/faq-wanna-play.png";
const STAR = "/event_assets/sponsors/Star.png";
const TRAVEL_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSdknd_sg7QjUmu8WRgAZD7Y8AA2FgD6iJ8Y5X21hGYraFasmg/viewform";

const ART =
  "pointer-events-none h-auto w-full select-none [-webkit-user-drag:none] [user-drag:none]";

/** Below Tailwind's `md` (768px) the table stands up tall; matches `max-md:` classes. */
const MOBILE_QUERY = "(max-width: 767.98px)";

/** Where the deck sits, as a percent of the table. Cards fly out from here. */
const DECK = { x: 16, y: 8 };
const MOBILE_DECK = { x: 39, y: 3.5 };
const DEAL_STEP_MS = 90;
const DEAL_TRAVEL_MS = 700;
const POPUP_OPEN_MS = 550;
/** Close uses a shorter, less front-loaded ease so it doesn't "sit" after looking done. */
const POPUP_CLOSE_MS = 320;
const POPUP_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const POPUP_MS = POPUP_OPEN_MS; // dealSettled / shared fallbacks
const SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
  "Spacebar",
]);

type CardRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const POPUP_RATIO = 1.425;

function popupSize() {
  const mobile = window.matchMedia(MOBILE_QUERY).matches;
  const maxW = mobile ? 26 * 16 : 24 * 16;
  const vwCap = window.innerWidth * (mobile ? 0.88 : 0.48);
  // Keep the whole card on screen, e.g. on a phone held sideways.
  const vhCap = (window.innerHeight * 0.86) / POPUP_RATIO;
  const width = Math.min(maxW, vwCap, vhCap);
  const height = width * POPUP_RATIO;
  return {
    width,
    height,
    top: (window.innerHeight - height) / 2,
    left: (window.innerWidth - width) / 2,
  };
}

const SPOTS = [
  { x: 18, y: 34 },
  { x: 34, y: 34 },
  { x: 50, y: 34 },
  { x: 66, y: 34 },
  { x: 82, y: 34 },
  { x: 18, y: 64 },
  { x: 34, y: 64 },
  { x: 50, y: 64 },
  { x: 66, y: 64 },
  { x: 82, y: 64 },
];

/** Tall phone table: 2 columns × 5 rows. */
const MOBILE_SPOTS = [20, 36, 52, 68, 84].flatMap((y) => [
  { x: 29, y },
  { x: 71, y },
]);

type FaqItem = { question: string; answer: string };

const ITEMS: FaqItem[] = [
  {
    question: "What is TAMU Datathon?",
    answer:
      "A datathon is where you build your analytical skill set and create data-driven solutions in 24 hours. We provide data science lectures, workshops, challenges, prizes, fun activities, swag, food, and more!",
  },
  {
    question: "When & where is the event?",
    answer:
      "November 7-8th, 2026 at the MSC 2300 Bethancourt Ballroom! A complete schedule will be available at tamudatathon.com/schedule at a later date. Parking will be free at a later disclosed location.",
  },
  {
    question: "How much to know?",
    answer:
      "Not much! We have intro workshops and mentors for beginners, plus tougher challenges if you already have experience.",
  },
  {
    question: "How do I sign up?",
    answer:
      "Registration is currently open! Admission decisions will be released soon after the registration ends.",
  },
  {
    question: "Who can attend?",
    answer:
      "TAMU Datathon is open to any enrolled undergraduate or graduate student at least 18 years of age and anyone who has graduated within one year of the event. We welcome students from all across the world and from all majors!",
  },
  {
    question: "How much does it cost?",
    answer:
      "It is FREE! All you need is a laptop! We will even throw in tons of swag, food, Wi-Fi, workspaces, and caffeine during your stay. ALSO PARKING IS FREE!",
  },
  {
    question: "What should I bring?",
    answer:
      "Since the event will last overnight, it is a good idea to bring a pillow and a sleeping bag if you are planning on staying at the venue. Please remember to bring your laptop and charger.",
  },
  {
    question: "How do teams work?",
    answer:
      "Teams can have up to 4 people. We encourage working with a team, it's more fun! You do not need to form a team before attending the event. There will be plenty of time to find a team after opening ceremonies.",
  },
  {
    question: "Travel reimbursements?",
    answer: `Limited travel reimbursements are available for attendees coming from outside the area. Apply here: ${TRAVEL_FORM}`,
  },
  {
    question: "I have another question?",
    answer: "Send us an email at connect@tamudatathon.com.",
  },
];

const linkPattern =
  /(https:\/\/tamudatathon\.org\/apply|https:\/\/docs\.google\.com\/forms\/d\/e\/1FAIpQLSdknd_sg7QjUmu8WRgAZD7Y8AA2FgD6iJ8Y5X21hGYraFasmg\/viewform|connect@tamudatathon\.com)/g;

function renderAnswer(text: string): ReactNode {
  const renderLinks = (content: string, keyPrefix: string) =>
    content.split(linkPattern).map((part, index) => {
      if (part === "https://tamudatathon.org/apply") {
        return (
          <a
            key={`${keyPrefix}-link-${index}`}
            href={part}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            {part}
          </a>
        );
      }
      if (part === TRAVEL_FORM) {
        return (
          <a
            key={`${keyPrefix}-link-${index}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Travel Reimbursement form
          </a>
        );
      }
      if (part === "connect@tamudatathon.com") {
        return (
          <a
            key={`${keyPrefix}-link-${index}`}
            href="mailto:connect@tamudatathon.com"
            className="underline underline-offset-2"
          >
            {part}
          </a>
        );
      }
      return <span key={`${keyPrefix}-text-${index}`}>{part}</span>;
    });

  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-[#1F71DD]">
          {renderLinks(part.slice(2, -2), `bold-${index}`)}
        </strong>
      );
    }
    return <span key={index}>{renderLinks(part, `plain-${index}`)}</span>;
  });
}

/** Dealt / flip-back: plain card art (question sits above the card). */
function FaqCardBack() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={CARD}
        alt=""
        width={280}
        height={280}
        draggable={false}
        className={`${ART} h-full w-full object-contain drop-shadow-[0_6px_4px_rgb(0_0_0/0.35)]`}
      />
    </div>
  );
}

/** Opened face: L-borders + rank, question/answer, no cross-hatch. */
function FaqCardFace({
  number,
  question,
  answer,
}: {
  number: number;
  question: string;
  answer: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-[#1F71DD] shadow-[0_16px_32px_rgb(0_0_0/0.45)]">
      {/* Mirrored L-borders tight to the edges */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-[1%] h-[98%] w-[98%]"
        viewBox="0 0 100 140"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M6 18 V134 H82"
          stroke="#1F71DD"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M94 122 V6 H18"
          stroke="#1F71DD"
          strokeWidth="1.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute left-[1.5%] top-[1%] z-[1] flex w-[11%] flex-col items-center leading-none">
        <span className="font-righteous text-[length:clamp(14px,2.2vw,32px)]">
          {number}
        </span>
        <span className="mt-[0.02em] text-[length:clamp(10px,1.4vw,20px)] leading-none">
          ♠
        </span>
      </div>
      <div className="absolute bottom-[1%] right-[1.5%] z-[1] flex w-[11%] rotate-180 flex-col items-center leading-none">
        <span className="font-righteous text-[length:clamp(14px,2.2vw,32px)]">
          {number}
        </span>
        <span className="mt-[0.02em] text-[length:clamp(10px,1.4vw,20px)] leading-none">
          ♠
        </span>
      </div>
      <div className="absolute inset-[12%_10%] flex flex-col overflow-hidden px-[4%] py-[3%]">
        <p className="font-righteous shrink-0 text-[clamp(18px,2.5vw,28px)] leading-tight text-[#1F71DD]">
          {question}
        </p>
        <div
          data-faq-scroll
          className="mt-3 min-h-0 flex-1 overflow-y-auto text-[clamp(15px,1.9vw,20px)] leading-snug text-[#1F71DD]"
        >
          {renderAnswer(answer)}
        </div>
        <p className="font-righteous mt-3 shrink-0 text-center text-[clamp(12px,1.4vw,15px)] tracking-[0.04em] text-[#1F71DD]/70">
          <span className="md:hidden">Tap to close</span>
          <span className="max-md:hidden">Click to close</span>
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [dealt, setDealt] = useState(false);
  const [landed, setLanded] = useState(false);
  const [dealSettled, setDealSettled] = useState(false);
  /** Phones get the tall 2×5 table; drives dealt-card spots (layout itself is `max-md:` CSS). */
  const [isMobile, setIsMobile] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  /** Bumped on every open so the portal remounts from the correct card spot. */
  const [openGen, setOpenGen] = useState(0);
  const [flyFrom, setFlyFrom] = useState<CardRect | null>(null);
  const [flyActive, setFlyActive] = useState(false);
  const [dimOn, setDimOn] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const closingRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.28 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, [stageRef]);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!landed) {
      setDealSettled(false);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDealSettled(true);
      return;
    }
    const settleMs = DEAL_TRAVEL_MS + (ITEMS.length - 1) * DEAL_STEP_MS + 40;
    const timer = window.setTimeout(() => setDealSettled(true), settleMs);
    return () => window.clearTimeout(timer);
  }, [landed]);

  useEffect(() => {
    if (openIndex === null || !flyFrom || closingRef.current) {
      return;
    }
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setFlyActive(reduceMotion);
    if (reduceMotion) {
      setDimOn(true);
    }

    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => {
        setFlyActive(true);
        setDimOn(true);
      });
    });

    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
    };
  }, [openIndex, flyFrom]);

  // Freeze scroll without hiding the scrollbar (avoids layout shift).
  useEffect(() => {
    if (openIndex === null) return;
    const block = (event: Event) => {
      if (event instanceof KeyboardEvent) {
        if (SCROLL_KEYS.has(event.key)) event.preventDefault();
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-faq-scroll]")) return;
      event.preventDefault();
    };
    const types = ["wheel", "touchmove", "keydown"] as const;
    types.forEach((type) =>
      window.addEventListener(type, block, { passive: false }),
    );
    return () =>
      types.forEach((type) => window.removeEventListener(type, block));
  }, [openIndex]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const deck = isMobile ? MOBILE_DECK : DECK;
  const spots = isMobile ? MOBILE_SPOTS : SPOTS;
  const openItem = openIndex === null ? null : ITEMS[openIndex];
  const flyTo = typeof window !== "undefined" ? popupSize() : null;
  const restScale =
    flyFrom && flyTo ? flyFrom.width / flyTo.width : 1;

  const openCard = (index: number) => {
    if (openIndex === index && !closingRef.current) return;
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    // Keep dim up when interrupting a close mid-fade, or switching while open.
    const dimStay = closingRef.current || openIndex !== null;
    closingRef.current = false;
    setIsClosing(false);

    const el = cardRefs.current[index];
    if (!el) return;
    // If another card is still "selected"/hidden, measure from its spot coords
    // instead of a mid-flight portal (getBoundingClientRect can be wrong/0).
    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;

    setFlyActive(false);
    setFlyFrom({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setDimOn(dimStay);
    setOpenGen((gen) => gen + 1);
    setOpenIndex(index);
  };

  const finishClose = () => {
    if (!closingRef.current) return;
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenIndex(null);
    setFlyFrom(null);
    setIsClosing(false);
    closingRef.current = false;
  };

  const closeCard = () => {
    if (openIndex === null || closingRef.current) return;
    closingRef.current = true;
    setIsClosing(true);
    setDimOn(false);
    setFlyActive(false);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    // Fallback if transitionend doesn't fire; primary cleanup is onTransitionEnd.
    closeTimerRef.current = window.setTimeout(
      finishClose,
      reduceMotion ? 0 : POPUP_CLOSE_MS + 40,
    );
  };

  const deal = () => {
    if (dealt) return;
    setDealt(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLanded(true);
      return;
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setLanded(true));
    });
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      data-show={inView ? "" : undefined}
      className="group/faq relative overflow-x-clip bg-[#6C0204]"
    >
      <SectionGround>
        <div className="relative w-full">
          {/* Leaves room for the overlay Rail (rendered in page.tsx) to hang over; curtains start at its midpoint. */}
          <div
            aria-hidden
            className="pointer-events-none relative z-0 w-full aspect-[1440/234]"
          >
            <Image
              src={CURTAINS}
              alt=""
              width={1440}
              height={1131}
              draggable={false}
              className={`${ART} absolute left-0 top-1/2 w-full max-w-none`}
            />
          </div>

          <div ref={stageRef} className="relative z-[1] w-full overflow-hidden pb-36 pt-24 md:pb-56 md:pt-60">
            {/* The menu scrolls to this, not the whole section, to center the heading and table. */}
            <div id="faq-content">
            <h2 className="font-righteous relative z-[4] flex items-center justify-center gap-[0.4em] text-[clamp(42px,7vw,88px)] uppercase leading-none tracking-[0.04em] text-[#FFB24C] [-webkit-text-stroke:0.06em_#FDFBED] [paint-order:stroke_fill]">
              <Image
                src={STAR}
                alt=""
                width={47}
                height={48}
                draggable={false}
                className="h-[0.7em] w-auto [-webkit-user-drag:none] [user-drag:none]"
              />
              FAQ
              <Image
                src={STAR}
                alt=""
                width={47}
                height={48}
                draggable={false}
                className="h-[0.7em] w-auto [-webkit-user-drag:none] [user-drag:none]"
              />
            </h2>

          {/* Room above the table for the bear to rise into. On phones the bear, hands and deck keep their desktop spacing scaled ×1.57 so the paws meet the shoulders. */}
          <div className="relative mt-4 w-full pt-[26%] max-md:mx-auto max-md:w-[92%] max-md:max-w-[440px] max-md:pt-[min(36.8vw,176px)] md:mt-12">
            <div className="pointer-events-none absolute left-[25%] top-[8%] z-[1] w-[28%] -translate-x-1/2 max-md:left-[50%] max-md:top-[3.2%] max-md:w-[44%] translate-y-[64%] transition-transform duration-700 ease-out group-data-[show]/faq:translate-y-0 motion-reduce:transition-none [@media(scripting:none)]:translate-y-0">
              <Image
                src={BEAR}
                alt=""
                width={732}
                height={909}
                draggable={false}
                className={ART}
              />
            </div>

            <div className="pointer-events-none absolute left-[46%] top-[10%] z-[5] w-[17%] max-md:left-[64%] max-md:top-[1.6%] max-md:w-[33%] origin-bottom-left scale-90 opacity-0 transition delay-[1100ms] duration-500 ease-out group-data-[show]/faq:scale-100 group-data-[show]/faq:opacity-100 motion-reduce:transition-none [@media(scripting:none)]:scale-100 [@media(scripting:none)]:opacity-100">
              <Image
                src={BUBBLE}
                alt="Have a question? Or do you want to play a game?"
                width={548}
                height={326}
                draggable={false}
                className={ART}
              />
            </div>

            <div className="relative z-[2]">
              <Image
                src={BOTTOM}
                alt=""
                width={1300}
                height={48}
                draggable={false}
                className={`${ART} absolute left-1/2 top-full z-0 mt-8 w-[90%] -translate-x-1/2 md:mt-14`}
              />
              <Image
                src={TABLE}
                alt=""
                width={2140}
                height={896}
                draggable={false}
                className={`${ART} relative z-[1] block max-md:hidden`}
              />
              {/* Phones: the same table stood up tall (CSS, colors sampled from the art). */}
              <div
                aria-hidden
                className="pointer-events-none relative z-[1] aspect-[1/3] w-full rounded-full border-[18px] border-b-[30px] border-[#FFB24C] bg-[#152F0C] md:hidden"
              >
                <div className="absolute inset-[3%_5%] rounded-full border-2 border-[#F0C485]" />
              </div>
              <div className="absolute left-[14%] top-[8%] z-[2] w-[8%] max-md:left-[32.7%] max-md:top-[2.8%] max-md:w-[12.6%]">
                <Image
                  src={STACK}
                  alt=""
                  width={998}
                  height={313}
                  draggable={false}
                  className={`${ART} transition-transform duration-500 ${dealt ? "scale-[0.94]" : ""}`}
                />
              </div>
              <div className="pointer-events-none absolute left-[13%] top-[-28%] z-[4] w-[30%] max-md:left-[31.1%] max-md:top-[-5.07%] max-md:w-[47.1%] opacity-0 transition-opacity delay-700 duration-500 ease-out group-data-[show]/faq:opacity-100 motion-reduce:transition-none [@media(scripting:none)]:opacity-100">
                <Image
                  src={HANDS}
                  alt=""
                  width={689}
                  height={375}
                  draggable={false}
                  className={ART}
                />
              </div>

              <div className="absolute left-1/2 top-[-4%] z-20 w-[7%] -translate-x-1/2 max-md:left-[55%] max-md:top-[3.3%] max-md:w-[16%]">
                <button
                  type="button"
                  onClick={deal}
                  disabled={dealt}
                  aria-label={dealt ? "Cards dealt" : "Deal the cards"}
                  className="group/chip relative w-full origin-center border-0 bg-transparent p-0 enabled:cursor-pointer"
                >
                  <Image
                    src={CHIP_STACK}
                    alt=""
                    width={893}
                    height={911}
                    draggable={false}
                    className={`${ART} origin-center transition-transform duration-150 ${
                      dealt
                        ? ""
                        : "animate-chip-blink motion-reduce:animate-none group-hover/chip:scale-[1.07] group-hover/chip:animate-chip-glow-hold group-focus-visible/chip:scale-[1.07] group-focus-visible/chip:animate-chip-glow-hold"
                    }`}
                  />
                </button>
                {dealt ? null : (
                  <p className="font-righteous pointer-events-none absolute left-1/2 top-full mt-2 w-max max-w-[90vw] -translate-x-1/2 text-center text-[clamp(13px,1.5vw,22px)] leading-tight tracking-[0.03em] text-[#FDFBED] [text-shadow:0_2px_4px_rgb(0_0_0/0.55)] max-md:max-w-[8.5rem] max-md:text-[15px]">
                    <span className="md:hidden">Tap the chips to deal in!</span>
                    <span className="max-md:hidden">Click on the chips to deal in!</span>
                  </p>
                )}
              </div>

              {dealt && landed && openIndex === null ? (
                <p className="font-righteous pointer-events-none absolute left-1/2 top-[78%] z-[5] w-max max-w-[90vw] -translate-x-1/2 text-center text-[clamp(11px,1.2vw,17px)] leading-tight tracking-[0.03em] text-[#FDFBED] [text-shadow:0_2px_4px_rgb(0_0_0/0.55)] max-md:top-[93%] max-md:text-[15px]">
                  <span className="md:hidden">Tap a card to flip it!</span>
                  <span className="max-md:hidden">Click a card to flip it!</span>
                </p>
              ) : null}

              {openItem && flyFrom && flyTo && openIndex !== null
                ? createPortal(
                    <>
                      <button
                        type="button"
                        aria-label="Close card"
                        onClick={closeCard}
                        className="fixed inset-0 z-[70] border-0 bg-black p-0"
                        style={{
                          opacity: dimOn ? 0.75 : 0,
                          transition: `opacity ${isClosing ? POPUP_CLOSE_MS : POPUP_OPEN_MS}ms ${POPUP_EASE}`,
                          pointerEvents: isClosing ? "none" : "auto",
                        }}
                      />
                      <div
                        key={`${openIndex}-${openGen}`}
                        role="button"
                        tabIndex={0}
                        aria-label={
                          isClosing
                            ? `${openItem.question}. Click to reopen.`
                            : `${openItem.question}. Click to close.`
                        }
                        onClick={(event) => {
                          if ((event.target as HTMLElement).closest("a")) return;
                          if (isClosing) {
                            openCard(openIndex);
                            return;
                          }
                          closeCard();
                        }}
                        onKeyDown={(event) => {
                          if (event.key !== "Enter" && event.key !== " ") return;
                          event.preventDefault();
                          if (isClosing) {
                            openCard(openIndex);
                            return;
                          }
                          closeCard();
                        }}
                        className="fixed z-[80] origin-center cursor-pointer border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#FDFBED]"
                        style={{
                          top: flyTo.top,
                          left: flyTo.left,
                          width: flyTo.width,
                          height: flyTo.height,
                          perspective: "1200px",
                        }}
                      >
                        <div
                          className="h-full w-full [transform-style:preserve-3d]"
                          style={{
                            transform: flyActive
                              ? "translate(0px, 0px) scale(1)"
                              : `translate(${flyFrom.left + flyFrom.width / 2 - (flyTo.left + flyTo.width / 2)}px, ${flyFrom.top + flyFrom.height / 2 - (flyTo.top + flyTo.height / 2)}px) scale(${restScale})`,
                            transition: `transform ${isClosing ? POPUP_CLOSE_MS : POPUP_OPEN_MS}ms ${POPUP_EASE}`,
                          }}
                          onTransitionEnd={(event) => {
                            if (event.target !== event.currentTarget) return;
                            if (event.propertyName !== "transform") return;
                            if (!isClosing) return;
                            finishClose();
                          }}
                        >
                          <div
                            className="relative h-full w-full [transform-style:preserve-3d]"
                            style={{
                              transform: flyActive
                                ? "rotateY(180deg)"
                                : "rotateY(0deg)",
                              transition: `transform ${isClosing ? POPUP_CLOSE_MS : POPUP_OPEN_MS}ms ${POPUP_EASE}`,
                            }}
                          >
                            <div
                              className="absolute inset-0"
                              aria-hidden={flyActive && !isClosing}
                              style={{
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transform: "translateZ(1px)",
                                opacity: flyActive && !isClosing ? 0 : 1,
                                transition: flyActive
                                  ? `opacity 0ms linear ${POPUP_OPEN_MS}ms`
                                  : "opacity 0ms linear",
                                pointerEvents: "none",
                              }}
                            >
                              <FaqCardBack />
                            </div>
                            <div
                              className="absolute inset-0"
                              style={{
                                backfaceVisibility: "hidden",
                                WebkitBackfaceVisibility: "hidden",
                                transform: "rotateY(180deg) translateZ(1px)",
                              }}
                            >
                              <FaqCardFace
                                number={openIndex + 1}
                                question={openItem.question}
                                answer={openItem.answer}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>,
                    document.body,
                  )
                : null}

              {/* Questions at rest spots — fade in after deal. */}
              {dealt &&
                landed &&
                ITEMS.map((item, index) => {
                  const spot = spots[index];
                  return (
                    <div
                      key={`q-${item.question}`}
                      className="pointer-events-none absolute z-[4] aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 md:w-[10.5%]"
                      style={{
                        left: `${spot.x}%`,
                        top: `${spot.y}%`,
                        opacity: dealSettled ? 1 : 0,
                        transition: `opacity 450ms ease-out ${index * 40}ms`,
                      }}
                    >
                      <p
                        className="font-righteous absolute bottom-[100%] left-1/2 mb-[0.6em] w-[112%] -translate-x-1/2 text-center leading-[1.15] tracking-[0.02em] text-[#FDFBED] [text-shadow:0_1px_3px_rgb(0_0_0/0.75)] md:w-[160%]"
                        style={{
                          fontSize: isMobile
                            ? "15px"
                            : "clamp(8px, calc(8px + (100vw - 575px) * 0.0115), 16px)",
                        }}
                      >
                        <span className="line-clamp-2">{item.question}</span>
                      </p>
                    </div>
                  );
                })}

              {dealt &&
                ITEMS.map((item, index) => {
                  const spot = spots[index];
                  const selected = openIndex === index;
                  const x = landed ? spot.x : deck.x;
                  const y = landed ? spot.y : deck.y;
                  const dealMs = index * DEAL_STEP_MS;
                  const moveTransition = dealSettled
                    ? `left ${POPUP_MS}ms ${POPUP_EASE}, top ${POPUP_MS}ms ${POPUP_EASE}, opacity 0ms linear`
                    : `opacity 0ms linear ${dealMs}ms, left ${DEAL_TRAVEL_MS}ms ease-out ${dealMs}ms, top ${DEAL_TRAVEL_MS}ms ease-out ${dealMs}ms`;
                  return (
                    <div
                      key={item.question}
                      ref={(node) => {
                        cardRefs.current[index] = node;
                      }}
                      role="button"
                      tabIndex={landed && !selected ? 0 : -1}
                      aria-expanded={selected && !isClosing}
                      aria-hidden={selected || undefined}
                      aria-label={item.question}
                      onClick={() => {
                        if (!landed || selected) return;
                        openCard(index);
                      }}
                      onKeyDown={(event) => {
                        if (!landed || selected) return;
                        if (event.key !== "Enter" && event.key !== " ") return;
                        event.preventDefault();
                        openCard(index);
                      }}
                      className="group/card absolute z-[3] aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#FDFBED] md:w-[10.5%]"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        opacity: !landed || selected ? 0 : 1,
                        transition: moveTransition,
                        pointerEvents: selected ? "none" : undefined,
                      }}
                    >
                      <div className="relative h-full w-full origin-center transition-transform duration-150 ease-out group-hover/card:scale-[1.06] group-focus-visible/card:scale-[1.06]">
                        <FaqCardBack />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          </div>
          </div>
        </div>
      </SectionGround>
    </section>
  );
}
