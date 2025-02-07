import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import React from "react";

const SignUpForm = () => {
  return (
    <>
      <h2 className="text-center text-2xl font-semibold">REGISTRARME</h2>
      <p className="mb-4 text-center">
        Estas a solo un paso de ser parte de pawnder
      </p>
      <form action="" className="flex w-full max-w-[34rem] flex-col gap-y-2">
        <Input label="correo" placeholder="JhonDoe@mail.com" isRequired />
        <Input
          label="Contraseña"
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          isRequired
        />
        <Input
          label="Confirmar Contraseña"
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          isRequired
        />
        <Button color="primary" className="mt-2">
          Registrarme
        </Button>
        <div className="flex items-center justify-center gap-2 text-sm">
          <p className="w-fit">¿No tienes cuenta?, </p>
          <p className="text-primary">Crear cuenta</p>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
