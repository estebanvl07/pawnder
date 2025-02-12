import { ReactElement } from "react";

export interface SidebarProps {
  children?: React.ReactNode;
}

export interface OptionProps {
  icon?: string;
  onPress?: VoidFunction;
  title: string;
  href: string;
}
