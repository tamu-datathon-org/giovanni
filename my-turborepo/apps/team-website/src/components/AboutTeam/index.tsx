import { konkhmerSleokchher } from "~/app/_components/fonts";
import BubbleField from "./BubbleField";
import { teams } from "./team-data";
import styles from "./team.module.css";

export default function AboutTeam() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className={`${konkhmerSleokchher.variable} ${styles.section}`}
    >
      <BubbleField teams={teams} />
    </section>
  );
}
