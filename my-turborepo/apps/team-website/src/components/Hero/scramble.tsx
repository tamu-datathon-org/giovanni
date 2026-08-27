"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

/**
 * ScrambleTextGrid
 * A grid of cells, each animated by GSAP's real ScrambleTextPlugin.
 * "Word" cells settle onto a target letter and get highlighted;
 * "noise" cells scramble onto a new random character on a loop, forever.
 *
 * Usage:
 *   <ScrambleTextGrid
 *     phrases={["DATA SCIENCE", "MACHINE LEARNING", "AI", "HACKATHON"]}
 *     cols={30}
 *     rows={16}
 *   />
 */

export default function ScrambleTextGrid({
  phrases = [
    "DATA SCIENCE",
    "MACHINE LEARNING",
    "ARTIFICIAL INTELLIGENCE",
    "HACKATHON",
    "NEURAL NETWORK",
    "ALGORITHM",
  ],
  cols = 30,
  rows = 16,
  chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`0123456789",
  dimColor = "#c9cdd6",
  hitColor = "#1e3a8a",
}) {
  const gridRef = useRef(null);
  const tweensRef = useRef([]);

  useEffect(() => {
    const gridEl = gridRef.current;
    if (!gridEl) return;

    const charArr = chars.split("");
    const randChar = () => charArr[Math.floor(Math.random() * charArr.length)];
    const idx = (r, c) => r * cols + c;

    // build the DOM grid of cells
    gridEl.innerHTML = "";
    const cells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const div = document.createElement("div");
        div.className = "stg-cell";
        div.textContent = randChar();
        gridEl.appendChild(div);
        cells.push(div);
      }
    }

    // choose non-overlapping horizontal placements for each phrase
    const occupied = new Set();
    const placements = [];

    phrases.forEach((phrase) => {
      const clean = phrase.replace(/ /g, "");
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 200) {
        attempts++;
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * (cols - clean.length - 1));
        let ok = true;
        for (let i = -1; i <= clean.length; i++) {
          if (occupied.has(idx(r, c + i))) {
            ok = false;
            break;
          }
        }
        if (ok) {
          const cellIdxs = [];
          for (let i = 0; i < clean.length; i++) cellIdxs.push(idx(r, c + i));
          cellIdxs.forEach((ci) => occupied.add(ci));
          placements.push({ letters: clean.split(""), cellIdxs });
          placed = true;
        }
      }
    });

    const tweens = tweensRef.current;

    // WORD CELLS — each letter gets its own scrambleText tween that
    // scrambles briefly, then reveals the real letter and locks it in.
    placements.forEach(({ letters, cellIdxs }) => {
      cellIdxs.forEach((cellIndex, i) => {
        const cell = cells[cellIndex];
        const letterDelay = 1 + i * 0.08 + Math.random() * 0.3;

        const tween = gsap.to(cell, {
          duration: 1,
          delay: letterDelay,
          scrambleText: {
            text: letters[i],
            chars,
            speed: 0.4,
            revealDelay: 0.3,
          },
          onComplete: () => cell.classList.add("stg-hit"),
        });
        tweens.push(tween);
      });
    });

    // NOISE CELLS — loop scrambleText onto a fresh random character forever.
    cells.forEach((cell, i) => {
      const isWordCell = placements.some((p) => p.cellIdxs.includes(i));
      if (isWordCell) return;

      const stagger = (i % cols) * 0.02 + Math.floor(i / cols) * 0.03;

      function loop() {
        const tween = gsap.to(cell, {
          duration: 0.6 + Math.random() * 0.5,
          delay: 1 + Math.random() * 2.5,
          scrambleText: {
            text: randChar(),
            chars,
            speed: 0.3,
          },
          onComplete: loop,
        });
        tweens.push(tween);
      }

      const initial = gsap.delayedCall(stagger, loop);
      tweens.push(initial);
    });

    // cleanup on unmount / prop change — kill every tween and timer
    return () => {
      tweens.forEach((t) => t.kill());
      tweens.length = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrases, cols, rows, chars]);

  return (
    <div className="stg-stage">
      <div ref={gridRef} className="stg-grid" />
      <style jsx>{`
        .stg-stage {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          overflow: hidden;
        }
        .stg-grid {
          display: grid;
          grid-template-columns: repeat(${cols}, 1fr);
          gap: 28px 34px;
          font-family: "Courier New", ui-monospace, Menlo, monospace;
          font-size: 20px;
          letter-spacing: 1px;
          user-select: none;
        }
      `}</style>
      <style jsx global>{`
        .stg-cell {
          color: ${dimColor};
          text-align: center;
          width: 1.4em;
          font-weight: 500;
          transition: color 0.25s ease;
        }
        .stg-cell.stg-hit {
          color: ${hitColor};
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}