export interface Challenge {
  name: string;
  description: string;
  prize: string;
}

export const challenges: Challenge[] = [
  {
    name: "Challenge 1",
    description:
      "Eh idk bro",
    prize: "First: ABC · Second: XYZ · Third: 123",
  },
  {
    name: "Challenge 2",
    description: "Eh",
    prize: "First: Scooter · Second: Monitor · Third: Echo Dot",
  },
  {
    name: "Yo",
    description:
      ".",
    prize:
      "First: Power Bank · Second: $10 Amazon gift card · Third: Apple AirTag",
  },
  {
    name: "Yay",
    description:
      "",
    prize:
      "First: yy · Second: p2 · Third: p3",
  },
  {
    name: "er",
    description:
      "Buns.",
    prize: "First: JBL Speaker · Second: uwu · Third: Echo Dot",
  },
  {
    name: "YYY",
    description:
      ".",
    prize:
      "First: Power Bank · Second: $10 Amazon gift card · Third: Apple AirTag",
  },
  {
    name: "hmm",
    description:
      "V.",
    prize: "First: JBL Speaker · Second: uwu · Third: Echo Dot",
  }, {
    name: "HI",
    description:
      "hello",
    prize: "First: AirPods Pro · Second: Keyboard · Third: Gift cards",
  },
];

export const wheelOptions: Challenge[] = [
  ...challenges,
];
