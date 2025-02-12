import { Avatar, AvatarGroup } from "@heroui/avatar";
import { Button, Tab, Tabs, useDisclosure } from "@heroui/react";
import { User } from "@heroui/user";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import React from "react";
import ModalPost from "~/components/Post/ModalPost";
import Post from "~/components/Post/Post";
import { useResize } from "~/hooks/useResize";
import HomeLayout from "~/modules/Home/HomeLayout";

const PawnderPage = () => {
  const { data: session } = useSession();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isMobile } = useResize();

  return (
    <HomeLayout
      navigator={{
        show: true,
        goBack: true,
        title: "Esteban vl",
        subtitle: "10 Post",
      }}
    >
      {isMobile && (
        <>
          <ModalPost isOpen={isOpen} onClose={onClose} />
          <Button
            className="fixed bottom-20 right-6 z-20 border border-white shadow-2xl"
            color="primary"
            isIconOnly
            onPress={onOpen}
            size="lg"
            radius="full"
          >
            <Icon icon="mynaui:plus" width={24} />
          </Button>
        </>
      )}

      <header className="mb-2 flex flex-col gap-y-4 px-2 md:px-0">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            <Avatar
              size={"lg"}
              color="primary"
              src="https://heroui.com/avatars/avatar-1.png"
              className={clsx("h-24 w-24", {
                "h-16 w-16": isMobile,
              })}
            />
            <aside>
              <h3 className="text-xl font-semibold">Esteban Vl</h3>
              <h3 className="">@Esteban_vl</h3>
              {/* <AvatarGroup isBordered>
              <Avatar size="sm" src="https://heroui.com/avatars/avatar-1.png" />
              <Avatar size="sm" src="https://heroui.com/avatars/avatar-1.png" />
              <Avatar size="sm" src="https://heroui.com/avatars/avatar-1.png" />
            </AvatarGroup> */}
            </aside>
          </div>
          <div className="flex w-full items-center gap-2 md:w-auto">
            <Button color="primary" radius="full" fullWidth={isMobile}>
              Seguir
            </Button>
            <Button radius="full" variant="flat" fullWidth={isMobile}>
              Enviar mensaje
            </Button>
          </div>
        </div>
        <p className="text-sm md:text-base">
          🗞️| 𝙉𝙤.1 place for FC Barcelona news ✍🏻| Transfer, stats, updates &
          opinions 🤝🏻| Partnered with blyondesign 👨‍💻| Admin IG: petarvukovic_79
        </p>
        <ul className="flex items-center gap-x-6 text-sm md:text-base [&>li>span]:font-semibold">
          <li>
            <span>795</span> publicaciones
          </li>
          <li>
            <span>75,4 mil</span> seguidores
          </li>
          <li>
            <span>939</span> seguidos
          </li>
        </ul>
      </header>
      <Tabs
        variant="underlined"
        classNames={{
          tab: "text-base",
        }}
      >
        <Tab title="Post">
          <Post />
          <Post />
          <Post />
        </Tab>
        <Tab title="Respuestas">
          <Post />
        </Tab>
        <Tab title="Me gusta">
          <Post />
        </Tab>
      </Tabs>
    </HomeLayout>
  );
};

export default PawnderPage;
