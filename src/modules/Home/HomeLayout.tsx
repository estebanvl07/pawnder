import { Button } from "@heroui/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Map } from "~/components";
import { ArrowBack } from "~/components/Icons";
import Sidebar from "~/components/Sidebar/Sidebar";

interface HomeLayoutProps {
  children: React.ReactNode;
  navigator?: {
    show: boolean;
    title: string;
    subtitle?: string;
    goBack?: boolean;
  };
}

const HomeLayout = ({ children, navigator }: HomeLayoutProps) => {
  const [fixTab, setFixTab] = useState(false);
  const router = useRouter();

  const mainRef = useRef<HTMLDivElement>(null);

  const goBack = () => {
    router.back();
  };

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
      <Sidebar />
      <div className="flex-grow overflow-y-auto" ref={mainRef}>
        <aside className="mx-auto max-w-[48rem] p-4">
          {navigator?.show && (
            <header className="mb-4 flex items-center justify-start gap-8">
              {navigator.goBack && (
                <Button
                  onPress={goBack}
                  isIconOnly
                  radius="full"
                  variant="flat"
                  size="sm"
                >
                  <ArrowBack size={20} />
                </Button>
              )}
              <aside className="flex flex-col">
                <h1 className="text-xl font-semibold leading-5">
                  {navigator.title}
                </h1>
                {navigator.subtitle && (
                  <p className="text-sm leading-5">{navigator.subtitle}</p>
                )}
              </aside>
            </header>
          )}
          {children}
        </aside>
      </div>

      {/* <div className="w-[40rem]">
        <Map />
      </div> */}
    </main>
  );
};

export default HomeLayout;
