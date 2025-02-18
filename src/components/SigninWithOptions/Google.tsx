import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

import { signIn } from "next-auth/react";
import { CALLBACK_SIGN_IN_URL } from "~/constants/config";

const GoogleSignIn = () => {
  return (
    <Button
      variant="flat"
      fullWidth
      onPress={() =>
        signIn("google", {
          redirect: false,
          redirectTo: CALLBACK_SIGN_IN_URL,
        })
      }
      startContent={<Icon icon="devicon:google" width={24} />}
    >
      Iniciar con Google
    </Button>
  );
};

export default GoogleSignIn;
