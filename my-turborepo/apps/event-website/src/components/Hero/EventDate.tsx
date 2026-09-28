import styles from "./hero.module.css";
import { Sparkle } from "./Sparkle";

/** The event dates, on a lit letter board hung between the countdown and APPLY. */
export function EventDate() {
  return (
    <p className={styles.eventDate}>
      <time dateTime="2026-11-07">Nov 7–8, 2026</time>
      <Sparkle className={styles.eventDateStar} />
      <span>
        <span className="sr-only">, </span>24 hours
      </span>
    </p>
  );
}
