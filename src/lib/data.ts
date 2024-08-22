import { AirVent, DoorOpen, Home, HousePlug, LayoutDashboard } from "lucide-react";

export const avatar = [
  // {
  //   name: "CMU",
  //   image: "/avatar/cmu.png",
  // },
  {
    name: "CMU -Engineering",
    image: "/avatar/cmu-egn.jpg",
  },
];

type SubMenuItem = {
  name: string;
  href: string;
};

type NavAdminMenuItem = {
  name: string;
  href: string;
  icon: any;
  sub_menu: SubMenuItem[];
};

export const navAdminMenu: NavAdminMenuItem[] = [
  {
    name: "Home",
    href: "/admin/management",
    icon: Home,
    sub_menu: [],
  },
  {
    name: "Rooms",
    href: "/admin/management/rooms",
    icon: DoorOpen,
    sub_menu: [],
  },
  {
    name: "Air Conditioners",
    href: "/admin/management/air-conditioners",
    icon: AirVent,
    sub_menu: [],
  },
  {
    name: "Lamp & Plug",
    href: "/admin/management/lamp-plug",
    icon: HousePlug,
    sub_menu: [],
  },
  {
    name: "dashboard",
    href: "/admin/management/dashboard",
    icon: LayoutDashboard,
    sub_menu: [],
  },
];
