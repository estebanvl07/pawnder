import { Avatar, AvatarGroup } from "@heroui/avatar";
import { Button, Tab, Tabs } from "@heroui/react";
import { User } from "@heroui/user";
import React from "react";
import Post from "~/components/Post/Post";
import HomeLayout from "~/modules/Home/HomeLayout";

const PawnderPage = () => {
  return (
    <HomeLayout
      navigator={{
        show: true,
        goBack: true,
        title: "Esteban vl",
        subtitle: "10 Post",
      }}
    >
      <header className="mb-2 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Avatar
              size="lg"
              src="https://heroui.com/avatars/avatar-1.png"
              className="h-24 w-24"
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
          <div className="flex items-center gap-2">
            <Button color="primary" radius="full">
              Seguir
            </Button>
            <Button radius="full" variant="flat">
              Enviar mensaje
            </Button>
          </div>
        </div>
        <p>
          🗞️| 𝙉𝙤.1 place for FC Barcelona news ✍🏻| Transfer, stats, updates &
          opinions 🤝🏻| Partnered with blyondesign 👨‍💻| Admin IG: petarvukovic_79
        </p>
        <ul className="flex items-center gap-x-6 [&>li>span]:font-semibold">
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
