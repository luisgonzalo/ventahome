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
    title: "646 555 555",
    link: "tel:646 555 555",
    icon: HiPhoneArrowUpRight,
  },
];
