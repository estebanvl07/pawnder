import { Button } from "@heroui/react";
import { useRouter } from "next/router";
import React from "react";
import { ArrowBack } from "~/components/Icons";

export interface NavigatorProps {
  show: boolean;
  title: string;
  subtitle?: string;
  goBack?: boolean;
}

const Navigator = ({ goBack, title, subtitle }: NavigatorProps) => {
  const router = useRouter();

  const onGoBack = () => {
    router.back();
  };

  return (
    <header className="mb-4 flex items-center justify-start gap-8 px-2 md:px-0">
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
      <aside className="flex flex-col">
        <h1 className="text-xl font-semibold leading-5">{title}</h1>
        {subtitle && (
          <p className="text-sm font-normal leading-5">{subtitle}</p>
        )}
      </aside>
    </header>
  );
};

export default Navigator;
