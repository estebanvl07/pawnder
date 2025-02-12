import React from "react";
import HomeLayout from "~/modules/Home/HomeLayout";
import Navigator from "~/modules/Home/Navigator";
import dynamic from "next/dynamic";
import { Input } from "@heroui/input";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  ButtonGroup,
  Tab,
  Tabs,
  User,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Post from "~/components/Post/Post";
import { motion } from "framer-motion";
import { useResize } from "~/hooks/useResize";

const Map = dynamic(() => import("~/components/Map/Map"), {
  ssr: false,
});

const SearchPage = () => {
  const { isDesktop } = useResize();

  return (
    <HomeLayout sectionClassName="max-w-full h-full !p-0 flex">
      <motion.aside
        layout
        className="scrollbar-customize max-h-screen w-screen flex-grow overflow-y-auto px-2 py-4 md:max-w-[36rem] md:p-4"
      >
        <Navigator show={true} title="Buscar" goBack />
        <div className="mb-2 mt-2 px-2 md:px-0">
          <Input
            placeholder="Busca"
            startContent={
              <span>
                <Icon icon="mynaui:search" width={20} />
              </span>
            }
          />
        </div>
        <Tabs
          // dividerProps={{
          //   hidden: true,
          // }}
          variant="underlined"
        >
          <Tab title="Cuentas" key="1">
            <ul className="flex flex-col">
              <li className="flex items-center justify-between rounded-md px-4 py-2 hover:bg-default-50">
                <User
                  name="Pedro Va"
                  avatarProps={{ name: "Pedro Va", color: "primary" }}
                  description="@pedro_va69"
                />
              </li>
              <li className="flex items-center justify-between rounded-md px-4 py-2 hover:bg-default-50">
                <User
                  name="Pedro Va"
                  avatarProps={{ name: "Pedro Va", color: "primary" }}
                  description="@pedro_va69"
                />
              </li>
              <li className="flex items-center justify-between rounded-md px-4 py-2 hover:bg-default-50">
                <User
                  name="Pedro Va"
                  avatarProps={{ name: "Pedro Va", color: "primary" }}
                  description="@pedro_va69"
                />
              </li>
              <li className="flex items-center justify-between rounded-md px-4 py-2 hover:bg-default-50">
                <User
                  name="Pedro Va"
                  avatarProps={{ name: "Pedro Va", color: "primary" }}
                  description="@pedro_va69"
                />
              </li>
            </ul>
          </Tab>
          <Tab title="Publicaciones" key="2">
            <div className="flex flex-col">
              <Post />
              <Post />
              <Post />
            </div>
          </Tab>
        </Tabs>
      </motion.aside>
      {isDesktop && (
        <motion.div layout className="w-[35rem]">
          <Map />
        </motion.div>
      )}
    </HomeLayout>
  );
};

export default SearchPage;
