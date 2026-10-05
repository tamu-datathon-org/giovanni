import { Sekuya } from "next/font/google";
import PoolStory from "./PoolStory";
import styles from "./EventInformation.module.css";

const sekuya = Sekuya({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function EventInformation() {
  return (
    <section
      id="event-information"
      aria-labelledby="event-information-heading"
      className={`${styles.section} scroll-mt-24 bg-[#142009] px-4 pb-20 pt-32 sm:px-8 lg:pb-24 lg:pt-40`}
    >
      <div className={styles.tableBackground} aria-hidden="true">
        <div className={styles.felt} />
        <div className={styles.cushions}>
          <div className={`${styles.sights} ${styles.leftSights}`}>
            <span />
            <span />
            <span />
          </div>
          <div className={`${styles.sights} ${styles.rightSights}`}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <h2
        id="event-information-heading"
        className={`${sekuya.className} text-center text-[clamp(24px,6.5vw,96px)] font-normal not-italic leading-none tracking-normal text-[#FFB24C]`}
        style={{ textShadow: "0px 0px 10px #FFB24C" }}
      >
        EVENT
        <br />
        INFORMATION
      </h2>

      <PoolStory titleClassName={sekuya.className} />
    </section>
  );
}
