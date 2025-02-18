import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { ArrowBack } from "./Icons";

const NotFound = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 pb-20">
      <Icon icon="mynaui:sad-ghost" width={43} />
      <h4>Algo salió mal al intentar cargara este post</h4>
      <Button
        color="primary"
        radius="full"
        startContent={<ArrowBack color="white" />}
      >
        Ir atrás
      </Button>
    </div>
  );
};

export default NotFound;
