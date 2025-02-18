import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { ArrowForward } from "~/components/Icons";
import { updateUser } from "~/types/schemas/userSchema";
import { api } from "~/utils/api";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useMyUser } from "~/hooks/useMyUser";

const CompleteProfile = () => {
  const [userTag, setUserTag] = useState("");
  const { mutateAsync: UpdateUserMutation, isPending } =
    api.user.completeUser.useMutation();

  const { isLoading, user } = useMyUser();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<updateUser>({
    resolver: zodResolver(updateUser),
  });

  const onSubmit = (payload: updateUser) => {
    UpdateUserMutation(
      { userTag, ...payload },
      {
        onSuccess(data, variables, context) {
          if (data.accountStep === 2) {
            router.push("/paw/complete_profile/create_password");
          }
        },
      },
    );
  };

  useEffect(() => {
    user?.accountStep === 2 &&
      router.push("/paw/complete_profile/create_password");
    user?.accountStep === 3 && router.push("/paw");
  }, [isLoading, user]);

  if (!user || isLoading) return null;

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="max-w-7x l flex items-center justify-center">
        <div className="flex max-w-2xl flex-1 items-center justify-center">
          <div className="flex h-full min-h-screen w-screen items-center justify-center">
            <div className="mx-auto w-full max-w-[30rem]">
              <h1 className="text-3xl font-semibold">COMPLETA TU PERFIL</h1>
              <p>Termina de configurar tu cuenta</p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4 flex flex-col gap-2"
              >
                <Input
                  label="Nombre de usuario"
                  placeholder="Jhon_Doe"
                  onValueChange={(value) => {
                    setUserTag(value.split(" ").join("_"));
                  }}
                  startContent={
                    <span className="text-sm text-default-500">@</span>
                  }
                  description={
                    <>
                      {watch("username") && (
                        <div className="flex items-center gap-1">
                          <span className="font-medium">username: </span>{" "}
                          <p>@{userTag}</p>
                        </div>
                      )}
                    </>
                  }
                  isInvalid={Boolean(errors.username)}
                  errorMessage={errors.username?.message}
                  isRequired
                  {...register("username")}
                />
                <Input
                  label="Correo"
                  placeholder="jhon@doe.com"
                  isInvalid={Boolean(errors.email)}
                  errorMessage={errors.email?.message}
                  isRequired
                  {...register("email")}
                />
                <Input
                  label="Ubicación"
                  placeholder="Barranquilla, Medellin, ..."
                  {...register("location")}
                />
                <Input
                  label="Página web"
                  placeholder="https://paw.com"
                  type="url"
                  {...register("website")}
                />
                <Textarea
                  label="Biografía"
                  placeholder="Escribe tu bio"
                  {...register("biography")}
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
        </div>
        <aside className="flex h-screen flex-1 flex-col justify-center gap-y-4 rounded-l-3xl bg-gradient-to-r from-primary to-primary-700 p-16 text-white">
          <div className="flex gap-x-2 text-center">
            <Icon icon="ion:paw" width={18} />
            <span className="font-semibold">PAWNDER</span>
          </div>
          <h2 className="text-5xl font-medium">
            !ESTAS A PUNTO DE TERMINAR TU REGISTRO!
          </h2>
          <p className="max-w-sm">
            Una plataforma dedicada para encontrar hogar y refugio a los
            animales
          </p>
        </aside>
      </div>
    </main>
  );
};

export default CompleteProfile;
