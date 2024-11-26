import { HiCube, HiNewspaper, HiPhoneArrowUpRight } from "react-icons/hi2";
import { IconType } from "react-icons/lib";

export type navigationLink = {
  title: string;
  link: string;
  icon: IconType;
};

export const navigationLinks: Array<navigationLink> = [
  { title: "Propiedades", link: "/properties", icon: HiCube },
  { title: "Contacto", link: "/contact", icon: HiNewspaper },
  {
    title: "686 42 63 63",
    link: "tel:686 42 63 63",
    icon: HiPhoneArrowUpRight,
  },
];
