import type { BubbleGrid } from "./bubble-layout";
import { konkhmerSleokchher } from "~/app/_components/fonts";
import BubbleField from "./BubbleField";
import { teams } from "./team-data";
import styles from "./team.module.css";

// Honeycomb shape of the bubble field. Even rows hold `columns` faces and odd
// rows one fewer; if the team outgrows it, the grid extends along its longer
// side (with a console warning).
const TEAM_GRID: { desktop: BubbleGrid; mobile: BubbleGrid } = {
  desktop: { columns: 7, rows: 5 }, // 7 + 6 + 7 + 6 = 26 faces: wide and short
  mobile: { columns: 4, rows: 9 }, // 4 + 3 + … = 32 cells: tall
};
  
export default function AboutTeam() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className={`${konkhmerSleokchher.variable} ${styles.section} `}
    >
      <BubbleField teams={teams} grid={TEAM_GRID} />
    </section>
  );
}
