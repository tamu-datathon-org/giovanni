//Keep prizes in rank order: first, second, then third place.
//when split is true: split :>
export const prizes = [
  {
    number: 1,
    challengeName: "Easy Challenge",
    prizes: [
      { name:"Echo Dot", imageSrc:"/event_assets/echo_dot.png" },
      { name: "Pickle Ball Set", imageSrc: "/event_assets/pickleball.jpg",  },
      { name: "Gift Card", imageSrc:"" },
    ],
  },
  {
    number: 2,
    challengeName: "Easy - Medium Challenge",
    prizes: [
      { name: "Keychron Mechanical Keyboard ",imageSrc: "/event_assets/keyboard.jpg", split: true },
      { name: "Logitech Mouse", imageSrc: "/event_assets/mouse.jpg",split: true },
      { name: "Owala", imageSrc: "/event_assets/owala.jpg" },
    ],
  },
  {
    number: 3,
    challengeName:"Medium - Hard Challenge",
    prizes: [
      { name: "Meta Rayban", imageSrc: "" },
      { name: "Airpod 4", imageSrc: "/event_assets/airpods.jpg" },
      { name: "Mini Projector", imageSrc: "/event_assets/projector.jpg",split: true },
    ],
  },
  {
    number: 4,
    challengeName: "Hard Challenge",
    prizes: [
      { name: "Macbook Neo", imageSrc: "" },
      { name: "Gaming Monitor", imageSrc: "/event_assets/monitor.jpg",split: true },
      { name: "DigiCam", imageSrc: "/event_assets/digicam.jpg" },
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
