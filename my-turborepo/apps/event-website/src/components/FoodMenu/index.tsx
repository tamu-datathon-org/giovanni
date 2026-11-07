"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import Image from "next/image";

import scheduleJson from "@/components/Schedule/schedule.json";
import { cn } from "@/lib/utils";

import { DietCoin, LegendStars, MenuSign } from "./art";
import { DIETS, MEALS } from "./menus";
import type { Diet, Meal, MenuSection } from "./menus";
import styles from "./FoodMenu.module.css";

const { timezone, events } = scheduleJson;

const weekdayFmt = new Intl.DateTimeFormat("en-US", { timeZone: timezone, weekday: "short" });
const longWeekdayFmt = new Intl.DateTimeFormat("en-US", { timeZone: timezone, weekday: "long" });
const timeFmt = new Intl.DateTimeFormat("en-US", { timeZone: timezone, hour: "numeric", minute: "2-digit" });

interface Slot {
  meal: Meal;
  /** "Sat Lunch" */
  label: string;
  /** "Saturday · 12:45 PM – 1:45 PM" */
  when: string;
  where?: string;
  start: number;
  end: number;
}

// Each meal's day, name and hours come from its schedule event, so the two never disagree.
const SLOTS: Slot[] = MEALS.map((meal) => {
  const ev = events.find((e) => e.id === meal.id);
  if (!ev) throw new Error(`FoodMenu: no schedule event with id "${meal.id}"`);
  const start = new Date(ev.startTime);
  const end = new Date(ev.endTime);
  return {
    meal,
    label: `${weekdayFmt.format(start)} ${ev.title}`,
    when: `${longWeekdayFmt.format(start)} · ${timeFmt.format(start)} – ${timeFmt.format(end)}`,
    where: ev.location,
    start: start.getTime(),
    end: end.getTime(),
  };
});

const dietLabel = (diet: Diet) => DIETS.find((d) => d.id === diet)?.label ?? diet;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function FoodMenu() {
  const [mealId, setMealId] = useState(SLOTS[0].meal.id);
  const [diet, setDiet] = useState<Diet | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // #menu-<meal id> (the schedule's meal rows link here) opens that meal; otherwise open the one being served or up next.
  useEffect(() => {
    const openFromHash = () => {
      const id = /^#menu-(.+)$/.exec(window.location.hash)?.[1];
      if (!id || !SLOTS.some((s) => s.meal.id === id)) return false;
      setMealId(id);
      boardRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      return true;
    };
    if (!openFromHash()) {
      const t = Date.now();
      const current = SLOTS.find((s) => s.end > t);
      if (current) setMealId(current.meal.id);
    }
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const slot = SLOTS.find((s) => s.meal.id === mealId) ?? SLOTS[0];
  const current = now == null ? undefined : SLOTS.find((s) => s.end > now);
  const isLive = (s: Slot) => s === current && now != null && now >= s.start;
  const badge =
    now == null ? null : slot === current ? (isLive(slot) ? "Serving now" : "Up next") : now >= slot.end ? "Served" : null;
  const matches = diet
    ? slot.meal.sections.flatMap((s) => s.items).filter((item) => item.diets?.includes(diet)).length
    : 0;

  const select = (id: string) => {
    setMealId(id);
    history.replaceState(null, "", `#menu-${id}`);
  };

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = SLOTS.indexOf(slot);
    const keys: Partial<Record<string, number>> = {
      ArrowRight: i + 1,
      ArrowDown: i + 1,
      ArrowLeft: i - 1,
      ArrowUp: i - 1,
      Home: 0,
      End: SLOTS.length - 1,
    };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const target = SLOTS[(next + SLOTS.length) % SLOTS.length];
    select(target.meal.id);
    document.getElementById(`menu-tab-${target.meal.id}`)?.focus();
  };

  return (
    <section
      id="menu"
      aria-labelledby="menu-title"
      className="relative px-4 pb-[clamp(80px,10vw,128px)] sm:px-[clamp(16px,5vw,64px)]"
    >
      <h2 id="menu-title" className="sr-only">
        Food menu
      </h2>
      <div
        ref={boardRef}
        className="mx-auto max-w-[1180px] scroll-mt-6 overflow-hidden rounded-lg bg-gradient-to-b from-[#2d2d2d] to-black py-[clamp(14px,2.6vw,32px)] font-righteous text-[#fdfbed] shadow-[0_30px_80px_rgb(0_0_0/0.5)] [container-type:inline-size]"
      >
        <Rule />

        <div className="my-[clamp(20px,4cqw,52px)] grid grid-cols-[76px_minmax(0,1fr)] gap-x-3 gap-y-5 px-[clamp(12px,3cqw,40px)] [grid-template-areas:'sign_tabs'_'legend_legend'_'panel_panel'] md:grid-cols-[30%_minmax(0,1fr)] md:grid-rows-[auto_1fr] md:gap-x-0 md:gap-y-[clamp(28px,4cqw,48px)] md:[grid-template-areas:'side_tabs'_'side_panel']">
          {/* On phones the sign and legend take their own grid cells; from md up they stack in one column. */}
          <div className="contents md:relative md:z-10 md:-mr-[11%] md:block md:self-start md:[container-type:inline-size] md:[grid-area:side]">
            <MenuSign className="w-full self-start [grid-area:sign]" />

            <div className="relative [grid-area:legend] md:mt-[2cqw] md:min-h-[130cqw]">
              <LegendStars />
              <div
                role="group"
                aria-label="Highlight dishes by diet"
                className="relative flex flex-wrap items-center gap-x-4 gap-y-2 md:w-[34cqw] md:flex-col md:flex-nowrap md:gap-0"
              >
                {DIETS.map(({ id, label }) => {
                  const on = diet === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setDiet(on ? null : id)}
                      className={cn(
                        "group flex items-center gap-1.5 whitespace-nowrap rounded-full text-[13px] transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffb24c] md:flex-col md:gap-0 md:text-[6.67cqw] md:leading-[1.5]",
                        diet && !on && "opacity-50",
                      )}
                    >
                      <DietCoin
                        diet={id}
                        className={cn(
                          "size-8 transition-transform duration-300 ease-out group-hover:-rotate-[20deg] md:size-[18.67cqw]",
                          on && "-rotate-[20deg] scale-110 drop-shadow-[0_0_10px_#ffb24c]",
                        )}
                      />
                      <span className={cn("transition-colors", on && "text-[#ffb24c]")}>{label}</span>
                    </button>
                  );
                })}
                <span className="basis-full text-[11px] text-[#fdfbed]/60 md:hidden">Tap a chip to spot dishes</span>
              </div>
              <p className="sr-only" aria-live="polite">
                {diet ? `${matches} ${dietLabel(diet)} ${matches === 1 ? "dish" : "dishes"} highlighted` : ""}
              </p>
            </div>
          </div>

          <div className="self-center [grid-area:tabs] md:self-start md:pl-[6%]">
            <div
              role="tablist"
              aria-label="Meals"
              onKeyDown={onTabKey}
              className="flex flex-col items-stretch gap-2 md:grid md:grid-cols-[repeat(2,max-content)] md:gap-3 xl:flex xl:flex-row"
            >
              {SLOTS.map((s) => {
                const active = s === slot;
                return (
                  <button
                    key={s.meal.id}
                    id={`menu-tab-${s.meal.id}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls="menu-panel"
                    tabIndex={active ? 0 : -1}
                    onClick={() => select(s.meal.id)}
                    className={cn(
                      styles.ribbon,
                      "flex items-center justify-center gap-[0.45em] whitespace-nowrap px-[1.5em] py-[0.45em] text-[clamp(13px,1.55cqw,18px)] leading-tight transition-colors duration-200 [--notch:0.95em] focus-visible:bg-[#ffb24c] focus-visible:text-[#6c0204] focus-visible:outline-none",
                      active ? "bg-[#fdfbed] text-[#6c0204]" : "bg-[#fdfbed]/15 hover:bg-[#fdfbed]/30",
                    )}
                  >
                    {isLive(s) && (
                      <span className={cn(styles.pulse, "size-[0.5em] shrink-0 rounded-full bg-[#55A96E]")} />
                    )}
                    {s.label}
                    {isLive(s) && <span className="sr-only"> (serving now)</span>}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-[clamp(12px,1.4cqw,16px)] leading-snug text-[#fdfbed]/80">
              {badge && (
                <span
                  className={cn(
                    "mr-2 inline-block uppercase tracking-[0.12em]",
                    badge === "Served" ? "text-[#fdfbed]/60" : "text-[#ffb24c]",
                  )}
                >
                  {badge}
                </span>
              )}
              {slot.when}
              {slot.where && ` · ${slot.where}`}
            </p>
          </div>

          <div
            id="menu-panel"
            role="tabpanel"
            aria-labelledby={`menu-tab-${slot.meal.id}`}
            className="flex flex-col gap-[clamp(32px,5cqw,64px)] [grid-area:panel] md:pt-[1cqw]"
          >
            {slot.meal.sections.map((section) => (
              <Panel key={`${slot.meal.id}-${section.title}`} section={section} diet={diet} />
            ))}
          </div>
        </div>

        <Rule bottom />
      </div>
    </section>
  );
}

/** One slanted, patterned board (Entrées or Sides) with its title riding the top edge. */
function Panel({ section, diet }: { section: MenuSection; diet: Diet | null }) {
  return (
    <div className="relative [--hs:clamp(30px,4.4cqw,52px)] [--slant:clamp(18px,6cqw,84px)] [--t:clamp(19px,3.1cqw,38px)]">
      <h3
        className={cn(
          styles.heading,
          "relative z-10 -skew-x-[1.27deg] pl-[0.22em] text-center text-[length:var(--hs)] uppercase leading-[1.32] tracking-[0.22em] text-[#f99b1f]",
        )}
      >
        {section.title}
      </h3>
      <div className="relative -mt-[calc(var(--hs)*0.7)] pb-[clamp(22px,3.6cqw,48px)] pl-[calc(var(--slant)*0.7+clamp(10px,2cqw,28px))] pr-[clamp(10px,2cqw,28px)] pt-[calc(var(--hs)*0.7+clamp(14px,2.2cqw,30px))]">
        <div aria-hidden className={cn(styles.slanted, "absolute inset-0 bg-[#fdfbed]")} />
        <div
          aria-hidden
          className={cn(
            styles.slanted,
            "absolute inset-[clamp(2px,0.35cqw,4px)] bg-[#6c0204] bg-[url('/event_assets/sponsors/background-grid.png')] bg-[length:880px_auto]",
          )}
        />
        <ul className="relative flex flex-col gap-[clamp(18px,2.6cqw,32px)]">
          {section.items.map((item, i) => {
            const dim = diet != null && !item.diets?.includes(diet);
            return (
              <li
                key={item.name}
                className={cn("text-center transition-[opacity,filter] duration-300", dim && "opacity-30 grayscale")}
              >
                <div className={styles.rise} style={{ "--i": i } as CSSProperties}>
                  <h4 className="relative mx-auto flex w-fit max-w-full items-center justify-center gap-[0.3em] px-[1.6em] text-[length:var(--t)] leading-[1.5] text-[#6c0204] [text-wrap:balance]">
                    <span aria-hidden className={cn(styles.ribbon, "absolute inset-0 bg-[#fdfbed]")} />
                    <span className="relative">{item.name}</span>
                    {item.diets?.length ? (
                      <span className="relative -my-[0.2em] flex shrink-0">
                        {item.diets.map((d, j) => (
                          <DietCoin key={d} diet={d} className={cn("size-[1.5em]", j > 0 && "-ml-[0.55em]")} />
                        ))}
                        <span className="sr-only"> ({item.diets.map(dietLabel).join(", ")})</span>
                      </span>
                    ) : null}
                  </h4>
                  <p className="mx-auto mt-[0.45em] max-w-[36em] text-[length:max(14px,calc(var(--t)*0.6))] leading-[1.5] text-white [text-wrap:balance]">
                    {item.description}
                    {item.note && <span className="ml-[0.4em] text-[0.6em]">{item.note}</span>}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** The glowing "tamu datathon" rule across the top and bottom of the poster. */
function Rule({ bottom = false }: { bottom?: boolean }) {
  const line = "h-[clamp(2px,0.4cqw,5px)] rounded-full bg-[#ffb24c]";
  const star = (
    <Image
      src="/event_assets/menu/rule-star.svg"
      alt=""
      width={90}
      height={147}
      draggable={false}
      className="w-[3.6cqw] min-w-[12px] shrink-0"
    />
  );
  const text = (
    <span
      className={cn(
        "shrink-0 font-sekuya leading-none text-[#ffb24c] [text-shadow:0_0_10px_#fcb634]",
        bottom ? "text-[clamp(14px,3.2cqw,38px)]" : "text-[clamp(13px,2.6cqw,30px)]",
      )}
    >
      tamu datathon
    </span>
  );

  return (
    <div aria-hidden className="flex items-center gap-[3.3cqw]">
      {bottom ? (
        <>
          <span className={cn(line, "flex-[66_1_0%]")} />
          {text}
          <span className={cn(line, "flex-[61_1_0%]")} />
          {star}
          <span className={cn(line, "flex-[1115_1_0%]")} />
        </>
      ) : (
        <>
          <span className={cn(line, "flex-[1115_1_0%]")} />
          {star}
          <span className={cn(line, "flex-[139_1_0%]")} />
          {text}
          <span className={cn(line, "flex-[182_1_0%]")} />
        </>
      )}
    </div>
  );
}
