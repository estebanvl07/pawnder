import { useSession } from "next-auth/react";
import { OptionProps } from "./types";

export const SIDE_OPTIONS: OptionProps[] = [
  {
    href: "/paw",
    icon: "mynaui:home",
    title: "Inicio",
  },
  {
    href: "#",
    icon: "mynaui:config",
    title: "Configuración",
  },
  {
    href: "/paw/my",
    icon: "mynaui:user-circle",
    title: "Perfil",
  },
  {
    href: "/paw/search",
    icon: "mynaui:search",
    title: "Buscar",
  },
];
