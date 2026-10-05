"use client";

import type { MotionStyle, MotionValue } from "framer-motion";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";

import type { BubbleGrid, BubbleLayout, BubbleSlot } from "./bubble-layout";
import type { SocialLink, Team, TeamMember } from "./team-data";
import {
  clamp,
  createBubbleLayout,
  getBubbleBounds,
  projectBubble,
} from "./bubble-layout";

const socialIcons = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  email: Mail,
  website: Globe,
  twitter: ArrowUpRight,
} satisfies Record<SocialLink["type"], typeof Globe>;

/** Body text shared by the bubble caption and the static roster. */
const DETAIL_TEXT = "m-0 text-[0.875rem] leading-[1.4] [overflow-wrap:anywhere]";

// Below this field width the `mobile` grid is used (matches Tailwind's md).
const MOBILE_GRID_BREAKPOINT = 768;

function Portrait({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false);
  return (
    <>
      <span
        className="absolute inset-0 grid place-items-center text-[2rem] font-semibold"
        aria-hidden="true"
      >
        {member.name
          .split(/\s+/)
          .map((part) => part[0])
          .slice(0, 2)
          .join("")}
      </span>
      {member.image && !failed && (
        <Image
          src={member.image}
          alt=""
          fill
          sizes="(max-width: 539px) 180px, 308px"
          className="scale-[1.15] object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </>
  );
}

function MemberDetails({
  member,
  team,
  interactive = true,
}: {
  member: TeamMember;
  team: Team;
  interactive?: boolean;
}) {
  return (
    <>
      <h3 className="mb-[3px] mt-0 text-[1rem] font-bold leading-[1.3] text-td-team [overflow-wrap:anywhere]">
        {member.name}
      </h3>
      <p className={DETAIL_TEXT}>{member.position}</p>
      {!member.position.toLowerCase().includes(team.name.toLowerCase()) && (
        <p className={`${DETAIL_TEXT} text-[#4e6479]`}>{team.name}</p>
      )}
      {!!member.socialLinks?.length && (
        <div className="mt-[5px] flex flex-wrap justify-center gap-[2px]">
          {member.socialLinks.map((link) => {
            const Icon = socialIcons[link.type];
            return (
              <a
                key={`${link.type}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} — ${link.type}`}
                tabIndex={interactive ? 0 : -1}
                className="grid h-9 w-9 place-items-center rounded-[50%] text-td-team hover:bg-[rgb(255_255_255/85%)] hover:text-td-blue focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-td-team focus-visible:outline-offset-[5px]"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}

function Bubble({
  slot,
  layout,
  cameraX,
  cameraY,
  cameraLift,
  selectedId,
  fieldWidth,
  fieldHeight,
  onSelect,
}: {
  slot: BubbleSlot;
  layout: BubbleLayout;
  cameraX: MotionValue<number>;
  cameraY: MotionValue<number>;
  cameraLift: MotionValue<number>;
  selectedId: string | null;
  fieldWidth: number;
  fieldHeight: number;
  onSelect: (slot: BubbleSlot) => void;
}) {
  const [interactive, setInteractive] = useState(false);
  const interactiveRef = useRef(false);
  const selected = selectedId === slot.member.id;
  // The lift is folded in here (rather than subtracted from the result)
  // so a lifted face still shrinks smoothly as it nears the top edge.
  const projection = useTransform(() =>
    projectBubble(
      slot.x - cameraX.get(),
      slot.y - cameraY.get() - cameraLift.get(),
      { width: fieldWidth, height: fieldHeight },
      layout.diameter,
    ),
  );
  const y = useTransform(() => projection.get().y);
  const x = useTransform(() => projection.get().x);
  const scale = useTransform(() => projection.get().scale);
  const visibility = useTransform(() =>
    scale.get() > 0.05 ? "visible" : "hidden",
  );
  const captionY = useTransform(() => (layout.diameter / 2) * scale.get() + 12);
  const captionTarget = useTransform(() => {
    if (!selectedId) return projection.get().captionOpacity;
    if (!selected) return 0;
    // Reveal the selected details as the whole cluster settles at the lens,
    // measured against the un-lifted position so the caption still lands
    // once the camera finishes raising the selected face.
    const relX = slot.x - cameraX.get();
    const relY = slot.y - cameraY.get();
    const distance = Math.hypot(relX, relY);
    return clamp(1 - distance / (layout.diameter * 0.4), 0, 1);
  });
  const opacity = useSpring(captionTarget, { stiffness: 200, damping: 30 });
  const zIndex = useTransform(() => (selected ? 4 : opacity.get() > 0 ? 2 : 1));

  useEffect(() => {
    const update = () => {
      const next = opacity.get() >= 0.9;
      if (next !== interactiveRef.current) {
        interactiveRef.current = next;
        setInteractive(next);
      }
    };
    update();
    return opacity.on("change", update);
  }, [opacity]);

  return (
    <motion.li
      className="absolute left-1/2 top-1/2 h-0 w-0 will-change-transform"
      style={
        {
          x,
          y,
          zIndex,
          "--team-color": slot.team.color,
          "--diameter": `${layout.diameter}px`,
          "--caption-width": `${layout.captionWidth}px`,
        } as MotionStyle
      }
    >
      <motion.button
        type="button"
        // Tighter focus ring than elsewhere to fit the gap between faces.
        className="relative block overflow-hidden rounded-[50%] border-[5px] border-[color:var(--team-color)] bg-[#d0e7f3] ml-[calc(var(--diameter)/-2)] mt-[calc(var(--diameter)/-2)] h-[var(--diameter,148px)] w-[var(--diameter,148px)] cursor-pointer p-0 will-change-transform [box-shadow:0_0_0_3px_#e9f6ff] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-td-team focus-visible:outline-offset-2"
        style={{ scale, visibility }}
        aria-label={`${slot.member.name}, ${slot.member.position}, ${slot.team.name}. Show details`}
        aria-describedby={`details-${slot.member.id}`}
        aria-pressed={selected}
        onPointerDown={(event) => {
          // Mouse focus must not scroll a transformed button before selection.
          if (event.pointerType === "mouse" && event.button === 0)
            event.preventDefault();
        }}
        onFocus={(event) => {
          if (event.currentTarget.matches(":focus-visible")) onSelect(slot);
        }}
        onClick={(event) => {
          event.currentTarget.focus({ preventScroll: true });
          onSelect(slot);
        }}
      >
        <Portrait member={slot.member} />
      </motion.button>
      <motion.div
        id={`details-${slot.member.id}`}
        className="absolute left-[calc(var(--caption-width)/-2)] top-0 w-[var(--caption-width)] rounded-[12px] border border-[rgb(55_123_176/10%)] bg-[rgb(233_246_255/96%)] px-1.5 pb-1 pt-2 text-center [box-shadow:0_4px_14px_rgb(37_76_112/8%)] [will-change:transform,opacity]"
        style={{
          y: captionY,
          opacity,
          pointerEvents: interactive ? "auto" : "none",
        }}
        aria-hidden={!interactive}
      >
        <MemberDetails
          member={slot.member}
          team={slot.team}
          interactive={interactive}
        />
      </motion.div>
    </motion.li>
  );
}

export default function BubbleField({
  teams,
  grid,
}: {
  teams: Team[];
  /** Honeycomb shape per breakpoint; see `BubbleGrid`. */
  grid: { desktop: BubbleGrid; mobile: BubbleGrid };
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [geometry, setGeometry] = useState({
    width: 0,
    height: 500,
    stageHeight: 0,
    fits: false,
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedRef = useRef<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const inactivityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cameraXTarget = useMotionValue(0);
  const cameraYTarget = useMotionValue(0);
  const cameraX = useSpring(cameraXTarget, {
    stiffness: 120,
    damping: 26,
    mass: 1,
  });
  const cameraY = useSpring(cameraYTarget, {
    stiffness: 120,
    damping: 26,
    mass: 1,
  });
  const cameraLift = useSpring(0, { stiffness: 120, damping: 26, mass: 1 });
  const visibleTeams = useMemo(
    () => teams.filter((team) => team.teamMembers.length),
    [teams],
  );
  const { columns, rows } =
    geometry.width < MOBILE_GRID_BREAKPOINT ? grid.mobile : grid.desktop;
  const layout = useMemo(
    () =>
      createBubbleLayout(visibleTeams, geometry.width, geometry.height, {
        columns,
        rows,
      }),
    [visibleTeams, geometry.width, geometry.height, columns, rows],
  );
  const animated = geometry.fits && !reducedMotion && layout.slots.length > 0;
  const bounds = useMemo(() => getBubbleBounds(layout), [layout]);
  // The resting view centers on the middle team's first face (the President),
  // which the layout places at the heart of the cluster.
  const { home } = layout;

  const clearSelection = useCallback(() => {
    selectedRef.current = null;
    setSelectedId(null);
    cameraLift.set(0);
  }, [cameraLift]);

  const panTo = useCallback(
    (x: number, y: number, smooth = true) => {
      fieldRef.current?.scrollTo({
        left: clamp(x, bounds.minX, bounds.maxX) - bounds.minX,
        top: clamp(y, bounds.minY, bounds.maxY) - bounds.minY,
        behavior: smooth && !reducedMotion ? "smooth" : "instant",
      });
    },
    [bounds, reducedMotion],
  );

  const resetView = useCallback(() => {
    clearSelection();
    panTo(home.x, home.y);
  }, [clearSelection, panTo, home]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    setIsActive(true);
    inactivityTimeoutRef.current = setTimeout(() => {
      panTo(home.x, home.y);
      setIsActive(false);
    }, 5000); // 5 seconds of inactivity
  }, [panTo, home]);

  const syncPan = useCallback(() => {
    const field = fieldRef.current;
    if (!field || !animated) return;
    cameraXTarget.set(
      clamp(field.scrollLeft + bounds.minX, bounds.minX, bounds.maxX),
    );
    cameraYTarget.set(
      clamp(field.scrollTop + bounds.minY, bounds.minY, bounds.maxY),
    );
  }, [animated, bounds, cameraXTarget, cameraYTarget]);

  const selectMember = useCallback(
    (slot: BubbleSlot) => {
      if (selectedRef.current === slot.member.id) return;
      selectedRef.current = slot.member.id;
      setSelectedId(slot.member.id);
      panTo(slot.x, slot.y);
      // On short screens, leave space for the selected caption without
      // disabling the bubble experience or clipping its social links.
      cameraLift.set(
        Math.max(0, layout.diameter / 2 + 172 - geometry.height / 2),
      );
    },
    [panTo, cameraLift, layout.diameter, geometry.height],
  );

  useEffect(() => {
    clearSelection();
    if (animated) {
      panTo(home.x, home.y, false);
      syncPan();
    }
  }, [layout, animated, clearSelection, panTo, syncPan, home]);

  useEffect(() => {
    const stage = stageRef.current;
    const field = fieldRef.current;
    const heading = headingRef.current;
    if (!stage || !field || !heading) return;
    const measure = () => {
      const top = window.innerWidth < 992 ? 72 : 0;
      const stageHeight = window.innerHeight - top;
      const height = stageHeight - heading.offsetHeight - 104;
      const fontSize = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      const next = {
        width: field.clientWidth,
        height: Math.max(1, height),
        stageHeight,
        fits: height >= 400 && field.clientWidth >= 280 && fontSize <= 20,
      };
      setGeometry((previous) =>
        Object.keys(next).every(
          (key) =>
            previous[key as keyof typeof next] ===
            next[key as keyof typeof next],
        )
          ? previous
          : next,
      );
    };
    const observer = new ResizeObserver(measure);
    [stage, field, heading].forEach((element) => observer.observe(element));
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      className="relative [overflow-anchor:none]"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          resetView();
          headingRef.current?.focus({ preventScroll: true });
        }
      }}
    >
      <div
        ref={stageRef}
        // The faint grid sits behind the stage on a ::before.
        className="relative isolate bg-td-paper px-5 pb-4 pt-6 before:pointer-events-none before:absolute before:inset-0 before:z-[-1] before:bg-[url('/images/team/grid.png')] before:bg-repeat before:bg-fixed before:opacity-10 before:content-[''] data-[animated=true]:min-h-[var(--stage-height)] [@media(max-width:380px)]:px-3"
        data-animated={animated}
        style={
          {
            "--stage-height": `${geometry.stageHeight}px`,
            "--field-height": `${geometry.height}px`,
            "--viewport-width": `${geometry.width}px`,
          } as CSSProperties
        }
      >
        <h2
          ref={headingRef}
          id="team-heading"
          className="mb-6 mt-0 text-center font-konkhmer text-[length:clamp(2rem,5.6vw,5rem)] font-normal leading-[1.2] tracking-[-0.055em] text-td-blue"
          tabIndex={-1}
        >
          MEET THE <span className="text-td-teal">TEAM</span>
        </h2>
        <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] gap-4">
          <div
            ref={fieldRef}
            // When animated the field goes full-bleed, breaking out of the
            // body's max-width and the stage's padding to span the window.
            className={`relative min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-td-blue ${
              animated
                ? "mx-[calc(50%-50vw)] h-[var(--field-height)] w-screen max-w-[100vw] overflow-auto overscroll-x-contain overscroll-y-auto [scroll-behavior:auto] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                : ""
            }`}
            tabIndex={animated ? 0 : undefined}
            role={animated ? "region" : undefined}
            aria-label={
              animated
                ? "Team faces. Scroll in any direction to explore; scroll outside this area to move down the page."
                : undefined
            }
            onScroll={() => {
              resetInactivityTimer();
              syncPan();
            }}
            onWheelCapture={(event) => {
              resetInactivityTimer();
              if (!event.ctrlKey && selectedRef.current) clearSelection();
            }}
            onTouchMoveCapture={() => {
              resetInactivityTimer();
              if (selectedRef.current) clearSelection();
            }}
            onKeyDown={(event) => {
              if (
                [
                  "ArrowUp",
                  "ArrowDown",
                  "ArrowLeft",
                  "ArrowRight",
                  "PageUp",
                  "PageDown",
                  "Home",
                  "End",
                  " ",
                ].includes(event.key) &&
                event.target === event.currentTarget
              )
                clearSelection();
            }}
          >
            {animated ? (
              <div
                className="relative"
                style={{
                  width: geometry.width + bounds.maxX - bounds.minX,
                  height: geometry.height + bounds.maxY - bounds.minY,
                }}
              >
                <ul
                  className="sticky left-0 top-0 m-0 h-[var(--field-height)] w-[var(--viewport-width)] list-none p-0"
                  aria-label="Team members"
                >
                  {layout.slots.map((slot) => (
                    <Bubble
                      key={slot.member.id}
                      slot={slot}
                      layout={layout}
                      cameraX={cameraX}
                      cameraY={cameraY}
                      cameraLift={cameraLift}
                      selectedId={selectedId}
                      fieldWidth={geometry.width}
                      fieldHeight={geometry.height}
                      onSelect={selectMember}
                    />
                  ))}
                </ul>
              </div>
            ) : (
              <div className="grid gap-10 py-6">
                {visibleTeams.map((team) => (
                  <section
                    key={team.id}
                    id={`team-${team.id}`}
                    className="scroll-mt-24"
                    style={{ "--team-color": team.color } as CSSProperties}
                    aria-labelledby={`heading-${team.id}`}
                  >
                    <h3
                      id={`heading-${team.id}`}
                      className="mb-6 flex items-center justify-center gap-2.5 font-konkhmer text-[1.25rem]"
                    >
                      <span
                        className="inline-block h-3 w-3 shrink-0 rounded-[50%] border-[3px] border-[color:var(--team-color)] bg-td-paper"
                        aria-hidden="true"
                      />
                      {team.name}
                    </h3>
                    <ul className="m-0 flex list-none flex-wrap justify-center gap-x-4 gap-y-6 p-0">
                      {team.teamMembers.map((member) => (
                        <li
                          key={member.id}
                          className="w-[min(180px,calc(50%-8px))] text-center"
                        >
                          <div className="relative block overflow-hidden rounded-[50%] border-[5px] border-[color:var(--team-color)] bg-[#d0e7f3] mx-auto mb-4 mt-0 aspect-square h-auto w-[min(148px,100%)] [box-shadow:0_0_0_4px_#e9f6ff,0_6px_12px_rgb(37_76_112/12%)]">
                            <Portrait member={member} />
                          </div>
                          <div>
                            <MemberDetails member={member} team={team} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
            {!visibleTeams.length && (
              <p className="px-4 py-12 text-center">Our next team is coming soon.</p>
            )}
          </div>
        </div>
        <div className="mt-2 flex min-h-8 items-center justify-between gap-3 border-t-2 border-t-td-orange text-[0.75rem] [&>span:first-child]:inline-flex [&>span:first-child]:items-center [&>span:first-child]:gap-1.5">
          {animated && (
            <span>
              <ArrowDown size={14} aria-hidden="true" /> Scroll here in any
              direction · Scroll beside the faces to continue
            </span>
          )}
          {animated && (
            <button
              type="button"
              className="ml-auto min-h-8 rounded-[6px] px-2.5 py-1 font-semibold text-td-team enabled:hover:bg-white/80 disabled:cursor-default disabled:opacity-[0.35] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-td-team focus-visible:outline-offset-2"
              onClick={resetView}
            >
              Reset view
            </button>
          )}
          <span
            className="ml-auto text-[1.5rem] leading-none text-td-orange"
            aria-hidden="true"
          >
            ✳ ✳ ✳
          </span>
        </div>
      </div>
    </div>
  );
}
