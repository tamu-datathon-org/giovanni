export interface Challenge {
  name: string;
  description: string;
  prize: string;
}

export const challenges: Challenge[] = [
  {
    name: "Challenge 1",
    description:
      "When you miss the train I'm on, and you hear the whistle blow",
    prize: "First: ABC · Second: XYZ · Third: 123",
  },
  {
    name: "Challenge 2",
    description: "Tell me why ain't nothing but a heartache",
    prize: "First: Scooter · Second: Monitor · Third: Echo Dot",
  },
  {
    name: "Yo",
    description:
      "Laughing while she hit her pen and coughed, and coughed. Then she came up to my knees, begging baby would you please",
    prize:
      "First: Power Bank · Second: $10 Amazon gift card · Third: Apple AirTag",
  },
  {
    name: "Yay",
    description:
      "I tried to put it out for you to get, Couldve should've but you never did. Wish you wanted it.",
    prize:
      "First: yy · Second: p2 · Third: p3",
  },
  {
    name: "er",
    description:
      "Where have you been, do you know if you are coming back? We were too close to the stars, I never knew somebofy like you.",
    prize: "First: JBL Speaker · Second: uwu · Third: Echo Dot",
  },
  {
    name: "YYY",
    description:
      "The middle of the night, when things aren't black and whire, enter trubedadd, remember 24",
    prize:
      "First: Power Bank · Second: $10 Amazon gift card · Third: Apple AirTag",
  },
  {
    name: "hmm",
    description:
      "And when I'm back in Chicago I feel it another version of me,nI wasn't it",
    prize: "First: JBL Speaker · Second: uwu · Third: Echo Dot",
  }, {
    name: "HI",
    description:
      "hello please help me, are you alvie?",
    prize: "First: AirPods Pro · Second: Keyboard · Third: Gift cards",
  },
];

export const wheelOptions: Challenge[] = [
  ...challenges,
];
