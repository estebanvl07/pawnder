import { Avatar, AvatarGroup } from "@heroui/avatar";
import { Button, Spinner, Tab, Tabs, useDisclosure } from "@heroui/react";
import { User } from "@heroui/user";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import NotFound from "~/components/404";
import ImageModal from "~/components/Modal/ImageModal";
import ModalPost from "~/components/Post/ModalPost";
import Post from "~/components/Post/Post";
import { PostIncludes } from "~/components/Post/types/post";
import { useMyUser } from "~/hooks/useMyUser";
import { useResize } from "~/hooks/useResize";
import { useUser } from "~/hooks/useUser";
import HomeLayout from "~/modules/Home/HomeLayout";
import { UserIncludes } from "~/types/user";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const helpers = await createServerSideCaller(ctx);
  const { profile } = ctx.params!;
  const user = await helpers.user.getUserByTag.fetch({
    userTag: String(profile),
  });

  return {
    props: {
      profile: JSON.stringify(user),
    },
  };
};

const PawnderPage = ({ profile }: { profile: string }) => {
  const user = JSON.parse(profile) as UserIncludes;
  const { data: session, status } = useSession();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: imgIsOPen,
    onClose: imgOnClose,
    onOpen: imgOnOpen,
  } = useDisclosure();
  const { isMobile } = useResize();

  const params = useParams<{ profile: string }>();

  // const { user, isLoading } = useUser({ userTag: params?.profile || "" });

  if (user) {
    return (
      <HomeLayout
        navigator={{
          show: true,
          goBack: true,
          title: user.username || "",
          subtitle: `${user._count?.posts} Post`,
        }}
        // sectionClassName="w-full"
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
        <ImageModal
          isOpen={imgIsOPen}
          imageUrl={user.image || ""}
          className="h-72 w-72 rounded-full border-4"
          onClose={imgOnClose}
        />
        <header className="mb-2 flex flex-col gap-y-4 px-2 md:px-0">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-5">
              <Avatar
                size={"lg"}
                onClick={imgOnOpen}
                color="primary"
                src={user.image || ""}
                className={clsx("h-24 w-24 cursor-pointer", {
                  "h-16 w-16": isMobile,
                })}
              />
              <aside>
                <h3 className="text-xl font-semibold">{user.username || ""}</h3>
                <h3 className="">@{user.userTag}</h3>
                {/* <AvatarGroup isBordered>
                <Avatar size="sm" src="https://heroui.com/avatars/avatar-1.png" />
                <Avatar size="sm" src="https://heroui.com/avatars/avatar-1.png" />
                <Avatar size="sm" src="https://heroui.com/avatars/avatar-1.png" />
              </AvatarGroup> */}
              </aside>
            </div>
            {status === "authenticated" && session.user.id !== user.id && (
              <div className="flex w-full items-center gap-2 md:w-auto">
                <Button color="primary" radius="full" fullWidth={isMobile}>
                  Seguir
                </Button>
                <Button radius="full" variant="flat" fullWidth={isMobile}>
                  Enviar mensaje
                </Button>
              </div>
            )}
            {session?.user.id === user.id && (
              <Button color="primary" radius="full" fullWidth={isMobile}>
                Editar Perfil
              </Button>
            )}
          </div>
          <p className="text-sm md:text-base">{user.biography}</p>
          <ul className="flex items-center gap-x-6 text-sm md:text-base [&>li>span]:font-semibold">
            <li>
              <span>{user._count?.posts}</span> publicaciones
            </li>
            <li>
              <span>{user._count?.followers}</span> seguidores
            </li>
            <li>
              <span>{user._count?.following}</span> seguidos
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
            {user.posts?.map((post) => {
              return <Post {...(post as PostIncludes)} key={post.id} />;
            })}
          </Tab>
          <Tab title="Respuestas">{/* <Post /> */}</Tab>
          <Tab title="Me gusta">{/* <Post /> */}</Tab>
          <Tab title="Guardados">{/* <Post /> */}</Tab>
        </Tabs>
      </HomeLayout>
    );
  }
  return <NotFound />;

  // console.log(user.);
};

export default PawnderPage;
