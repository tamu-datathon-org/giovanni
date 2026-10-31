"use client";

import { useCallback, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";

import { SectionGround } from "@/components/SectionGround";

import { SponsorChip } from "./SponsorChip";
import type { ChipColors } from "./SponsorChip";
import { TableGuests } from "./TableGuests";

const TABLE = "/event_assets/sponsors/poker-table-long.png";
/** Soft lighting over the felt and rim, drawn above the printed logo. */
const SHADING = "/event_assets/sponsors/poker-table-long-shading.png";
const STAR = "/event_assets/sponsors/Star.png";
/** The TD logo pre-rendered as grainy felt-green ink (darker where the logo is darker). */
const LOGO_PRINT = "/event_assets/sponsors/td-logo-print.png";
const TABLE_W = 1647;
const TABLE_H = 945;
/**
 * The table art is drawn lying on its side. From `md` up it is shown that way
 * ("h"); below that the whole table is turned a quarter turn clockwise to stand
 * upright ("v"), which leaves room for much larger chips on a phone.
 *
 * The wrapper adds room for the guests around the table, and its percentages
 * come from the art's size: on its side, 180 units all round (2007 x 1305, so
 * the table is 1647/2007 wide, 180/2007 from the left and 180/1305 from the
 * top); upright, 130 units at the sides and ends (1205 x 1907, and the turned
 * table's width is the wrapper's height: 1647/1205 of its width).
 */
type Layout = "h" | "v";
/** Chip diameter as a fraction of the table's length, per layout. */
const CHIP_SIZE: Record<Layout, number> = { h: 0.148, v: 0.17 };

/** A spot on the table art, as fractions of its length (x) and width (y). */
interface Point {
  x: number;
  y: number;
}

interface Chip {
  id: string;
  name: string;
  src: string;
  colors: ChipColors;
  /** Where the chip sits in each layout; dragging only moves the one on screen. */
  h: Point;
  v: Point;
  rotation: number;
  z: number;
}

const INITIAL_CHIPS: Chip[] = [
  { id: "heb", name: "H-E-B", src: "/event_assets/sponsors/heb.png", colors: { body: "#E70020", stripe: "#E70020", ring: "#B10018" }, h: { x: 0.204, y: 0.35 }, v: { x: 0.176, y: 0.529 }, rotation: -21, z: 1 },
  { id: "databricks", name: "Databricks", src: "/event_assets/sponsors/databricks.png", colors: { body: "#FF3621", stripe: "#1B3139", ring: "#C4281A" }, h: { x: 0.757, y: 0.34 }, v: { x: 0.486, y: 0.423 }, rotation: 12, z: 2 },
  { id: "qualcomm", name: "Qualcomm", src: "/event_assets/sponsors/qualcomm.png", colors: { body: "#3253DC", stripe: "#3253DC", ring: "#233CA0" }, h: { x: 0.436, y: 0.245 }, v: { x: 0.316, y: 0.265 }, rotation: -9, z: 3 },
  { id: "hitachi", name: "Hitachi Digital", src: "/event_assets/sponsors/hitachi-digital.png", colors: { body: "#E60012", stripe: "#E60012", ring: "#AE000D" }, h: { x: 0.541, y: 0.465 }, v: { x: 0.528, y: 0.751 }, rotation: -16, z: 4 },
  { id: "sec", name: "SEC", src: "/event_assets/sponsors/sec.png", colors: { body: "#1F1F1F", stripe: "#1F1F1F", ring: "#000000" }, h: { x: 0.812, y: 0.625 }, v: { x: 0.662, y: 0.286 }, rotation: 19, z: 5 },
  { id: "conocophillips", name: "ConocoPhillips", src: "/event_assets/sponsors/conocophillips.png", colors: { body: "#E4002B", stripe: "#1A1A1A", ring: "#A80020" }, h: { x: 0.379, y: 0.76 }, v: { x: 0.704, y: 0.635 }, rotation: -12, z: 6 },
  { id: "phillips", name: "Phillips 66", src: "/event_assets/sponsors/phillips.png", colors: { body: "#E31937", stripe: "#1A1A1A", ring: "#A8122A" }, h: { x: 0.659, y: 0.765 }, v: { x: 0.841, y: 0.418 }, rotation: 22, z: 7 },
  { id: "serp", name: "SerpApi", src: "/event_assets/sponsors/serp.png", colors: { body: "#3B4BF0", stripe: "#161A3A", ring: "#2A36AF" }, h: { x: 0.215, y: 0.62 }, v: { x: 0.34, y: 0.698 }, rotation: 10, z: 8 },
];

/** Which layout is on screen. The query is Tailwind's `md`, where the classes below switch. */
const currentLayout = (): Layout =>
  window.matchMedia("(min-width: 768px)").matches ? "h" : "v";

/** A pointer position as a spot on the table art, undoing the upright turn. */
function toTable(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  layout: Layout,
): Point {
  const across = (clientX - rect.left) / rect.width;
  const down = (clientY - rect.top) / rect.height;
  return layout === "h" ? { x: across, y: down } : { x: down, y: 1 - across };
}

interface TableMask {
  data: Uint8ClampedArray;
  w: number;
  h: number;
}

function sampleOpaque(mask: TableMask, x: number, y: number) {
  const px = Math.round(x);
  const py = Math.round(y);
  if (px < 0 || py < 0 || px >= mask.w || py >= mask.h) return false;
  return mask.data[(py * mask.w + px) * 4 + 3] > 200;
}

/** True when a chip of this size (a fraction of the table's length) is wholly on the table. */
function chipOnTable(mask: TableMask | null, point: Point, size: number) {
  if (!mask) {
    return point.x >= 0.18 && point.x <= 0.82 && point.y >= 0.24 && point.y <= 0.76;
  }

  const cx = point.x * mask.w;
  const cy = point.y * mask.h;
  // A little larger than the chip so the art stops short of the rim.
  const radius = (size / 2) * mask.w + 2;
  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2;
    if (!sampleOpaque(mask, cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius)) {
      return false;
    }
  }
  return sampleOpaque(mask, cx, cy);
}

function approach(from: number, to: number, ok: (value: number) => boolean) {
  if (!ok(from)) return from;
  let low = 0;
  let high = 1;
  let best = from;
  for (let i = 0; i < 12; i++) {
    const mid = (low + high) / 2;
    const value = from + (to - from) * mid;
    if (ok(value)) {
      best = value;
      low = mid;
    } else {
      high = mid;
    }
  }
  return best;
}

/** Slide along the table edge instead of stopping dead when a drag hits it. */
function constrain(
  mask: TableMask | null,
  from: Point,
  to: Point,
  size: number,
): Point {
  if (chipOnTable(mask, to, size)) return to;

  const x = approach(from.x, to.x, (value) =>
    chipOnTable(mask, { x: value, y: from.y }, size),
  );
  const y = approach(from.y, to.y, (value) =>
    chipOnTable(mask, { x, y: value }, size),
  );
  return { x, y };
}

function Sponsors() {
  const tableRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<TableMask | null>(null);
  const chipsRef = useRef(INITIAL_CHIPS);
  // The offset from the chip's center to where it was grabbed, in table fractions.
  const dragRef = useRef<{
    id: string;
    layout: Layout;
    dx: number;
    dy: number;
  } | null>(null);
  const zRef = useRef(INITIAL_CHIPS.length);
  const [chips, setChips] = useState(INITIAL_CHIPS);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const commit = useCallback((next: Chip[]) => {
    chipsRef.current = next;
    setChips(next);
  }, []);

  const moveChip = useCallback(
    (id: string, layout: Layout, to: Point) => {
      const current = chipsRef.current.find((chip) => chip.id === id);
      if (!current) return;
      const next = constrain(
        maskRef.current,
        current[layout],
        to,
        CHIP_SIZE[layout],
      );
      commit(
        chipsRef.current.map((chip) =>
          chip.id === id ? { ...chip, [layout]: next } : chip,
        ),
      );
    },
    [commit],
  );

  const readTableMask = (image: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;
    context.drawImage(image, 0, 0);
    const { data, width, height } = context.getImageData(0, 0, canvas.width, canvas.height);
    maskRef.current = { data, w: width, h: height };
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>, id: string) => {
    const table = tableRef.current;
    const chip = chipsRef.current.find((item) => item.id === id);
    if (!table || !chip) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const layout = currentLayout();
    const grabbed = toTable(
      event.clientX,
      event.clientY,
      table.getBoundingClientRect(),
      layout,
    );
    dragRef.current = {
      id,
      layout,
      dx: grabbed.x - chip[layout].x,
      dy: grabbed.y - chip[layout].y,
    };
    zRef.current += 1;
    const z = zRef.current;
    commit(chipsRef.current.map((item) => (item.id === id ? { ...item, z } : item)));
    setDraggingId(id);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    const table = tableRef.current;
    if (!drag || !table || event.currentTarget.dataset.chip !== drag.id) return;

    const pointer = toTable(
      event.clientX,
      event.clientY,
      table.getBoundingClientRect(),
      drag.layout,
    );
    moveChip(drag.id, drag.layout, {
      x: pointer.x - drag.dx,
      y: pointer.y - drag.dy,
    });
  };

  const endDrag = () => {
    dragRef.current = null;
    setDraggingId(null);
  };

  const nudge = (id: string, key: string) => {
    const chip = chipsRef.current.find((item) => item.id === id);
    if (!chip) return;
    const step = 0.02;
    // The direction on screen...
    const screen =
      key === "ArrowLeft"
        ? { x: -step, y: 0 }
        : key === "ArrowRight"
          ? { x: step, y: 0 }
          : key === "ArrowUp"
            ? { x: 0, y: -step }
            : key === "ArrowDown"
              ? { x: 0, y: step }
              : null;
    if (!screen) return;
    // ...and the same direction on the table art, which is turned when upright.
    const layout = currentLayout();
    const delta = layout === "h" ? screen : { x: screen.y, y: -screen.x };
    moveChip(id, layout, {
      x: chip[layout].x + delta.x,
      y: chip[layout].y + delta.y,
    });
  };

  return (
    <section id="sponsors" aria-label="Sponsors" className="relative overflow-x-clip bg-[#6C0204]">
      <SectionGround>
        <div className="flex flex-col items-center px-4 pb-8 pt-14 md:pb-10 md:pt-20">
          <h2 className="font-righteous flex items-center justify-center gap-[0.4em] text-[clamp(42px,7vw,88px)] uppercase leading-none tracking-[0.04em] text-[#FDFBED] [-webkit-text-stroke:0.06em_#FFB24C] [paint-order:stroke_fill]">
            <Image
              src={STAR}
              alt=""
              width={47}
              height={48}
              draggable={false}
              className="h-[0.7em] w-auto [-webkit-user-drag:none] [user-drag:none]"
            />
            Sponsors
            <Image
              src={STAR}
              alt=""
              width={47}
              height={48}
              draggable={false}
              className="h-[0.7em] w-auto [-webkit-user-drag:none] [user-drag:none]"
            />
          </h2>

          {/* Room for the table and the guests around it; see Layout for the numbers. */}
          <div className="relative mt-[clamp(20px,3vw,44px)] aspect-[1205/1907] w-full max-w-[560px] md:aspect-[2007/1305] md:max-w-[1255px]">
            {/*
              The table art, always laid out on its side; below md the whole thing is
              turned a quarter turn. Shadows in here are box-shadows rather than CSS
              filters, which are costly to repaint on a phone while a chip is moving.
              Native drag, selection and the long-press menu are off so a touch only
              ever moves a chip.
            */}
            <div
              ref={tableRef}
              onDragStart={(event) => event.preventDefault()}
              onContextMenu={(event) => event.preventDefault()}
              className="absolute left-1/2 top-1/2 isolate w-[136.68%] -translate-x-1/2 -translate-y-1/2 rotate-90 select-none [-webkit-touch-callout:none] [-webkit-user-drag:none] md:left-[8.9686%] md:top-[13.7931%] md:w-[82.0628%] md:translate-x-0 md:translate-y-0 md:rotate-0"
            >
              {/* The table's shadow, cast evenly all round by a hidden shape of its outline. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[2%] -z-10 rounded-[22%/50%] shadow-[0_0_34px_16px_rgb(0_0_0/0.5)]"
              />

              <Image
                src={TABLE}
                alt=""
                width={TABLE_W}
                height={TABLE_H}
                draggable={false}
                priority
                onLoad={(event) => readTableMask(event.currentTarget)}
                className="pointer-events-none block h-auto w-full select-none [-webkit-user-drag:none] [user-drag:none]"
              />

              {/* TD logo printed into the felt, under the shading; kept upright. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={LOGO_PRINT}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="pointer-events-none absolute left-1/2 top-1/2 w-[36.5%] -translate-x-1/2 -translate-y-1/2 -rotate-90 select-none [-webkit-user-drag:none] [user-drag:none] md:rotate-0"
              />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SHADING}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="pointer-events-none absolute inset-0 h-full w-full select-none"
              />

              <TableGuests />

              {chips.map((chip) => {
                const dragging = draggingId === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    data-chip={chip.id}
                    aria-label={`${chip.name} chip. Drag to move it on the table.`}
                    onPointerDown={(event) => onPointerDown(event, chip.id)}
                    onPointerMove={onPointerMove}
                    onPointerUp={endDrag}
                    onPointerCancel={endDrag}
                    onKeyDown={(event) => {
                      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
                      event.preventDefault();
                      nudge(chip.id, event.key);
                    }}
                    // The shadow falls down the screen: +x of the turned table, +y from md up.
                    className={`group/sc absolute left-[var(--vx)] top-[var(--vy)] aspect-square w-[var(--v-size)] touch-none select-none rounded-full border-0 bg-transparent p-0 [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#FDFBED] md:left-[var(--hx)] md:top-[var(--hy)] md:w-[var(--h-size)] ${
                      dragging
                        ? "shadow-[12px_0_12px_rgb(0_0_0/0.45)] md:shadow-[0_12px_12px_rgb(0_0_0/0.45)]"
                        : "shadow-[4px_0_5px_rgb(0_0_0/0.4)] md:shadow-[0_4px_5px_rgb(0_0_0/0.4)]"
                    }`}
                    style={
                      {
                        "--hx": `${chip.h.x * 100}%`,
                        "--hy": `${chip.h.y * 100}%`,
                        "--vx": `${chip.v.x * 100}%`,
                        "--vy": `${chip.v.y * 100}%`,
                        "--h-size": `${CHIP_SIZE.h * 100}%`,
                        "--v-size": `${CHIP_SIZE.v * 100}%`,
                        "--tilt": `${chip.rotation}deg`,
                        zIndex: chip.z,
                        cursor: dragging ? "grabbing" : "grab",
                        transform: `translate(-50%, -50%)${dragging ? " scale(1.06)" : ""}`,
                      } as CSSProperties
                    }
                  >
                    {/* The chip's own tilt, minus the table's quarter turn when it is upright. */}
                    <span className="absolute inset-0 [rotate:calc(var(--tilt)_-_90deg)] md:[rotate:var(--tilt)]">
                      <SponsorChip src={chip.src} colors={chip.colors} dragging={dragging} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </SectionGround>
    </section>
  );
}

export default Sponsors;
