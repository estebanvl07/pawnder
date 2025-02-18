import React from "react";
import HomeLayout from "~/modules/Home/HomeLayout";
import Navigator from "~/modules/Home/Navigator";
import dynamic from "next/dynamic";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  ButtonGroup,
  Spinner,
  Tab,
  Tabs,
  User,
} from "@heroui/react";
import { motion } from "framer-motion";
import { useResize } from "~/hooks/useResize";
import Searcher from "~/components/Searcher/Searcher";
import { useSearcherContext } from "~/contexts/searcherContext";
import Link from "next/link";
import PostLayout from "~/components/Post/Post";
import { PostIncludes } from "~/components/Post/types/post";

const Map = dynamic(() => import("~/components/Map/Map"), {
  ssr: false,
});

const SearchPage = () => {
  const { isDesktop } = useResize();
  const { posts, users, isLoading } = useSearcherContext();

  return (
    <HomeLayout
      sectionClassName="w-full !p-0 flex"
      navigator={{
        show: true,
        goBack: true,
        title: "Buscar",
      }}
    >
      <motion.aside layout className="w-[42rem] flex-grow px-2 md:px-4">
        <Searcher />
        <Tabs variant="underlined">
          <Tab title="Cuentas" key="1">
            {isLoading ? (
              <div className="flex w-full items-center justify-center py-4">
                <Spinner />
              </div>
            ) : (
              <ul className="flex flex-col">
                {users.map(({ username, id, userTag, image }) => {
                  return (
                    <li key={id}>
                      <Link
                        href={`/paw/${userTag}`}
                        className="flex cursor-pointer items-center justify-between rounded-md px-4 py-2 hover:bg-default-50"
                      >
                        <User
                          name={username}
                          avatarProps={{
                            name: username || "",
                            color: "primary",
                            src: image || "",
                          }}
                          description={`@${userTag}`}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </Tab>
          <Tab title="Publicaciones" key="2">
            {isLoading ? (
              <div className="flex w-full items-center justify-center py-4">
                <Spinner />
              </div>
            ) : (
              <>
                {posts?.map((post) => {
                  return (
                    <PostLayout {...(post as PostIncludes)} key={post.id} />
                  );
                })}
              </>
            )}
          </Tab>
        </Tabs>
      </motion.aside>
    </HomeLayout>
  );
};

export default SearchPage;
