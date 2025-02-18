import { Input } from "@heroui/input";
import { Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { GoogleSignIn } from "~/components";
import { motion } from "framer-motion";
import { AuthMode } from "~/pages";

export interface AuthFormProps {
  setMode: (mode: AuthMode) => void;
}

const LoginForm = ({ setMode }: AuthFormProps) => {
  return (
    <motion.div
      className="w-full max-w-[24rem]"
      initial={{
        x: 100,
        opacity: 0.5,
      }}
      exit={{
        x: 100,
        opacity: 0,
      }}
      animate={{ x: 0, opacity: 1 }}
    >
      <h2 className="text-center text-2xl font-medium">Iniciar sesión</h2>
      <p className="mb-4 text-center">
        Inicia sesión con alguna de estas opciones
      </p>
      <GoogleSignIn />
      <form action="" className="mt-4 flex w-full flex-col gap-y-2">
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
          <p
            onClick={() => setMode("register")}
            className="cursor-pointer text-primary"
          >
            Crear cuenta
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;
