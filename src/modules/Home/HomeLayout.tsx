import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Sidebar from "~/components/Sidebar/Sidebar";
import Navigator, { NavigatorProps } from "./Navigator";
import { AnimatePresence, motion } from "framer-motion";
import { useResize } from "~/hooks/useResize";

interface HomeLayoutProps {
  children: React.ReactNode;
  sectionClassName?: string;
  navigator?: NavigatorProps;
}

const HomeLayout = ({
  children,
  navigator,
  sectionClassName,
}: HomeLayoutProps) => {
  const [fixTab, setFixTab] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);

  const { isDesktop } = useResize();

  const handleScroll = useCallback(() => {
    if (!mainRef.current) return;
    setFixTab(mainRef.current.scrollTop > 80);
  }, []);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [mainRef.current]);

  return (
    <main className="mx-auto flex h-screen max-w-[120rem] flex-row">
      {isDesktop && <Sidebar />}
      <AnimatePresence>
        <motion.div layout className="flex-grow overflow-y-auto" ref={mainRef}>
          <motion.section
            className={clsx(
              "mx-auto max-w-[48rem] px-2 py-4 md:p-4",
              sectionClassName,
            )}
          >
            {navigator?.show && <Navigator {...navigator} />}
            {children}
          </motion.section>
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default HomeLayout;
