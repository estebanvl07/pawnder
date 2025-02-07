import React, { FC } from "react";
import { OptionProps } from "./types";
import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const Option: FC<OptionProps> = ({ href, title, icon, onPress }) => {
  const pathname = usePathname();

  return (
    <li className="hover: group w-fit">
      <Link
        href={href}
        className={clsx("duration-400 flex items-center gap-2", {
          "text-primary": pathname === href,
          "text-gray-600": pathname !== href,
        })}
        onPress={onPress}
      >
        {icon}

        <p className="transition-transform group-hover:translate-x-4">
          {title}
        </p>
      </Link>
    </li>
  );
};

export default Option;
