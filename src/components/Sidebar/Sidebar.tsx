import React from "react";
import { SIDE_OPTIONS } from "./options";
import Option from "./option";
import { useSession } from "next-auth/react";
import SignIn from "./SignIn";
import ProfileButton from "./ProfileButton";
import { Button, useDisclosure } from "@heroui/react";
import CreatePostForm from "../Post/CreatePostForm";
import ModalPost from "../Post/ModalPost";

const Sidebar = () => {
  const { status } = useSession();
  const isAuthenticating = status === "authenticated";
  const isLoading = status === "loading";

  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <div className="z-10 flex w-72 flex-col border-r bg-zinc-50 p-4">
        <h1 className="text-2xl font-semibold">Pawnder</h1>
        <nav className="flex-grow">
          <ul className="mt-10 flex flex-col gap-y-4 text-gray-600">
            {SIDE_OPTIONS.map((option, index) => {
              return <Option key={index} {...option} />;
            })}
          </ul>
          <Button
            onPress={onOpen}
            color="primary"
            fullWidth
            className="mt-8"
            radius="full"
          >
            Crear Post
          </Button>
        </nav>
        {!isLoading && (
          <footer>{!isAuthenticating ? <SignIn /> : <ProfileButton />}</footer>
        )}
      </div>
      <ModalPost isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Sidebar;
