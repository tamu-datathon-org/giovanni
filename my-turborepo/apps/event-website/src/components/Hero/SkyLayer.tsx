import styles from "./hero.module.css";
import { BEAMS, cssVars, SHOOTING_STARS, STARS } from "./scene";
import { Sparkle } from "./Sparkle";

/** Searchlights, stars and shooting stars over the sky of background.png. */
export function SkyLayer() {
  return (
    <div className={styles.sky} aria-hidden="true">
      {BEAMS.map((beam, i) => (
        <span
          key={i}
          className={styles.beamPivot}
          style={cssVars({
            "--x": `${beam.x}%`,
            "--y": `${beam.y}%`,
            "--from": `${beam.from}deg`,
            "--to": `${beam.to}deg`,
            "--period": `${beam.period}s`,
            "--phase": `${-beam.phase}s`,
            "--tone": beam.tone,
            "--on-delay": `${i * 150}ms`,
          })}
        >
          <span className={styles.beam} />
        </span>
      ))}

      {STARS.map((star, i) => {
        const style = cssVars({
          "--x": `${star.x.toFixed(2)}%`,
          "--y": `${star.y.toFixed(2)}%`,
          "--size": star.size.toFixed(1),
          "--color": star.color,
          "--delay": `${star.delay.toFixed(2)}s`,
          "--twinkle": `${star.twinkle.toFixed(2)}s`,
          "--phase": `${(-star.phase).toFixed(2)}s`,
          "--dim": star.dim.toFixed(2),
        });
        // The wrapper glimmers in once; the inner shape twinkles forever.
        return (
          <span key={i} className={styles.star} style={style}>
            {star.kind === "sparkle" ? (
              <Sparkle className={styles.sparkle} />
            ) : (
              <span className={styles.dot} />
            )}
          </span>
        );
      })}

      {SHOOTING_STARS.map((star, i) => (
        <span
          key={i}
          className={styles.shootingStar}
          style={cssVars({
            "--x": `${star.x}%`,
            "--y": `${star.y}%`,
            "--angle": `${star.angle}deg`,
            "--travel": star.travel,
            "--cycle": `${star.cycle}s`,
            "--delay": `${star.delay}s`,
          })}
        />
      ))}
    </div>
  );
}
