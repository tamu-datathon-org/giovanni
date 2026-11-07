import type { ChipColors } from "@/components/sponsor/SponsorChip";

export interface ChallengeSponsor {
  name: string;
  logo: string;
  /** Same chip colors as the sponsors section. */
  colors: ChipColors;
}

export interface ChallengeLink {
  label: string;
  href: string;
  /** Downloads the file instead of opening it in a new tab. */
  download?: boolean;
}

export interface Challenge {
  name: string;
  /** Shorter name for the wheel's slice, when the full one is too long. */
  wheelName?: string;
  description: string;
  /** 1st, 2nd and 3rd place, in that order. */
  prizes: string[];
  link?: ChallengeLink;
  /** Getting-started steps for challenges with no link. */
  howToStart?: string;
  /** The company running the challenge, shown as a chip on its page. */
  sponsor?: ChallengeSponsor;
}

// Easy to hard, then the sponsor challenges.
export const challenges: Challenge[] = [
  {
    name: "Rev's Casino",
    description:
      'Beat all the levels of Rev\'s Casino in the least amount of tokens to win the Golden Reveille and beat this challenge. Beating a level requires "tricking" an LLM into doing something that it\'s been prompted not to do. Each level gets more difficult.',
    prizes: ["Echo Dots", "Pickleball Set", "Amazon Gift Card"],
    link: { label: "Play Now", href: "https://td-revs.vercel.app/" },
  },
  {
    name: "Dashboard Royale",
    description:
      "You're the new floor analytics lead at The Gilded Ace, a fictional 300-machine Las Vegas casino, and the manager wants to replace the 10 slot machines that earned the least. Build an interactive dashboard that finds out whether those machines are truly underperforming or just unlucky, badly placed, or often broken: luck, location, or a leak?",
    prizes: [
      "Keychron V1 Mechanical Keyboard",
      "Logitech G703 Lightspeed Wireless Gaming Mouse",
      "Owalas",
    ],
    link: {
      label: "Open Guide",
      href: "https://github.com/tamu-datathon-org/dashboard-royale/blob/main/GUIDE.md",
    },
  },
  {
    name: "Build-A-Dataset",
    description:
      "Leave the screen and collect your own original dataset during the event by observing, measuring, counting, photographing or surveying something in the real world. Then turn it into an interactive app, like a map, game or tool, that your data actually powers, because a small, carefully collected dataset can beat a huge, low-quality one.",
    prizes: [
      "Amazon Fire TV Soundbars",
      "Amazon Fire TV Sticks 4K",
      "MSY Voucher + Tray of Mac and Cheese",
    ],
    link: {
      label: "Open Guide",
      href: "https://docs.google.com/document/d/1LjwC2ZwxrLQzuy14MjoHLTnhe4Wmq6eEUBKs1PHoUjc/edit?usp=sharing",
    },
  },
  {
    name: "House Edge",
    description:
      "Use slot-machine gameplay logs to predict the odds of each machine's next payout (0×, 1×, 2×, 5× or 20×), and submit a CSV of probabilities along with the code that recreates it. You're scored on how close your probabilities are to the simulator's true odds, with a second round of new data opening Saturday at 9 PM.",
    prizes: ["Meta Ray-Bans", "AirPods 4", "Mini Projector"],
    link: {
      label: "Open Guide",
      href: "https://docs.google.com/document/d/1CqNLjCiojRxKkZopoxBeilkke6Y4yCuz7FYSuefvCMo/edit?tab=t.0#heading=h.jzifo8u42bx",
    },
  },
  {
    name: "Heads Up – Poker Bot Tournament",
    wheelName: "Poker Bot",
    description:
      "Write a Python bot that plays heads-up Short Deck 5-Card Pot-Limit Omaha, then face every other team's bot in a round-robin tournament of 2,000 hands per match. Both bots get the same cards in each match, so the best strategy wins, not the luckiest deal, and no poker experience is needed.",
    prizes: ["MacBook Neos in Silver", "Gaming Monitor", "Digital Cameras"],
    link: {
      label: "Open Guide",
      href: "https://docs.google.com/document/d/1D1ruabeQ25scYg97ehBMnzA9fqaEWWsnFDfOmrLme4E/edit?tab=t.0",
    },
  },
  {
    name: "Hitachi: Hack the Highway",
    wheelName: "Hitachi",
    description:
      "Build a team of AI agents that runs the control tower of a just-in-time automaker, handling supplier delays, plant outages and quality holds. The starter package has the data, tools and full brief.",
    prizes: [
      "$50 Amazon Gift Card",
      "$30 Amazon Gift Card",
      "$20 Amazon Gift Card",
    ],
    link: {
      label: "Download Package",
      href: "/downloads/hack_the_highway_student_package.zip",
      download: true,
    },
    sponsor: {
      name: "Hitachi Digital",
      logo: "/event_assets/sponsors/hitachi-digital.png",
      colors: { body: "#E60012", stripe: "#E60012", ring: "#AE000D" },
    },
  },
  {
    name: "HEB Challenge",
    wheelName: "HEB",
    description: "HEB shares the details of this challenge in person.",
    prizes: ["Nintendo Switch Lite", "Powerbeats Pro 2", "H-E-B Gift Package"],
    howToStart:
      "Go to the HEB table in the MSC Ballroom and talk to their team to get access.",
    sponsor: {
      name: "H-E-B",
      logo: "/event_assets/sponsors/heb.png",
      colors: { body: "#E70020", stripe: "#E70020", ring: "#B10018" },
    },
  },
  {
    name: "Best Use of Databricks",
    wheelName: "Databricks",
    description:
      "Build a project that creatively uses Databricks for data engineering, analytics, machine learning or AI, either on its own or as part of your solution to another TAMU Datathon challenge. Judges look at creativity, technical implementation, and how meaningfully Databricks improves your solution.",
    prizes: [
      "Databricks Lululemon Backpack + Owala Water Bottle",
      "Databricks Lululemon Backpack",
      "Owala Water Bottle",
    ],
    sponsor: {
      name: "Databricks",
      logo: "/event_assets/sponsors/databricks.png",
      colors: { body: "#FF3621", stripe: "#1B3139", ring: "#C4281A" },
    },
  },
];

export const wheelOptions: Challenge[] = [...challenges];
