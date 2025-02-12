import { Avatar } from "@heroui/avatar";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import React, { ChangeEvent, useEffect, useState } from "react";
import CustomInputFile from "../Input/File";
import FilesProvider, { useFilesContext } from "./context/FilesContext";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ImageView from "./ImageView";

export interface ICreatePostForm {
  classNames?: {
    contentClassName?: string;
    wrapper?: string;
  };
  placeholder?: string;
  showDivider?: boolean;
  type?: "response" | "post";
}

const CreatePostForm = ({
  classNames,
  showDivider,
  placeholder = "¿Que estás pensando?",
  type = "post",
}: ICreatePostForm) => {
  const { files } = useFilesContext();
  const [text, setText] = useState<string>("");

  const { data: session } = useSession();

  const { mutateAsync: CreatePostMutation, isPending } =
    api.post.create.useMutation();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const onCreatePost = async () => {
    await CreatePostMutation(
      { content: text },
      {
        onSuccess: () => {},
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <div className={clsx("flex flex-col", classNames?.contentClassName)}>
      <div className="flex items-start gap-x-4">
        <div>
          <Avatar
            src={session?.user.image || undefined}
            name={session?.user.name || ""}
          />
        </div>
        <div className="w-full rounded-xl border p-3 pt-1">
          <div className="flex flex-col gap-y-3">
            <Textarea
              className="w-full text-sm outline-none"
              classNames={{
                inputWrapper: "!border-none !shadow-none px-2",
              }}
              variant="bordered"
              minRows={1}
              placeholder={placeholder}
              value={text}
              onChange={onChange}
            />
            {files.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto">
                {files.map((file, index) => (
                  <ImageView src={file} index={index} />
                ))}
              </div>
            )}
          </div>

          <footer className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <CustomInputFile />
              {/* <Button size="sm" isIconOnly radius="full" variant="flat">
                <Icon icon="mynaui:image" width={18} />
              </Button> */}
              <Button size="sm" isIconOnly radius="full" variant="flat">
                <Icon icon="famicons:paw" width={18} />
              </Button>
              <Button size="sm" isIconOnly radius="full" variant="flat">
                <Icon icon="fluent:gif-16-regular" width={18} />
              </Button>
            </div>
            <Button
              color="primary"
              radius="full"
              onPress={onCreatePost}
              isDisabled={text === ""}
              isLoading={isPending}
            >
              {isPending
                ? "Posteando"
                : type === "post"
                  ? "Postear"
                  : "Responder"}
            </Button>
          </footer>
        </div>
      </div>
      {showDivider && <hr className="my-4" />}
    </div>
  );
};

export default CreatePostForm;
