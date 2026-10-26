//Keep prizes in rank order: first, second, then third place.
//when split is true: split :>
export const prizes = [
  {
    number: 1,
    challengeName: "Easy Challenge",
    prizes: [
      { name:"Echo Dot", imageSrc:"/event_assets/echo_dots.gif" },
      { name: "Pickle Ball Set", imageSrc: "/event_assets/pickleball.jpg"  },
      { name: "$25 Gift Card", imageSrc:"/event_assets/amazon_giftcard.png" },
    ],
  },
  {
    number: 2,
    challengeName: "Easy-Medium Challenge",
    prizes: [
      { name: "Keychron Mechanical Keyboard ",imageSrc: "/event_assets/data_keyboard.gif", split: true },
      { name: "Logitech Mouse", imageSrc: "/event_assets/logitech_mouse.png",split: true },
      { name: "Owala", imageSrc: "/event_assets/owala.jpg" },
    ],
  },
  {
    number: 3,
    challengeName:"Medium-Hard Challenge",
    prizes: [
      { name: "Meta RayBan", imageSrc: "/event_assets/meta-glasses.gif" },
      { name: "Airpod 4", imageSrc: "/event_assets/airpods.png" },
      { name: "Mini Projector", imageSrc: "/event_assets/projector.jpg",split: true },
    ],
  },
  {
    number: 4,
    challengeName: "Hard Challenge",
    prizes: [
      { name: "Macbook Neo", imageSrc: "/event_assets/macbook_neo.gif" },
      { name: "Gaming Monitor", imageSrc: "/event_assets/monitor.jpg",split: true },
      { name: "DigiCam", imageSrc: "/event_assets/digicam.jpg" },
    ],
  },
  {
    number: 5,
    challengeName: "Databricks Challenge",
    prizes: [
      { name: "Backpack & Owala",imageSrc: "/event_assets/owala_backpack.png"},
      { name: "Backpack", imageSrc: "/event_assets/lululemon_backpack.png" },
      { name: "Owala", imageSrc: "/event_assets/owala.jpg" },
    ],
  },
  {
    number: 6,
    challengeName: "Hitachi Challenge",
    prizes: [
      { name: "$50 Gift Card",imageSrc: "/event_assets/amazon_giftcard.png" },
      { name: "$30 Gift Card", imageSrc: "/event_assets/amazon_giftcard.png" },
      { name: "$20 Gift Card", imageSrc: "/event_assets/amazon_giftcard.png" },
    ],
  },
  // Waiting for info from companies on these prizes
  // {
  //   number: 7,
  //   challengeName: "H-E-B Challenge",
  //   prizes: [
  //     { name: "",imageSrc: "" },
  //     { name: "", imageSrc: "" },
  //     { name: "", imageSrc: "" },
  //   ],
  // },
  // {
  //   number: 8,
  //   challengeName: "Qualcomm Challenge",
  //   prizes: [
  //     { name: "",imageSrc: "" },
  //     { name: "", imageSrc: "" },
  //     { name: "", imageSrc: "" },
  //   ],
  // },
];

export type Challenge = (typeof prizes)[number];
