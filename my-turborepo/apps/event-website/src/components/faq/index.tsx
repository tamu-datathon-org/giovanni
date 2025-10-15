"use client";

import React, { useState } from "react";

type FaqItem = { question: string; answer: string };

const ITEMS: FaqItem[] = [
  { question: "What is the Datathon?", answer: "A weekend-long event where students build data-driven projects and compete for prizes." },
  { question: "How much should I know?", answer: "We have challenges for beginners to advanced. TAMU Datathon is the perfect time and place to learn." },
  { question: "Who can attend?", answer: "We welcome students from all across the world and from all majors! Undergraduate or graduate student at least 18 years of age and anyone who has graduated within one year of the event." },
  { question: "How do teams work?", answer: "Teams up to 4. We encourage working with a team, it's more fun! Form ahead of time or join one during the event." },
  { question: "What should I bring?", answer: "Please remember to bring your laptop and charger. Since the event lasts overnight, it is a good idea to bring a pillow and sleeping bag." },
  { question: "Are there workshops?", answer: "Yes. We host beginner-friendly workshops on data tools and ML all weekend." },
  { question: "Is it free to attend?", answer: "Yes attendance is free. Meals, snacks, and swag are provided." },
  { question: "What’s the schedule?", answer: "Opening Saturday morning hacking through the weekend with judging Sunday." },
  { question: "Have another question?", answer: "Send us an email at connect@tamudatathon.com." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section aria-label="Frequently Asked Questions" className="w-full bg-gradient-to-b from-[#322C29] to-[#1B0706] pb-20" id="faq">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-6xl font-bold m-40 text-center text-white">FAQ</h2>

        {/* 1/row mobile, 2/row sm, 3/row lg (9 items total makes a 3x3 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-36 justify-items-center">
          {ITEMS.map((it, i) => (
            <FaqCard
              key={i}
              title={it.question}
              subtitle1={it.answer}
              sealText="FAQ"
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  widthClass?: string;
  title?: string;
  subtitle1?: string;
  subtitle2?: string;
  footer?: string;
  sealText?: string;
  isOpen?: boolean;
  onToggle?: () => void;
};

const FaqCard: React.FC<CardProps> = ({
  widthClass = "w-[300px] sm:w-[350px]",
  title = "",
  subtitle1 = "",
  isOpen = false,
  onToggle,
}) => {
  return (
    <div className="card">
      <div
        className={["relative bg-black", widthClass, "font-anonymous transition-all duration-700 aspect-[21/11] sm:aspect-[21/10] flex items-center justify-center"].join(
          " "
        )}
      >
        <div
            className={`transition-all flex flex-col items-center py-5 justify-start duration-300 bg-white w-[90%] h-full absolute z-10 ${
                isOpen ? "-translate-y-32 duration-700" : "-translate-y-10 duration-300"}`}
            onClick={onToggle}
        >
          <p className="text-xl font-semibold text-gray-700 text-center">
            {title}
          </p>
          <p className="mt-5 px-10 text-[10px] sm:text-[12px] text-gray-700 text-center">
            {subtitle1}
          </p>
        </div>

        <div
          onClick={onToggle}
          className={`tp absolute w-full h-full bg-[#947536] transition-all -translate-y-full [clip-path:polygon(50%_50%,_0_100%,_100%_100%)]`}
        />
        <div
          className={`lft transition-all duration-700 absolute w-full h-full bg-[#BB9B5B] [clip-path:polygon(50%_50%,_0_0,_0_100%)] z-30`}
        />
        <div
          className={`rgt transition-all duration-700 absolute w-full h-full bg-[#BB9B5B] [clip-path:polygon(50%_50%,_100%_0,_100%_100%)] z-30`}
        />
        <div
          className={`btm transition-all duration-700 absolute w-full h-full bg-[#BB9B5B] [clip-path:polygon(0%_20%,_100%_20%,_100%_100%,_0%_100%)] z-20`}
        />
        <svg viewBox="0 0 100 100" className="absolute w-full h-full z-30" onClick={onToggle}>
          <polygon
            points="-20,20 120,20 200,75 -100,75"
            fill="none"
            stroke="#947536"
            strokeWidth="3"
          />
        </svg>
        <div
          className={`btm transition-all duration-700 absolute w-full h-full bg-[#BB9B5B] [clip-path:polygon(0%_70%,_100%_70%,_100%_100%,_0%_100%)] z-30`}
          onClick={onToggle}
        />
      </div>
    </div>
  );
};
