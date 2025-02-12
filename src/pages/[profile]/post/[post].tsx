import { Avatar } from "@heroui/avatar";
import { Button, Image, useDisclosure, User } from "@heroui/react";
import React from "react";
import Comments from "~/components/Post/Comments";
import ModalViewPost from "~/components/Post/ModalViewPost/ModalViewPost";
import HomeLayout from "~/modules/Home/HomeLayout";

const PostPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <HomeLayout
      navigator={{
        show: true,
        goBack: true,
        title: "Post",
      }}
    >
      <ModalViewPost isOpen={isOpen} onClose={onClose} />
      <div className="mb-4 flex flex-col gap-y-4 px-2 md:px-0">
        <header className="flex items-start justify-between gap-8">
          <div className="flex gap-5">
            <User
              avatarProps={{
                size: "md",
                src: "https://heroui.com/avatars/avatar-1.png",
              }}
              description="Product Designer"
              name="Zoey Lang"
            />
          </div>
          <Button color="primary" radius="full" size="sm">
            Follow
          </Button>
        </header>
        <main className="">
          <p className="mb-4">
            Bun s sigue poniendo mejor cada día! Pronto tendremos 100% de
            compatibilidad con Node y un nuevo bucket S3 (Object Storage) en Bun
            para almacenar información y soporte nativo PostgreSQL en Bun.
          </p>
          <Image
            onClick={onOpen}
            alt="Woman listing to music"
            className="w-full cursor-pointer object-cover"
            src="https://heroui.com/images/hero-card.jpeg"
            width={"100%"}
            style={{
              viewTransitionName: "image",
            }}
          />
        </main>
        <footer className="flex items-center gap-3">
          <div className="flex gap-1">
            <p className="text-small font-semibold text-default-400">4</p>
            <p className="text-small text-default-400">Following</p>
          </div>
          <div className="flex gap-1">
            <p className="text-small font-semibold text-default-400">97.1K</p>
            <p className="text-small text-default-400">Followers</p>
          </div>
        </footer>
      </div>
      <Comments />
    </HomeLayout>
  );
};

export default PostPage;
