import { Button, User } from "@heroui/react";
import React from "react";
import Comments from "../Comments";
import { motion } from "framer-motion";
import { PostIncludes } from "../types/post";
import { useRouter } from "next/router";

interface SideContentPropt {
  post: PostIncludes;
}

const SideContent = ({ post }: SideContentPropt) => {
  const router = useRouter();

  const goToProfile = () => {
    router.push(`/paw/${post.createdBy?.userTag}`);
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0.6 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      className="z-10 h-screen w-full max-w-[25rem] p-2"
    >
      <aside className="scrollbar-customize flex h-full w-full flex-col gap-y-4 overflow-y-auto rounded-md bg-white py-4 font-montserrat">
        <header className="flex items-start justify-between gap-8 px-4">
          <div className="flex gap-5">
            <User
              onClick={goToProfile}
              avatarProps={{
                size: "md",
                src: post.createdBy?.image || "",
                name: post.createdBy?.name || "",
              }}
              classNames={{
                name: "hover:underline",
                description: "",
              }}
              description={`@${post.createdBy?.userTag}`}
              name={post.createdBy?.username}
            />
          </div>
          <Button color="primary" radius="full" size="sm">
            Follow
          </Button>
        </header>
        <main className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-4 px-4">
            <p className="">{post.content}</p>
            <ul className="flex list-inside list-disc items-center gap-x-3 text-sm">
              <li className="opacity-70">5:24 PM</li>
              <li className="opacity-70">3 Feb 2024</li>
              <li className="font-semibold">1,5 M</li>
            </ul>
            <nav className="flex items-center justify-between border-b border-t px-2 py-2 text-xs">
              <p>1 mil</p>
              <p>1 mil</p>
              <p>1 mil</p>
              <p>1 mil</p>
            </nav>
          </div>
          <Comments />
        </main>
      </aside>
    </motion.div>
  );
};

export default SideContent;
