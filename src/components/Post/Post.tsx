import { Avatar, Button } from "@heroui/react";
import { User } from "@heroui/user";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import React from "react";
import { PostIncludes } from "./types/post";
import ImagesOfPost from "./ImagesOfPost";
import { useSession } from "next-auth/react";
import { useMyUser } from "~/hooks/useMyUser";

const PostLayout = ({
  content,
  id,
  comments,
  images,
  createdAt,
  createdBy,
  _count,
  ...props
}: PostIncludes) => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const { user } = useMyUser();

  const isMyProfile = session?.user.id === user?.id;

  const goToPost = () => {
    router.push(`/paw/test/post/${id}`);
  };

  const goToProfile = (e: any) => {
    e.stopPropagation();
    if (isMyProfile) return;
    router.push("/paw/test");
  };

  return (
    <div
      onClick={goToPost}
      className="cursor-pointer rounded-lg px-2 hover:bg-zinc-50 md:px-6"
    >
      <div className="flex items-start gap-3 border-b py-6">
        <div>
          <Avatar
            src={createdBy?.image || ""}
            name={createdBy?.name || ""}
            onClick={goToProfile}
          />
        </div>
        <aside className="flex w-full flex-col gap-y-1">
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
            {!isMyProfile && status === "authenticated" && (
              <Button color="primary" radius="full" size="sm">
                Follow
              </Button>
            )}
          </header>
          <main className="flex flex-col gap-y-4">
            <p>{content}</p>
            {images && images?.length > 0 && (
              <div className="max-h-fit max-w-full overflow-hidden rounded-xl border">
                <ImagesOfPost images={images} />
              </div>
            )}
          </main>
          <footer className="mt-2 flex items-center gap-32">
            <ul className="flex items-center justify-between gap-x-4 [&>li]:flex [&>li]:items-center [&>li]:gap-1 [&>li]:text-sm">
              <li>
                <Icon icon="mynaui:heart" width={20} />
                {/* {_count.likes || null} */}
                {/* <Icon icon="mynaui:heart-solid" width={20} /> */}
              </li>
              <li>
                <Icon icon="mynaui:chat" width={20} />
                {/* {_count.comments} */}
              </li>
              {/* <li>
                <Icon icon="mynaui:repeat" width={20} />1
              </li> */}
            </ul>
            <ul className="flex flex-1 items-center justify-end gap-x-4">
              <li>
                <Icon icon="mynaui:bookmark" width={20} />
                {/* <Icon icon="mynaui:bookmark-solid" width={20} /> */}
              </li>
              <li>
                <Icon icon="mynaui:download" width={20} />
              </li>
            </ul>
          </footer>
        </aside>
      </div>
    </div>
  );
};

export default PostLayout;
