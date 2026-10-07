"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./GridBackground.module.css";

{
  /* Defined the following to overlap tiles */
}
const STEP_X = 302;
const STEP_Y = 285;

interface TileLayout {
  columns: number;
  rows: number;
  offsetX: number;
  offsetY: number;
}

const modulo = (value: number, divisor: number) =>
  ((value % divisor) + divisor) % divisor;

export default function GridBackground({
  className = "",
}: {
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<TileLayout>({
    columns: 0,
    rows: 0,
    offsetX: 0,
    offsetY: 0,
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updateLayout = () => {
      const rect = root.getBoundingClientRect();
      const offsetX = modulo(rect.left + window.scrollX, STEP_X);
      const offsetY = modulo(rect.top + window.scrollY, STEP_Y);
      const nextLayout = {
        columns: Math.ceil((rect.width + offsetX) / STEP_X) + 1,
        rows: Math.ceil((rect.height + offsetY) / STEP_Y) + 1,
        offsetX,
        offsetY,
      };

      setLayout((current) =>
        current.columns === nextLayout.columns &&
        current.rows === nextLayout.rows &&
        current.offsetX === nextLayout.offsetX &&
        current.offsetY === nextLayout.offsetY
          ? current
          : nextLayout,
      );
    };

    const observer = new ResizeObserver(updateLayout);
    observer.observe(root);
    {
      /* repeat calculation on resize, scroll or root element changes */
    }
    window.addEventListener("resize", updateLayout);
    window.addEventListener("scroll", updateLayout, { passive: true });

    updateLayout();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("scroll", updateLayout);
    };
  }, []);

  const tiles = Array.from(
    { length: layout.columns * layout.rows },
    (_, index) => index,
  );

  return (
    <div ref={rootRef} className={`${styles.root} ${className}`}>
      {tiles.map((index) => {
        const column = index % layout.columns;
        const row = Math.floor(index / layout.columns);

        {
          /* For every tile, x: column * 302 - offsetX and y: row * 285 - offsetY */
        }
        return (
          <div
            key={index}
            className={styles.tile}
            style={{
              left: column * STEP_X - layout.offsetX,
              top: row * STEP_Y - layout.offsetY,
            }}
          />
        );
      })}
    </div>
  );
}
