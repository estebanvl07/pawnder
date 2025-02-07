import { ReactElement } from "react";

export interface SidebarProps {
  children?: React.ReactNode;
}

export interface OptionProps {
  icon?: ReactElement;
  onPress?: VoidFunction;
  title: string;
  href: string;
}
