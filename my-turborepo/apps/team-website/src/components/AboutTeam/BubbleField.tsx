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
import styles from "./team.module.css";

const socialIcons = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  email: Mail,
  website: Globe,
  twitter: ArrowUpRight,
} satisfies Record<SocialLink["type"], typeof Globe>;

// Below this field width the `mobile` grid is used (matches Tailwind's md).
const MOBILE_GRID_BREAKPOINT = 768;

function Portrait({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false);
  return (
    <>
      <span className={styles.initials} aria-hidden="true">
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
          className={styles.photo}
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
      <h3>{member.name}</h3>
      <p>{member.position}</p>
      {!member.position.toLowerCase().includes(team.name.toLowerCase()) && (
        <p className={styles.subteam}>{team.name}</p>
      )}
      {!!member.socialLinks?.length && (
        <div className={styles.socials}>
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
      className={styles.bubble}
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
        className={styles.portrait}
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
        className={styles.caption}
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
      className={styles.track}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          resetView();
          headingRef.current?.focus({ preventScroll: true });
        }
      }}
    >
      <div
        ref={stageRef}
        className={styles.stage}
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
          className={styles.heading}
          tabIndex={-1}
        >
          MEET THE <span>TEAM</span>
        </h2>
        <div className={styles.body}>
          <div
            ref={fieldRef}
            className={styles.field}
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
                className={styles.panCanvas}
                style={{
                  width: geometry.width + bounds.maxX - bounds.minX,
                  height: geometry.height + bounds.maxY - bounds.minY,
                }}
              >
                <ul className={styles.bubbles} aria-label="Team members">
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
              <div className={styles.roster}>
                {visibleTeams.map((team) => (
                  <section
                    key={team.id}
                    id={`team-${team.id}`}
                    className={styles.staticTeam}
                    style={{ "--team-color": team.color } as CSSProperties}
                    aria-labelledby={`heading-${team.id}`}
                  >
                    <h3
                      id={`heading-${team.id}`}
                      className={styles.teamHeading}
                    >
                      <span className={styles.swatch} aria-hidden="true" />
                      {team.name}
                    </h3>
                    <ul className={styles.staticMembers}>
                      {team.teamMembers.map((member) => (
                        <li key={member.id} className={styles.staticMember}>
                          <div className={styles.staticPortrait}>
                            <Portrait member={member} />
                          </div>
                          <div className={styles.staticCaption}>
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
              <p className={styles.empty}>Our next team is coming soon.</p>
            )}
          </div>
        </div>
        <div className={styles.bottomLine}>
          {animated && (
            <span>
              <ArrowDown size={14} aria-hidden="true" /> Scroll here in any
              direction · Scroll beside the faces to continue
            </span>
          )}
          {animated && (
            <button
              type="button"
              className={styles.resetView}
              onClick={resetView}
            >
              Reset view
            </button>
          )}
          <span className={styles.stars} aria-hidden="true">
            ✳ ✳ ✳
          </span>
        </div>
      </div>
    </div>
  );
}
