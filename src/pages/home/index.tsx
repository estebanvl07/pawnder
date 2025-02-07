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
import dynamic from "next/dynamic";
import React from "react";
import { Map } from "~/components";
import Post from "~/components/Post/Post";
import Sidebar from "~/components/Sidebar/Sidebar";
import HomeLayout from "~/modules/Home/HomeLayout";

const DynamicMap = dynamic(() => import("../../components/Map/Map"), {
  ssr: false,
});

const HomePage = () => {
  return (
    <HomeLayout>
      <header className="mb-3 flex items-center justify-between px-2">
        <aside className="">
          <p className="mb-0 text-sm opacity-80">Hola Esteban vl</p>
          <h1 className="m-0 text-2xl font-semibold leading-6">Bienvenido</h1>
        </aside>
        <Avatar name="Esteban" color="primary" />
      </header>
      <Tabs variant="underlined">
        <Tab title="Para ti">
          <div className="mt-2">
            <Input
              placeholder="-  ¿Que mascota quieres encontrar?"
              label="Mascota"
              endContent={
                <Button className="h-full" color="primary">
                  Buscar
                </Button>
              }
            />
          </div>
          <div className="mt-4 flex flex-col">
            <Post />
            <Post />
            <Post />
          </div>
        </Tab>
        <Tab title="Seguidos">
          <div className="mt-2">
            <Input
              placeholder="-  ¿Que mascota quieres encontrar?"
              label="Mascota"
              endContent={
                <Button className="h-full" color="primary">
                  Buscar
                </Button>
              }
            />
          </div>
          <div className="mt-4 flex flex-col">
            <Post />
          </div>
        </Tab>
      </Tabs>
    </HomeLayout>
  );
};

export default HomePage;
