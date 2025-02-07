import { Avatar, Button, Image } from "@heroui/react";
import { User } from "@heroui/user";
import { useRouter } from "next/router";
import React from "react";

const Post = () => {
  const router = useRouter();

  const goToPost = () => {
    router.push("/test/post/23");
  };

  const goToProfile = (e: any) => {
    e.stopPropagation();
    router.push("/test");
  };

  return (
    <div
      onClick={goToPost}
      className="cursor-pointer rounded-lg px-6 hover:bg-zinc-100"
    >
      <div className="flex items-start gap-3 border-b py-6">
        <div>
          <Avatar
            src="https://heroui.com/avatars/avatar-1.png"
            onClick={goToProfile}
          />
        </div>
        <aside className="flex flex-col gap-y-3">
          <header className="flex items-start justify-between gap-8">
            <div className="flex gap-5">
              <User
                onClick={goToProfile}
                avatarProps={{
                  size: "md",
                  className: "hidden",
                }}
                classNames={{
                  name: "hover:underline",
                  description: "",
                }}
                description="Product Designer"
                name="Zoey Lang"
              />
            </div>
            <Button color="primary" radius="full" size="sm">
              Follow
            </Button>
          </header>
          <main>
            <p className="mb-4">
              Bun s sigue poniendo mejor cada día! Pronto tendremos 100% de
              compatibilidad con Node y un nuevo bucket S3 (Object Storage) en
              Bun para almacenar información y soporte nativo PostgreSQL en Bun.
            </p>
            <Image
              alt="Woman listing to music"
              className="w-full object-cover"
              style={{
                viewTransitionName: "image",
              }}
              width={"100%"}
              src="https://heroui.com/images/hero-card.jpeg"
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
        </aside>
      </div>
    </div>
  );
};

export default Post;
