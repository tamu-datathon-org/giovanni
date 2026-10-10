"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import { SectionGround } from "@/components/SectionGround";

const DIVIDER = "/event_assets/faq/divider.png";
const FAQ_BG = "/event_assets/faq/curtains.png";
const TABLE = "/event_assets/faq/poker-table-faq.png";
const BOTTOM = "/event_assets/faq/faq-btm.png";
const BEAR = "/event_assets/faq/bear-dealer-body.png";
const HANDS = "/event_assets/faq/bear-hands.png";
const STACK = "/event_assets/faq/card-stack.png";
const CARD = "/event_assets/faq/card.png";
const CHIP_STACK = "/event_assets/faq/chip-stack.png";
const BUBBLE = "/event_assets/faq/faq-wanna-play.png";
const STAR = "/event_assets/sponsors/Star.png";

const ART =
  "pointer-events-none h-auto w-full select-none [-webkit-user-drag:none] [user-drag:none]";

/** Where the deck sits, as a percent of the table. Cards fly out from here. */
const DECK = { x: 16, y: 8 };
const DEAL_STEP_MS = 90;
const DEAL_TRAVEL_MS = 700;
const POPUP_MS = 550;
const FACE_FADE_DELAY_MS = POPUP_MS / 2;
const POPUP_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

type CardRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

function popupSize() {
  const maxW = window.matchMedia("(min-width: 575px)").matches ? 24 * 16 : 26 * 16;
  const vwCap = window.matchMedia("(min-width: 575px)").matches
    ? window.innerWidth * 0.48
    : window.innerWidth * 0.78;
  const width = Math.min(maxW, vwCap);
  const height = width * 1.425;
  return {
    width,
    height,
    top: (window.innerHeight - height) / 2,
    left: (window.innerWidth - width) / 2,
  };
}

const SPOTS = [
  { x: 12, y: 34 },
  { x: 31, y: 34 },
  { x: 50, y: 34 },
  { x: 69, y: 34 },
  { x: 88, y: 34 },
  { x: 12, y: 64 },
  { x: 31, y: 64 },
  { x: 50, y: 64 },
  { x: 69, y: 64 },
  { x: 88, y: 64 },
];

type FaqItem = { question: string; answer: string };

const ITEMS: FaqItem[] = [
  {
    question: "What is TAMU Datathon?",
    answer:
      "A datathon is where you build your analytical skill set and create data-driven solutions in 24 hours. We provide data science lectures, workshops, challenges, prizes, fun activities, swag, food, and more!",
  },
  {
    question: "When is the event?",
    answer:
      "November 9-10th, 2024. A complete schedule will be available at tamudatathon.com/schedule at a later date.",
  },
  {
    question: "Where is the event & how will I get there?",
    answer:
      "The event will take place at the MSC 2300 Bethancourt Ballroom! Parking will be free at a later disclosed location",
  },
  {
    question: "How much do I need to know?",
    answer:
      "If you are new to data science, TAMU Datathon is the perfect time and place to learn. We will provide introductory coursework and mentors to guide you along your journey to complete a data science project. For our more advanced students, our challenges will pique your interest and allow you to put your skills to the test. We are committed to helping you build something you can be proud of!",
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
    question: "I have another question?",
    answer: "Send us an email at connect@tamudatathon.com.",
  },
];

const linkPattern =
  /(https:\/\/tamudatathon\.org\/apply|connect@tamudatathon\.com)/g;

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

export default function FAQ() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [dealt, setDealt] = useState(false);
  const [landed, setLanded] = useState(false);
  const [dealSettled, setDealSettled] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faceReady, setFaceReady] = useState(false);
  /** Text content follows this index so a closing card can't leave stale copy up. */
  const [faceIndex, setFaceIndex] = useState<number | null>(null);
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
    setFaceReady(false);
    setFaceIndex(null);
    setFlyActive(reduceMotion);
    if (reduceMotion) {
      setDimOn(true);
      setFaceIndex(openIndex);
      setFaceReady(true);
    }

    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => {
        setFlyActive(true);
        setDimOn(true);
      });
    });
    const faceTimer = window.setTimeout(() => {
      setFaceIndex(openIndex);
      setFaceReady(true);
    }, reduceMotion ? 0 : FACE_FADE_DELAY_MS);

    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
      window.clearTimeout(faceTimer);
    };
  }, [openIndex, flyFrom]);

  useEffect(() => {
    if (openIndex === null) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [openIndex]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const openItem = openIndex === null ? null : ITEMS[openIndex];
  const faceItem = faceIndex === null ? null : ITEMS[faceIndex];
  const flyTo = typeof window !== "undefined" ? popupSize() : null;

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
    const rect = el.getBoundingClientRect();
    setFlyFrom({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setFlyActive(false);
    setFaceReady(false);
    setFaceIndex(null);
    setDimOn(dimStay);
    setOpenIndex(index);
  };

  const closeCard = () => {
    if (openIndex === null || closingRef.current) return;
    closingRef.current = true;
    setIsClosing(true);
    setDimOn(false);
    setFlyActive(false);
    setFaceReady(false);
    setFaceIndex(null);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setOpenIndex(null);
      setFlyFrom(null);
      setIsClosing(false);
      closingRef.current = false;
      closeTimerRef.current = null;
    }, reduceMotion ? 0 : POPUP_MS);
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
          {/* Anchor height matches the divider so curtains can start at its midpoint. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-0 w-full aspect-[1440/234]"
          >
            <Image
              src={FAQ_BG}
              alt=""
              width={1440}
              height={1426}
              draggable={false}
              className={`${ART} absolute left-0 top-1/2 w-full max-w-none`}
            />
          </div>
          <Image
            src={DIVIDER}
            alt=""
            width={1440}
            height={234}
            draggable={false}
            className={`${ART} relative z-[1] block w-full`}
          />

          <div ref={stageRef} className="relative z-[1] w-full overflow-hidden pb-36 pt-24 md:pb-56 md:pt-60">
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

          {/* Room above the table for the bear to rise into. */}
          <div className="relative mt-4 w-full pt-[27%] md:mt-20">
            <div className="pointer-events-none absolute left-[24%] top-0 z-[1] w-[36%] -translate-x-1/2 translate-y-[64%] transition-transform duration-700 ease-out group-data-[show]/faq:translate-y-0 motion-reduce:transition-none [@media(scripting:none)]:translate-y-0">
              <Image
                src={BEAR}
                alt=""
                width={732}
                height={909}
                draggable={false}
                className={ART}
              />
            </div>

            <div className="pointer-events-none absolute left-[48%] top-[6%] z-[5] w-[22%] origin-bottom-left scale-90 opacity-0 transition delay-[1100ms] duration-500 ease-out group-data-[show]/faq:scale-100 group-data-[show]/faq:opacity-100 motion-reduce:transition-none [@media(scripting:none)]:scale-100 [@media(scripting:none)]:opacity-100">
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
                width={1440}
                height={550}
                draggable={false}
                className={`${ART} relative z-[1] block`}
              />
              <div className="absolute left-[11%] top-[4%] z-[2] w-[10.2%]">
                <Image
                  src={STACK}
                  alt=""
                  width={998}
                  height={313}
                  draggable={false}
                  className={`${ART} transition-transform duration-500 ${dealt ? "scale-[0.94]" : ""}`}
                />
              </div>
              <div className="pointer-events-none absolute left-[9%] top-[-32%] z-[4] w-[38%] opacity-0 transition-opacity delay-700 duration-500 ease-out group-data-[show]/faq:opacity-100 motion-reduce:transition-none [@media(scripting:none)]:opacity-100">
                <Image
                  src={HANDS}
                  alt=""
                  width={689}
                  height={375}
                  draggable={false}
                  className={ART}
                />
              </div>

              <div className="absolute left-1/2 top-[0%] z-20 w-[11%] -translate-x-1/2 sm:w-[9%]">
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
                  <p className="font-righteous pointer-events-none absolute left-1/2 top-full mt-2 w-max max-w-[90vw] -translate-x-1/2 text-center text-[clamp(13px,1.5vw,22px)] leading-tight tracking-[0.03em] text-[#FDFBED] [text-shadow:0_2px_4px_rgb(0_0_0/0.55)]">
                    Click on the chips to deal in!
                  </p>
                )}
              </div>

              {dealt && landed && openIndex === null ? (
                <p className="font-righteous pointer-events-none absolute left-1/2 top-[80%] z-[5] w-max max-w-[90vw] -translate-x-1/2 text-center text-[clamp(13px,1.5vw,22px)] leading-tight tracking-[0.03em] text-[#FDFBED] [text-shadow:0_2px_4px_rgb(0_0_0/0.55)]">
                  Click a card to flip it!
                </p>
              ) : null}

              {openItem && flyFrom && flyTo
                ? createPortal(
                    <>
                      <button
                        type="button"
                        aria-label="Close card"
                        onClick={closeCard}
                        className="fixed inset-0 z-[70] border-0 bg-black p-0"
                        style={{
                          opacity: dimOn ? 0.75 : 0,
                          transition: `opacity ${POPUP_MS}ms ${POPUP_EASE}`,
                          pointerEvents: isClosing ? "none" : "auto",
                        }}
                      />
                      <div
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
                            if (openIndex !== null) openCard(openIndex);
                            return;
                          }
                          closeCard();
                        }}
                        onKeyDown={(event) => {
                          if (event.key !== "Enter" && event.key !== " ") return;
                          event.preventDefault();
                          if (isClosing) {
                            if (openIndex !== null) openCard(openIndex);
                            return;
                          }
                          closeCard();
                        }}
                        className="fixed z-[80] origin-center cursor-pointer border-0 bg-transparent p-0 [perspective:1200px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#FDFBED]"
                        style={{
                          // Final layout size is fixed so text never reflows while growing.
                          top: flyTo.top,
                          left: flyTo.left,
                          width: flyTo.width,
                          height: flyTo.height,
                          transform: flyActive
                            ? "translate(0px, 0px) scale(1)"
                            : `translate(${flyFrom.left + flyFrom.width / 2 - (flyTo.left + flyTo.width / 2)}px, ${flyFrom.top + flyFrom.height / 2 - (flyTo.top + flyTo.height / 2)}px) scale(${flyFrom.width / flyTo.width})`,
                          transition: `transform ${POPUP_MS}ms ${POPUP_EASE}`,
                        }}
                      >
                        <div
                          className="relative h-full w-full [transform-style:preserve-3d]"
                          style={{
                            transform: flyActive
                              ? "rotateY(180deg)"
                              : "rotateY(0deg)",
                            transition: `transform ${POPUP_MS}ms ${POPUP_EASE}`,
                          }}
                        >
                          <div className="absolute inset-0 [backface-visibility:hidden]">
                            <Image
                              src={CARD}
                              alt=""
                              width={280}
                              height={280}
                              draggable={false}
                              className={`${ART} h-full w-full object-contain drop-shadow-[0_6px_4px_rgb(0_0_0/0.35)]`}
                            />
                          </div>
                          <div className="absolute inset-0 flex flex-col overflow-hidden bg-white px-[8%] py-[7%] text-left text-[#1F71DD] shadow-[0_16px_32px_rgb(0_0_0/0.45)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                            <div
                              key={faceIndex ?? "empty"}
                              className={`flex min-h-0 flex-1 flex-col ${
                                faceReady && faceItem && !isClosing
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                              style={{
                                transitionProperty: "opacity",
                                transitionDuration: isClosing
                                  ? "0ms"
                                  : `${POPUP_MS}ms`,
                                transitionTimingFunction: POPUP_EASE,
                              }}
                            >
                              {faceItem ? (
                                <>
                                  <p className="font-righteous shrink-0 text-[clamp(18px,2.8vw,32px)] leading-tight text-[#1F71DD]">
                                    {faceItem.question}
                                  </p>
                                  <div className="mt-3 min-h-0 flex-1 overflow-y-auto text-[clamp(15px,2.1vw,22px)] leading-snug text-[#1F71DD]">
                                    {renderAnswer(faceItem.answer)}
                                  </div>
                                  <p className="font-righteous mt-3 shrink-0 text-center text-[clamp(12px,1.5vw,16px)] tracking-[0.04em] text-[#1F71DD]/70">
                                    Click to close
                                  </p>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>,
                    document.body,
                  )
                : null}

              {dealt &&
                ITEMS.map((item, index) => {
                  const spot = SPOTS[index];
                  const selected = openIndex === index;
                  const x = landed ? spot.x : DECK.x;
                  const y = landed ? spot.y : DECK.y;
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
                      className="group/card absolute z-[3] aspect-square w-[16%] -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#FDFBED] sm:w-[13.5%]"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        // Stay hidden until the flying card finishes closing.
                        opacity: !landed || selected ? 0 : 1,
                        transition: moveTransition,
                        pointerEvents: selected ? "none" : undefined,
                      }}
                    >
                      <div className="relative h-full w-full origin-center transition-transform duration-150 ease-out group-hover/card:scale-[1.06] group-focus-visible/card:scale-[1.06]">
                        <Image
                          src={CARD}
                          alt=""
                          width={280}
                          height={280}
                          draggable={false}
                          className={`${ART} h-full w-full object-contain drop-shadow-[0_6px_4px_rgb(0_0_0/0.35)]`}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          </div>
        </div>
      </SectionGround>
    </section>
  );
}
