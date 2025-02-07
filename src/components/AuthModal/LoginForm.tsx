import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import React from "react";

const LoginForm = () => {
  return (
    <>
      <h2 className="text-center text-2xl font-semibold">INICIAR SESIÓN</h2>
      <p className="mb-4 text-center">Completa los campos para iniciar</p>
      <form action="" className="flex w-full flex-col gap-y-2">
        <Input label="correo" placeholder="JhonDoe@mail.com" isRequired />
        <Input
          label="Contraseña"
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          isRequired
        />
        <Button color="primary" className="mt-2">
          Iniciar sesión
        </Button>
        <div className="flex items-center justify-center gap-2 text-sm">
          <p className="w-fit">¿No tienes cuenta?, </p>
          <p className="text-primary">Crear cuenta</p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
