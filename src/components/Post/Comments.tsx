import React from "react";
import Post from "./Post";
import CreatePostForm from "./CreatePostForm";

const Comments = () => {
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
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Comments;
