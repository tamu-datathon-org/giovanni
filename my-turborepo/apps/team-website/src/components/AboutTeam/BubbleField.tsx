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

import type { BubbleLayout, BubbleSlot } from "./bubble-layout";
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
  fieldHeight,
  onSelect,
}: {
  slot: BubbleSlot;
  layout: BubbleLayout;
  cameraX: MotionValue<number>;
  cameraY: MotionValue<number>;
  cameraLift: MotionValue<number>;
  selectedId: string | null;
  fieldHeight: number;
  onSelect: (slot: BubbleSlot) => void;
}) {
  const [interactive, setInteractive] = useState(false);
  const interactiveRef = useRef(false);
  const selected = selectedId === slot.member.id;
  const projection = useTransform(() =>
    projectBubble(
      slot.row * layout.rowPitch - cameraY.get(),
      fieldHeight,
      slot,
      layout.diameter,
      cameraX.get(),
    ),
  );
  const y = useTransform(() => projection.get().y - cameraLift.get());
  const x = useTransform(() => projection.get().x);
  const scale = useTransform(() => projection.get().scale);
  const captionY = useTransform(() => (layout.diameter / 2) * scale.get() + 12);
  const captionTarget = useTransform(() => {
    if (!selectedId) return projection.get().captionOpacity;
    if (!selected) return 0;
    // Reveal the selected details as the whole cluster settles at the lens.
    const distance = Math.hypot(projection.get().x, projection.get().y);
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
        style={{ scale }}
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

export default function BubbleField({ teams }: { teams: Team[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const legendRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [geometry, setGeometry] = useState({
    width: 0,
    height: 500,
    stageHeight: 0,
    fits: false,
  });
  const [activeTeam, setActiveTeam] = useState("");
  const activeTeamRef = useRef("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedRef = useRef<string | null>(null);
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
  const layout = useMemo(
    () => createBubbleLayout(visibleTeams, geometry.width, geometry.height),
    [visibleTeams, geometry.width, geometry.height],
  );
  const animated = geometry.fits && !reducedMotion && layout.rowCount > 0;
  const bounds = useMemo(() => getBubbleBounds(layout), [layout]);

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
    panTo(0, 0);
  }, [clearSelection, panTo]);

  const syncPan = useCallback(() => {
    const field = fieldRef.current;
    if (!field || !animated) return;
    const x = clamp(field.scrollLeft + bounds.minX, bounds.minX, bounds.maxX);
    const y = clamp(field.scrollTop + bounds.minY, bounds.minY, bounds.maxY);
    cameraXTarget.set(x);
    cameraYTarget.set(y);
    if (selectedRef.current) return;
    // The key follows the closest face, including when panning diagonally.
    let closest: BubbleSlot | undefined;
    let nearestDistance = Infinity;
    for (const slot of layout.slots) {
      const distance = Math.hypot(
        slot.x - x,
        slot.row * layout.rowPitch + slot.offsetY - y,
      );
      if (distance < nearestDistance) {
        closest = slot;
        nearestDistance = distance;
      }
    }
    const team = closest?.team.id ?? "";
    if (team !== activeTeamRef.current) {
      activeTeamRef.current = team;
      setActiveTeam(team);
    }
  }, [animated, bounds, cameraXTarget, cameraYTarget, layout]);

  const selectMember = useCallback(
    (slot: BubbleSlot) => {
      if (selectedRef.current === slot.member.id) return;
      selectedRef.current = slot.member.id;
      setSelectedId(slot.member.id);
      panTo(slot.x, slot.row * layout.rowPitch + slot.offsetY);
      // On short screens, leave space for the selected caption without
      // disabling the bubble experience or clipping its social links.
      cameraLift.set(
        Math.max(0, layout.diameter / 2 + 172 - geometry.height / 2),
      );
      activeTeamRef.current = slot.team.id;
      setActiveTeam(slot.team.id);
    },
    [panTo, cameraLift, layout.rowPitch, layout.diameter, geometry.height],
  );

  useEffect(() => {
    clearSelection();
    if (animated) {
      panTo(0, 0, false);
      syncPan();
    }
  }, [layout, animated, clearSelection, panTo, syncPan]);

  useEffect(() => {
    const stage = stageRef.current;
    const field = fieldRef.current;
    const heading = headingRef.current;
    const legend = legendRef.current;
    if (!stage || !field || !heading || !legend) return;
    const measure = () => {
      const top = window.innerWidth < 992 ? 72 : 0;
      const stageHeight = window.innerHeight - top;
      const wide = stage.clientWidth >= 1100;
      const height =
        stageHeight -
        heading.offsetHeight -
        104 -
        (wide ? 0 : legend.offsetHeight + 16);
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
    [stage, field, heading, legend].forEach((element) =>
      observer.observe(element),
    );
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
          <nav
            ref={legendRef}
            className={styles.legend}
            aria-label="Jump to a subteam"
          >
            <span className={styles.legendTitle}>OUR TEAMS</span>
            <div className={styles.legendLinks}>
              {visibleTeams.map((team) => (
                <a
                  key={team.id}
                  href={`#team-${team.id}`}
                  className={styles.teamLink}
                  aria-current={
                    animated && activeTeam === team.id ? "true" : undefined
                  }
                  style={{ "--team-color": team.color } as CSSProperties}
                  onClick={(event) => {
                    event.preventDefault();
                    if (animated) {
                      clearSelection();
                      const target = layout.slots.find(
                        (slot) =>
                          slot.team.id === team.id &&
                          slot.row === layout.firstRows[team.id],
                      );
                      if (target) selectMember(target);
                    } else {
                      document
                        .getElementById(`team-${team.id}`)
                        ?.scrollIntoView({
                          behavior: "instant",
                          block: "start",
                        });
                    }
                  }}
                >
                  <span className={styles.swatch} aria-hidden="true" />
                  {team.name}
                  <span className={styles.teamCount}>
                    {team.teamMembers.length}
                  </span>
                </a>
              ))}
            </div>
          </nav>
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
            onScroll={syncPan}
            onWheelCapture={(event) => {
              if (!event.ctrlKey && selectedRef.current) clearSelection();
            }}
            onTouchMoveCapture={() => {
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
