import Image from "next/image";

import styles from "./hero.module.css";
import { ASSETS } from "./scene";

/**
 * Road, ground and the car. As the page scrolls (--drive), the car drives off
 * to the right and the road behind it turns the ground's green.
 */
export function Street() {
  return (
    <>
      <div className={styles.road} aria-hidden="true" />
      <div className={styles.ground} aria-hidden="true" />
      <div className={styles.wipe} aria-hidden="true" />
      <div className={styles.pool} aria-hidden="true" />
      <div className={styles.car} aria-hidden="true">
        <span className={styles.headlight} />
        <Image
          src={ASSETS.car}
          alt=""
          fill
          sizes="(max-aspect-ratio: 1/1) 45vw, 40vh"
        />
        <span className={styles.taillight} />
      </div>
    </>
  );
}
