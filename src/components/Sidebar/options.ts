import { useSession } from "next-auth/react";
import { OptionProps } from "./types";

export const SIDE_OPTIONS: OptionProps[] = [
  {
    href: "/home",
    icon: "mynaui:home",
    title: "Inicio",
  },
  {
    href: "#",
    icon: "mynaui:config",
    title: "Configuración",
  },
  {
    href: "/profile",
    icon: "mynaui:user-circle",
    title: "Perfil",
  },
  {
    href: "/search",
    icon: "mynaui:search",
    title: "Buscar",
  },
];
