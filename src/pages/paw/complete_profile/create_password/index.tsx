import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowForward } from "~/components/Icons";
import { useMyUser } from "~/hooks/useMyUser";
import { api } from "~/utils/api";

const CreatePasswordPage = () => {
  const [passowrd, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassowrd, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { isLoading, user } = useMyUser();

  const { mutateAsync: CreatePasswordMutation, isPending } =
    api.user.createPassword.useMutation();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    CreatePasswordMutation(passowrd, {
      onSuccess(data, variables, context) {
        if (data.success) {
          router.push("/paw");
        }
      },
    });
  };

  useEffect(() => {
    user?.accountStep === 2 &&
      router.push("/paw/complete_profile/create_password");
    user?.accountStep === 3 && router.push("/paw");
  }, [isLoading, user]);

  if (!user || isLoading) return null;

  return (
    <div className="flex h-full min-h-screen w-screen items-center justify-center">
      <div className="mx-auto w-full max-w-[30rem]">
        <h1 className="text-3xl font-semibold">CREA UNA CONTRASEÑA</h1>
        <p>Termina de configurar tu cuenta</p>

        <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2">
          <Input
            label="contraseña"
            placeholder="••••••••"
            type={showPassowrd ? "text" : "password"}
            value={passowrd}
            onValueChange={(value) => {
              setPassword(value);
            }}
            startContent={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassowrd)}
              >
                {showPassowrd ? (
                  <Icon icon="mynaui:eye" width={20} />
                ) : (
                  <Icon icon="mynaui:eye-slash" width={20} />
                )}
              </button>
            }
            validate={(value) => {
              if (value.length < 8) {
                return "La contraseña debe tener minimo 8 caracteres";
              }

              return null;
            }}
            isRequired
          />
          <Input
            label="Confirmar contraseña"
            placeholder="••••••••"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onValueChange={(value) => {
              setConfirmPassword(value);
            }}
            startContent={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <Icon icon="mynaui:eye" width={20} />
                ) : (
                  <Icon icon="mynaui:eye-slash" width={20} />
                )}
              </button>
            }
            validate={(value) => {
              if (passowrd !== value) {
                return "Las contraseñas no coinciden";
              }

              return null;
            }}
            isRequired
          />
          <Button
            fullWidth
            isLoading={isPending}
            color="primary"
            type="submit"
            className="mt-4"
          >
            Continuar <ArrowForward color="white" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePasswordPage;
