import type { Menu } from "~/types/menu";

// Order matters: the rail treats this as document order when deciding which
// section is active, and renders the labels top-to-bottom in the same order.
const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/#home",
    newTab: false,
  },
  {
    id: 2,
    title: "About Us",
    path: "/#about-us",
    newTab: false,
  },
  {
    id: 3,
    title: "Past Events",
    path: "/#past-events",
    newTab: false,
  },
  {
    id: 4,
    title: "Sponsors",
    path: "/#sponsors",
    newTab: false,
  },
  {
    id: 5,
    title: "Team",
    path: "/#team",
    newTab: false,
  },
  {
    id: 6,
    title: "Apply",
    path: "/apply",
    newTab: false,
  },
];
export default menuData;
