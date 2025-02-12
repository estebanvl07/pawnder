import { Button, User } from "@heroui/react";
import { useSession } from "next-auth/react";
import React from "react";

const ProfileButton = () => {
  const { data: session, status } = useSession();

  return (
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
            // src: session?.user.image || "",
          }}
        />
      )}
    </Button>
  );
};

export default ProfileButton;
