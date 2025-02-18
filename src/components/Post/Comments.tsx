import React from "react";
import Post from "./Post";
import CreatePostForm from "./CreatePostForm";
import { PostIncludes } from "./types/post";

const Comments = ({ comments }: { comments: PostIncludes[] }) => {
  console.log(comments);

  return (
    <div className="flex flex-col">
      <CreatePostForm
        placeholder="¿Cuál es tu respuesta?"
        showDivider
        classNames={{
          contentClassName: "px-6",
        }}
      />
      <div className="flex flex-col text-sm">
        {comments?.map((comment) => {
          return <Post {...comment} />;
        })}
      </div>
    </div>
  );
};

export default Comments;
