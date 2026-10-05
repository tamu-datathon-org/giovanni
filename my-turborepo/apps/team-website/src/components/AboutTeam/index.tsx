import type { BubbleGrid } from "./bubble-layout";
import BubbleField from "./BubbleField";
import { teams } from "./team-data";

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
      // overflow-x-hidden: the full-bleed bubble field can overshoot by a
      // scrollbar's width where scrollbars take up space; clip it rather than
      // forcing a page-wide horizontal scrollbar.
      className="relative isolate scroll-mt-[72px] overflow-x-hidden bg-td-paper font-inter text-td-team lg:scroll-mt-0"
    >
      <BubbleField teams={teams} grid={TEAM_GRID} />
    </section>
  );
}
