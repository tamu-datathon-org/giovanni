import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "home",
    newTab: false,
  },
  {
    id: 2,
    title: "About",
    path: "about",
    newTab: false,
  },
  {
    id: 3,
    title: "Support",
    path: "contact",
    newTab: false,
  },
  {
    id: 4,
    title: "Blog",
    path: "blog",
    newTab: false,
    submenu: [
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
    ],
  },
];
export default menuData;
