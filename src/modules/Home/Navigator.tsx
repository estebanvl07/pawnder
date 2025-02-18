import { Button } from "@heroui/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowBack } from "~/components/Icons";
import { useResize } from "~/hooks/useResize";

export interface NavigatorProps {
  show: boolean;
  title?: string;
  subtitle?: string;
  goBack?: boolean;
  children?: React.ReactNode;
  classNames?: {
    headerClassName?: string;
  };
}

const Navigator = ({
  goBack,
  title,
  subtitle,
  children,
  classNames,
}: NavigatorProps) => {
  const router = useRouter();

  const onGoBack = () => {
    router.back();
  };

  const [fixTab, setFixTab] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!mainRef.current) return;
    setFixTab(mainRef.current.scrollTop > 80);
  }, []);

  useEffect(() => {
    const el = document.querySelectorAll("#mainRef");
    if (!el) return;

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [mainRef.current]);

  return (
    <header
      className={clsx(
        "flex w-full items-center justify-start gap-8 bg-white px-2 py-4 md:px-0",
        classNames?.headerClassName,
        {
          "fixed top-0": fixTab,
        },
      )}
    >
      {goBack && (
        <Button
          onPress={() => goBack && onGoBack()}
          isIconOnly
          radius="full"
          variant="flat"
          size="sm"
        >
          <ArrowBack size={20} />
        </Button>
      )}
      {title && (
        <aside className="flex flex-col">
          <h1 className="text-xl font-semibold leading-5">{title}</h1>
          {subtitle && (
            <p className="text-sm font-normal leading-5">{subtitle}</p>
          )}
        </aside>
      )}
      {children}
    </header>
  );
};

export default Navigator;
