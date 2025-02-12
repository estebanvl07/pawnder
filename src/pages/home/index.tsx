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
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React from "react";
import { Map } from "~/components";
import CreatePostForm from "~/components/Post/CreatePostForm";
import Post from "~/components/Post/Post";
import Sidebar from "~/components/Sidebar/Sidebar";
import HomeLayout from "~/modules/Home/HomeLayout";

const DynamicMap = dynamic(() => import("../../components/Map/Map"), {
  ssr: false,
});

const HomePage = () => {
  const { data: session, status } = useSession();

  return (
    <HomeLayout>
      <header className="mb-3 flex items-center justify-between px-2">
        <aside className="">
          <p className="mb-0 text-sm opacity-80">Hola Esteban vl</p>
          <h1 className="m-0 text-2xl font-semibold leading-6">Bienvenido</h1>
        </aside>
        <Avatar
          name={session?.user.name || "Any"}
          // src={session?.user.image || undefined}
          color="primary"
        />
      </header>
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
