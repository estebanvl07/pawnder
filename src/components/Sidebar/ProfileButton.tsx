import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const ProfileButton = () => {
  const { data: session, status } = useSession();

  return (
    <Dropdown className="font-montserrat">
      <DropdownTrigger>
        <Button
          radius="full"
          variant="flat"
          fullWidth
          className="border !px-2 !py-7"
        >
          {status === "authenticated" && (
            <User
              name={session.user.name}
              description={session.user.email}
              avatarProps={{
                name: session?.user.name || "",
                color: "primary",
                src: session?.user.image || undefined,
              }}
            />
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={(key) => alert(key)}
      >
        {/* <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem> */}
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem
          onPress={() =>
            signOut({
              redirect: false,
              callbackUrl: "/",
            })
          }
          key="delete"
          className="text-danger"
          color="danger"
        >
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileButton;
