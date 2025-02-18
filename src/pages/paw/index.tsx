import { Avatar } from "@heroui/avatar";
import { Input } from "@heroui/input";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  CardHeader,
  Tabs,
  Tab,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React from "react";
import { Map } from "~/components";
import CreatePostForm from "~/components/Post/CreatePostForm";
import Post from "~/components/Post/Post";
import Sidebar from "~/components/Sidebar/Sidebar";
import { useMyUser } from "~/hooks/useMyUser";
import HomeLayout from "~/modules/Home/HomeLayout";

const DynamicMap = dynamic(() => import("../../components/Map/Map"), {
  ssr: false,
});

const HomePage = () => {
  const { data: session, status } = useSession();

  const { user, isLoading } = useMyUser();

  return (
    <HomeLayout
      navigator={{
        show: true,
        classNames: {
          headerClassName: "!px-4",
        },
        children: (
          <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <aside className="">
              <p className="mb-0 text-sm opacity-80">Hola, {user?.username}</p>
              <h1 className="m-0 text-2xl font-semibold leading-6">
                Bienvenido
              </h1>
            </aside>
            <div className="flex w-full items-center gap-2 md:w-auto">
              <Input
                placeholder="Busca"
                size="lg"
                startContent={
                  <span>
                    <Icon icon="mynaui:search" width={20} />
                  </span>
                }
              />
            </div>
          </div>
        ),
      }}
    >
      <Tabs variant="underlined">
        <Tab title="Para ti">
          {status !== "loading" && status === "authenticated" && (
            <div className="mt-2">
              <CreatePostForm showDivider />
            </div>
          )}
          <div className="flex flex-col">
            <Post />
            <Post />
            <Post />
          </div>
        </Tab>
        <Tab title="Seguidos">
          <div className="mt-2">
            <CreatePostForm showDivider />
          </div>
          <div className="flex flex-col">
            <Post />
          </div>
        </Tab>
      </Tabs>
    </HomeLayout>
  );
};

export default HomePage;
