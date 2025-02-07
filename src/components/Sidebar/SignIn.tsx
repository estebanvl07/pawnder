import { Button, useDisclosure } from "@heroui/react";
import React, { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";

const SignIn = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <AuthModal
        isOpen={isOpen}
        title="Modal de autentificación"
        backdrop="blur"
        onOpenChange={onOpenChange}
      />
      <Button color="primary" className="w-full" onPress={onOpen}>
        Iniciar sesión
      </Button>
    </>
  );
};

export default SignIn;
