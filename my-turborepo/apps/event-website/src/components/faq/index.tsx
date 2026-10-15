"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";

import { SectionGround } from "@/components/SectionGround";

const DIVIDER = "/event_assets/faq/divider.png";
const FAQ_BG = "/event_assets/faq/faq-bg.png";
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

const SPOTS = [
  { x: 12, y: 32, r: -7 },
  { x: 31, y: 32, r: -3 },
  { x: 50, y: 32, r: 0 },
  { x: 69, y: 32, r: 3 },
  { x: 88, y: 32, r: 7 },
  { x: 12, y: 58, r: -7 },
  { x: 31, y: 58, r: -3 },
  { x: 50, y: 58, r: 0 },
  { x: 69, y: 58, r: 3 },
  { x: 88, y: 58, r: 7 },
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
        <strong key={index} className="font-bold text-[#8F0000]">
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const idBase = useId();

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

  const open = openIndex === null ? null : ITEMS[openIndex];

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      data-show={inView ? "" : undefined}
      className="group/faq relative overflow-x-clip bg-[#6C0204]"
    >
      <SectionGround>
        <Image
          src={DIVIDER}
          alt=""
          width={1440}
          height={234}
          draggable={false}
          className={`${ART} block w-full`}
        />

        <div ref={stageRef} className="relative w-full overflow-hidden pb-36 pt-24 md:pb-56 md:pt-80">
          <Image
            src={FAQ_BG}
            alt=""
            width={1440}
            height={1786}
            draggable={false}
            className={`${ART} absolute left-0 top-0 w-full max-w-none`}
          />

          <h2 className="font-righteous relative z-[4] flex items-center justify-center gap-[0.4em] text-[clamp(42px,7vw,88px)] uppercase leading-none tracking-[0.04em] text-[#FFB24C]">
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
          <div className="relative mt-4 w-full pt-[27%] md:mt-0">
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
                height={1117}
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
              <div className="pointer-events-none absolute left-[9%] top-[-20%] z-[4] w-[38%] opacity-0 transition-opacity delay-700 duration-500 ease-out group-data-[show]/faq:opacity-100 motion-reduce:transition-none [@media(scripting:none)]:opacity-100">
                <Image
                  src={HANDS}
                  alt=""
                  width={689}
                  height={375}
                  draggable={false}
                  className={ART}
                />
              </div>

              <div className="absolute left-1/2 top-[5%] z-20 w-[14%] -translate-x-1/2 sm:w-[11%]">
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

              {dealt &&
                ITEMS.map((item, index) => {
                  const spot = SPOTS[index];
                  const selected = openIndex === index;
                  const x = landed ? spot.x : DECK.x;
                  const y = landed ? spot.y : DECK.y;
                  return (
                    <button
                      key={item.question}
                      type="button"
                      aria-expanded={selected}
                      aria-controls={`${idBase}-answer`}
                      disabled={!landed}
                      onClick={() => setOpenIndex(selected ? null : index)}
                      className="group/card absolute z-[3] aspect-square w-[16%] border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#FDFBED] enabled:cursor-pointer sm:w-[13.5%]"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        zIndex: selected ? 30 : 3,
                        transition: `left 700ms ease-out ${index * 90}ms, top 700ms ease-out ${index * 90}ms, transform 700ms ease-out ${index * 90}ms`,
                        transform: `translate(-50%, -50%) rotate(${landed ? spot.r : -4}deg) scale(${index >= 5 && landed ? 1.08 : 1})`,
                      }}
                    >
                      <span className="block origin-center transition-transform duration-150 ease-out group-hover/card:scale-[1.06] group-focus-visible/card:scale-[1.06]">
                        <Image
                          src={CARD}
                          alt=""
                          width={280}
                          height={280}
                          draggable={false}
                          className={`${ART} drop-shadow-[0_6px_4px_rgb(0_0_0/0.35)] ${selected ? "ring-4 ring-[#FFB24C]" : ""}`}
                        />
                      </span>
                      <span className="sr-only">{item.question}</span>
                    </button>
                  );
                })}

              {open && (
                <div
                  id={`${idBase}-answer`}
                  role="region"
                  aria-label={open.question}
                  className="absolute left-1/2 top-1/2 z-[40] w-[min(78%,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-[1.25rem] bg-[#FDFBED] px-6 py-5 text-left text-[#3a140c] shadow-[0_12px_24px_rgb(0_0_0/0.45)]"
                >
                  <p className="font-righteous text-[clamp(15px,1.7vw,22px)] leading-tight text-[#8F0000]">
                    {open.question}
                  </p>
                  <p className="mt-2 text-[clamp(12px,1.25vw,15px)] leading-snug">
                    {renderAnswer(open.answer)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </SectionGround>
    </section>
  );
}
