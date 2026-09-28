import type { Ref } from "react";
import Image from "next/image";

import { Countdown } from "./Countdown";
import styles from "./hero.module.css";
import { ASSETS, BULBS, cssVars, LETTERS, SIGN_SPARKLES } from "./scene";
import { Sparkle } from "./Sparkle";

// Every copy of the sign uses the same sizes, so the browser downloads it once.
const SIGN_SIZES = "(max-aspect-ratio: 1/1) 105vw, 95vh";

/** Blurred halo and warm light spill behind the sign; lights up with it. */
export function SignGlow() {
  return (
    <div className={`${styles.signBox} ${styles.signGlow}`} aria-hidden="true">
      <div className={styles.spill} />
      <Image
        src={ASSETS.sign}
        alt=""
        fill
        sizes={SIGN_SIZES}
        loading="eager"
        className={styles.signGlowImage}
      />
    </div>
  );
}

/**
 * The marquee sign: the lit art, the countdown, a dimmed copy on top that
 * flickers away when the power comes on, then the bulb and letter lights.
 */
export function MarqueeSign({
  signRef,
  powered,
  onFlipPower,
}: {
  signRef: Ref<HTMLImageElement>;
  powered: boolean;
  onFlipPower: () => void;
}) {
  return (
    <div className={`${styles.signBox} ${styles.sign}`}>
      <h1 className={styles.signTitle}>
        <Image
          ref={signRef}
          src={ASSETS.sign}
          alt="TAMU Datathon"
          fill
          sizes={SIGN_SIZES}
          preload
        />
      </h1>

      <Countdown />

      <Image
        src={ASSETS.sign}
        alt=""
        aria-hidden="true"
        fill
        sizes={SIGN_SIZES}
        loading="eager"
        className={styles.night}
      />

      <div className={styles.lights} aria-hidden="true">
        {/* Every third bulb shares a phase; animating the three groups (not 30 bulbs) keeps the chase cheap. */}
        {[0, 1, 2].map((phase) => (
          <div
            key={phase}
            className={styles.bulbPhase}
            // Negative offsets so the chase is already running, moving along the path.
            style={cssVars({ "--chase": `${phase * 0.3 - 0.6}s` })}
          >
            {BULBS.filter((_, i) => i % 3 === phase).map(([x, y]) => (
              <span
                key={`${x},${y}`}
                className={styles.bulb}
                style={cssVars({ "--x": `${x}%`, "--y": `${y}%` })}
              />
            ))}
          </div>
        ))}
        {LETTERS.map(([x, y], i) => (
          <span
            key={i}
            className={styles.letterRing}
            style={cssVars({
              "--x": `${x}%`,
              "--y": `${y}%`,
              "--pop": `${250 + i * 140}ms`,
            })}
          />
        ))}
        {SIGN_SPARKLES.map(([x, y], i) => (
          <Sparkle
            key={i}
            className={styles.glint}
            style={cssVars({
              "--x": `${x}%`,
              "--y": `${y}%`,
              "--glint": `${i * 2.5}s`,
            })}
          />
        ))}
      </div>

      <button
        type="button"
        className={styles.lever}
        onClick={onFlipPower}
        disabled={!powered}
        aria-label="Flip the power switch"
        title="Flip the power switch"
      >
        <span className={styles.knobGlow} />
      </button>
    </div>
  );
}
