import React, { FC } from "react";
import { OptionProps } from "./types";
import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import { useMyUser } from "~/hooks/useMyUser";

const Option: FC<OptionProps> = ({ href, title, icon, onPress }) => {
  const pathname = usePathname();
  const { user, isLoading } = useMyUser();

  return (
    <li className="group w-fit">
      <Link
        href={
          href === "/paw/my" ? (user ? `/paw/${user?.userTag}` : "#") : href
        }
        className={clsx(
          "flex items-center gap-2 transition-transform duration-400 group-hover:translate-x-4",
          {
            "text-primary": pathname === href,
            "text-gray-600": pathname !== href,
          },
        )}
        onPress={onPress}
      >
        {icon && <Icon icon={icon} width={26} />}

        <p className="">{title}</p>
      </Link>
    </li>
  );
};

export default Option;
