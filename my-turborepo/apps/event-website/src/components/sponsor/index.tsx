"use client";

import { useCallback, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";

import { SectionGround } from "@/components/SectionGround";

import { TableGuests } from "./TableGuests";
import styles from "./TableGuests.module.css";

const TABLE = "/event_assets/sponsors/poker-table-sponsors.png";
const STAR = "/event_assets/sponsors/Star.png";
const TABLE_W = 1367;
const TABLE_H = 945;
/** Chip diameter as a fraction of the table width. */
const CHIP = 0.16;

type Chip = {
  id: string;
  name: string;
  src: string;
  x: number;
  y: number;
  rotation: number;
  z: number;
};

const INITIAL_CHIPS: Chip[] = [
  { id: "heb", name: "H-E-B", src: "/event_assets/sponsors/heb.png", x: 0.3, y: 0.36, rotation: -14, z: 1 },
  { id: "databricks", name: "Databricks", src: "/event_assets/sponsors/databricks.png", x: 0.48, y: 0.3, rotation: 8, z: 2 },
  { id: "qualcomm", name: "Qualcomm", src: "/event_assets/sponsors/qualcomm.png", x: 0.66, y: 0.38, rotation: -6, z: 3 },
  { id: "hitachi", name: "Hitachi", src: "/event_assets/sponsors/hitachi.png", x: 0.28, y: 0.56, rotation: 11, z: 4 },
  { id: "sec", name: "SEC", src: "/event_assets/sponsors/sec.png", x: 0.46, y: 0.52, rotation: -18, z: 5 },
  { id: "conocophillips", name: "ConocoPhillips", src: "/event_assets/sponsors/conocophillips.png", x: 0.64, y: 0.56, rotation: 4, z: 6 },
  { id: "phillips", name: "Phillips 66", src: "/event_assets/sponsors/phillips.png", x: 0.4, y: 0.7, rotation: 7, z: 7 },
  { id: "serp", name: "SerpApi", src: "/event_assets/sponsors/serp.png", x: 0.58, y: 0.72, rotation: -9, z: 8 },
];

type TableMask = { data: Uint8ClampedArray; w: number; h: number };

function sampleOpaque(mask: TableMask, x: number, y: number) {
  const px = Math.round(x);
  const py = Math.round(y);
  if (px < 0 || py < 0 || px >= mask.w || py >= mask.h) return false;
  return mask.data[(py * mask.w + px) * 4 + 3] > 200;
}

/** True when the whole chip circle sits on opaque pixels of the table image. */
function chipOnTable(mask: TableMask | null, x: number, y: number) {
  if (!mask) {
    return x >= 0.18 && x <= 0.82 && y >= 0.24 && y <= 0.76;
  }

  const cx = x * mask.w;
  const cy = y * mask.h;
  // A little larger than the chip so the art stops short of the rim.
  const radius = (CHIP / 2) * mask.w + 2;
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
  from: { x: number; y: number },
  to: { x: number; y: number },
) {
  if (chipOnTable(mask, to.x, to.y)) return to;

  const x = approach(from.x, to.x, (value) => chipOnTable(mask, value, from.y));
  const y = approach(from.y, to.y, (value) => chipOnTable(mask, x, value));
  return { x, y };
}

function Sponsors() {
  const tableRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<TableMask | null>(null);
  const chipsRef = useRef(INITIAL_CHIPS);
  const dragRef = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const zRef = useRef(INITIAL_CHIPS.length);
  const [chips, setChips] = useState(INITIAL_CHIPS);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const commit = useCallback((next: Chip[]) => {
    chipsRef.current = next;
    setChips(next);
  }, []);

  const moveChip = useCallback(
    (id: string, x: number, y: number) => {
      const current = chipsRef.current.find((chip) => chip.id === id);
      if (!current) return;
      const nextPoint = constrain(maskRef.current, current, { x, y });
      commit(
        chipsRef.current.map((chip) =>
          chip.id === id ? { ...chip, x: nextPoint.x, y: nextPoint.y } : chip,
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
    const rect = table.getBoundingClientRect();
    dragRef.current = {
      id,
      dx: event.clientX - rect.left - chip.x * rect.width,
      dy: event.clientY - rect.top - chip.y * rect.height,
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

    const rect = table.getBoundingClientRect();
    moveChip(
      drag.id,
      (event.clientX - rect.left - drag.dx) / rect.width,
      (event.clientY - rect.top - drag.dy) / rect.height,
    );
  };

  const endDrag = () => {
    dragRef.current = null;
    setDraggingId(null);
  };

  const nudge = (id: string, key: string) => {
    const chip = chipsRef.current.find((item) => item.id === id);
    if (!chip) return;
    const step = 0.02;
    const delta =
      key === "ArrowLeft"
        ? { x: -step, y: 0 }
        : key === "ArrowRight"
          ? { x: step, y: 0 }
          : key === "ArrowUp"
            ? { x: 0, y: -step }
            : key === "ArrowDown"
              ? { x: 0, y: step }
              : null;
    if (!delta) return;
    moveChip(id, chip.x + delta.x, chip.y + delta.y);
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

          <div className={styles.scene}>
            <div ref={tableRef} className={styles.table}>
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
                    className="group/sc absolute aspect-square touch-none rounded-full border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#FDFBED]"
                    style={{
                      left: `${chip.x * 100}%`,
                      top: `${chip.y * 100}%`,
                      width: `${CHIP * 100}%`,
                      zIndex: chip.z,
                      cursor: dragging ? "grabbing" : "grab",
                      transform: `translate(-50%, -50%) rotate(${chip.rotation}deg)${dragging ? " scale(1.06)" : ""}`,
                      filter: dragging
                        ? "drop-shadow(0 14px 8px rgb(0 0 0 / 0.45))"
                        : "drop-shadow(0 5px 3px rgb(0 0 0 / 0.35))",
                    }}
                  >
                    <Image
                      src={chip.src}
                      alt=""
                      fill
                      draggable={false}
                      sizes="180px"
                      className={`pointer-events-none select-none object-contain transition-transform duration-200 ease-out [-webkit-user-drag:none] [user-drag:none] ${dragging ? "" : "group-hover/sc:scale-[1.07] group-focus-visible/sc:scale-[1.07]"}`}
                    />
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
