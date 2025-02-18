import { Avatar } from "@heroui/avatar";
import { Button, Image, useDisclosure, User } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { GetServerSideProps } from "next";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";
import NotFound from "~/components/404";
import { ArrowBack } from "~/components/Icons";
import Comments from "~/components/Post/Comments";
import ImagesOfPost from "~/components/Post/ImagesOfPost";
import ModalViewPost from "~/components/Post/ModalViewPost/ModalViewPost";
import { PostIncludes } from "~/components/Post/types/post";
import HomeLayout from "~/modules/Home/HomeLayout";
import { api } from "~/utils/api";
import { createServerSideCaller } from "~/utils/serverSideCaller/serverSideCaller";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { postId, profile } = ctx.params!;
  const helpers = await createServerSideCaller(ctx);

  const post = await helpers.post.getPostById.fetch(Number(postId));

  if (post?.createdBy.userTag !== profile) {
    return {
      redirect: {
        destination: `/paw/${post?.createdBy.userTag}/post/${post?.id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      postInfo: JSON.stringify(post),
    },
  };
};

const PostPage = ({ postInfo }: { postInfo: string }) => {
  const [imageSelected, setImageSelected] = useState<number>();
  const post = JSON.parse(postInfo) as PostIncludes;

  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const goToUserProfile = () => {
    router.push(`/paw/${post.createdBy?.userTag}`);
  };

  return (
    <HomeLayout
      navigator={{
        show: true,
        goBack: true,
        title: "Post",
      }}
    >
      {!post ? (
        <NotFound />
      ) : (
        <>
          <ModalViewPost
            defaultImage={imageSelected}
            isOpen={isOpen}
            onClose={onClose}
            post={post}
          />
          <div className="mb-4 flex flex-col gap-y-4 px-2 md:px-0">
            <header className="flex items-start justify-between gap-8">
              <div className="flex gap-5">
                <User
                  avatarProps={{
                    size: "md",
                    src: post.createdBy?.image || "",
                    name: post.createdBy?.name || "",
                  }}
                  className="cursor-pointer"
                  classNames={{
                    name: "cursor-ponter hover:underline",
                  }}
                  onClick={goToUserProfile}
                  description={`@${post.createdBy?.userTag}`}
                  name={post.createdBy?.name}
                />
              </div>
              <Button color="primary" radius="full" size="sm">
                Follow
              </Button>
            </header>
            <main className="">
              <p className="mb-4">
                Bun s sigue poniendo mejor cada día! Pronto tendremos 100% de
                compatibilidad con Node y un nuevo bucket S3 (Object Storage) en
                Bun para almacenar información y soporte nativo PostgreSQL en
                Bun.
              </p>

              {post.images && post.images?.length > 0 && (
                <div className="h-fit max-w-full overflow-hidden rounded-xl border">
                  <ImagesOfPost
                    onClick={(imageIndex) => {
                      setImageSelected(imageIndex);
                      onOpen();
                    }}
                    images={post.images}
                  />
                </div>
              )}
            </main>
            <footer className="flex items-center gap-3">
              <div className="flex gap-1">
                <p className="text-small font-semibold text-default-400">4</p>
                <p className="text-small text-default-400">Following</p>
              </div>
              <div className="flex gap-1">
                <p className="text-small font-semibold text-default-400">
                  97.1K
                </p>
                <p className="text-small text-default-400">Followers</p>
              </div>
            </footer>
          </div>
          {post.comments && post.comments.length > 0 && (
            <Comments comments={post.comments} />
          )}
        </>
      )}
    </HomeLayout>
  );
};

export default PostPage;
