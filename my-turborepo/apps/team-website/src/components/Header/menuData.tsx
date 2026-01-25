import type { Menu } from "~/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/#home",
    newTab: false,
  },
  {
    id: 3,
    title: "About",
    path: "/#about",
    newTab: false,
  },
  {
    id: 2,
    title: "Organizer Application Info",
    path: "#apply",
    newTab: false,
  },
  {
    id: 4,
    title: "Team",
    path: "/#team",
    newTab: false,
  },
  // submenu: [
  // INSERT NEW BLOG POSTS HERE
  // {
  //   id: 41,
  //   title: "About Page",
  //   path: "/about",
  //   newTab: false,
  // },
  // {
  //   id: 42,
  //   title: "Contact Page",
  //   path: "/contact",
  //   newTab: false,
  // },
  //   ],
  // },
  {
    id: 5,
    title: "Contact",
    path: "/#contact",
    newTab: false,
  },
  // {
  //   id: 7,
  //   title: "TD Fall 2025 Applications",
  //   path: "/apply",
  //   newTab: false,
  // },
  {
    id: 7,
    title: "Organizer Application",
    path: "https://docs.google.com/forms/d/e/1FAIpQLScIO-brtOtLcgDnQnsqn1_wQ7j2GS81H8K3CHy254A1BzLtrQ/viewform",
    newTab: true,
  },
];
export default menuData;
