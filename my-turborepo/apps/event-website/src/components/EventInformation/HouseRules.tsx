import { BedDouble, DoorClosed, DoorOpen, PackageX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Rule {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const RULES: Rule[] = [
  {
    title: "NO AIR MATTRESSES",
    description:
      "Air mattresses aren't allowed in the venue. Pillows and sleeping bags are welcome.",
    Icon: BedDouble,
  },
  {
    title: "DOORS LOCK AT MIDNIGHT",
    description:
      "Once it's 12 AM you can't leave and come back in. Head out before midnight, or plan to stay inside.",
    Icon: DoorClosed,
  },
  {
    title: "DOORS REOPEN AT 7 AM",
    description: "The doors unlock again at 7 AM on Sunday, November 8.",
    Icon: DoorOpen,
  },
  {
    title: "NO DELIVERY AFTER MIDNIGHT",
    description:
      "UberEats, DoorDash and other delivery orders aren't allowed once the doors lock.",
    Icon: PackageX,
  },
];

/**
 * MSC venue rules. Static on purpose: it sits above PoolStory, so the ball's
 * scroll choreography (which is tuned to PoolStory being the last thing before
 * the Rail) is untouched. z-[1] keeps it above PoolStory's cue line.
 */
export function HouseRules() {
  return (
    <div className="relative z-[1] mx-auto mt-12 max-w-[1200px] md:mt-16">
      <h3 className="mb-6 text-center font-sekuya text-balance text-[clamp(22px,2.9vw,40px)] leading-none text-[#ffb24c] md:mb-8">
        HOUSE RULES
      </h3>
      <ul
        role="list"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6"
      >
        {RULES.map(({ title, description, Icon }) => (
          <li
            key={title}
            className="flex items-start gap-4 rounded-xl border border-[#ffb24c]/40 bg-[#0c1808] p-4 shadow-[0_6px_20px_rgb(0_0_0/0.25)] md:p-6"
          >
            <Icon
              aria-hidden="true"
              className="mt-0.5 size-7 shrink-0 text-[#ffb24c] md:size-9"
              strokeWidth={1.75}
            />
            <div className="min-w-0">
              <h4 className="mb-2 font-sekuya text-balance text-[clamp(16px,1.7vw,24px)] leading-tight text-[#ffb24c]">
                {title}
              </h4>
              <p className="font-righteous text-pretty text-[clamp(15px,1.5vw,21px)] leading-snug text-[#fdfbed] [text-shadow:0_4px_4px_#00000040]">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
