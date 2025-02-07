import React from "react";
import Post from "./Post";
import { Textarea } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/react";

const Comments = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col px-6">
        <div className="flex items-start gap-x-4">
          <div>
            <Avatar src="https://heroui.com/avatars/avatar-1.png" />
          </div>
          <Textarea placeholder="¿Cual es tu respuesta?" rows={3} />
        </div>
        <footer className="mt-4 flex items-end justify-end">
          <Button color="primary" radius="full" size="sm">
            Responder
          </Button>
        </footer>
        <hr className="my-4" />
      </div>
      <div className="flex flex-col text-sm">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default Comments;
