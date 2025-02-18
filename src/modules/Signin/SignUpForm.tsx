import { Input } from "@heroui/input";
import { Button, Link } from "@heroui/react";
import React from "react";
import { motion } from "framer-motion";
import { AuthFormProps } from "./LoginForm";
import { GoogleSignIn } from "~/components";

const SignUpForm = ({ setMode }: AuthFormProps) => {
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
      <h2 className="text-center text-2xl font-medium">Registrarme</h2>
      <p className="mb-4 text-center">
        Estas a solo un paso de ser parte de pawnder
      </p>
      <GoogleSignIn />
      <form
        action=""
        className="mt-4 flex w-full max-w-[34rem] flex-col gap-y-2"
      >
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
          <p className="w-fit">¿ya tienes cuenta?, </p>
          <p
            onClick={() => setMode("login")}
            className="cursor-pointer text-primary"
          >
            Iniciar sesión
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default SignUpForm;
