import styles from "./hero.module.css";
import { cssVars } from "./scene";
import { Sparkle } from "./Sparkle";

/** APPLY, in the mockup's spot under the sign, in front of the road and the car. */
export function ApplyButton() {
  return (
    <a href="https://tamudatathon.org/apply" className={styles.apply}>
      <Sparkle
        className={styles.applyStar}
        style={cssVars({ "--at": "14%" })}
      />
      APPLY
      <Sparkle
        className={styles.applyStar}
        style={cssVars({ "--at": "86%" })}
      />
    </a>
  );
}
