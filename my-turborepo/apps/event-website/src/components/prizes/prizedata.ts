//Keep prizes in rank order: first, second, then third place.
//when split is true: split :>
export const prizes = [
  {
    number: 1,
    challengeName: "Easy Challenge",
    prizes: [
      { name:"Echo Dots", imageSrc:"" },
      { name: "Pickle Ball Sets", imageSrc: "",  },
      { name: "Gift Card", imageSrc:"" },
    ],
  },
  {
    number: 2,
    challengeName: "Easy - Medium Challenge",
    prizes: [
      { name: "Keychron Mechanical Keyboard ",imageSrc: "", split: true },
      { name: "Logitech Mouse", imageSrc: "",split: true },
      { name: "Owala", imageSrc: "" },
    ],
  },
  {
    number: 3,
    challengeName:"Medium - Hard Challenge",
    prizes: [
      { name: "Meta Rayban", imageSrc: "" },
      { name: "Airpod 4", imageSrc: "" },
      { name: "Mini Projector", imageSrc: "",split: true },
    ],
  },
  {
    number: 4,
    challengeName: "Hard Challenge",
    prizes: [
      { name: "Macbook Neo", imageSrc: "" },
      { name: "Gaming Monitor", imageSrc: "",split: true },
      { name: "DigiCam", imageSrc: "" },
    ],
  },
  {
    number: 5,
    challengeName: "Challenge 5",
    prizes: [
      { name: "",imageSrc: "" },
      { name: "", imageSrc: "" },
      { name: "", imageSrc: "" },
    ],
  },
  {
    number: 6,
    challengeName: "Challenge 6",
    prizes: [
      { name: "",imageSrc: "" },
      { name: "", imageSrc: "" },
      { name: "", imageSrc: "" },
    ],
  },
  {
    number: 7,
    challengeName: "Challenge 7",
    prizes: [
      { name: "",imageSrc: "" },
      { name: "", imageSrc: "" },
      { name: "", imageSrc: "" },
    ],
  },
  {
    number: 8,
    challengeName: "Challenge 8",
    prizes: [
      { name: "",imageSrc: "" },
      { name: "", imageSrc: "" },
      { name: "", imageSrc: "" },
    ],
  },
];

export type Challenge = (typeof prizes)[number];
