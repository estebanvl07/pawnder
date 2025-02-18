import clsx from "clsx";
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
        <motion.div
          layout
          className="scrollbar-customize flex flex-grow overflow-y-auto"
          ref={mainRef}
        >
          <motion.div className="mx-auto h-full gap-x-8">
            <motion.div initial={{}} className={"flex w-full"}>
              {navigator?.show && <Navigator {...navigator} />}
            </motion.div>
            <motion.section
              className={clsx("relative h-full w-[42rem]", sectionClassName)}
            >
              {children}
            </motion.section>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default HomeLayout;
