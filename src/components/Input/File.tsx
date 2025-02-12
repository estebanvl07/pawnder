import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useFilesContext } from "../Post/context/FilesContext";

interface InputFileProps {
  onChangeImage?: (images: string[]) => void;
}

const CustomInputFile = ({ onChangeImage }: InputFileProps) => {
  const { setFiles } = useFilesContext();

  const convertFileToBlob = (file: File) => {
    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
      const url = fileReader.result!.toString();
      setFiles((prev) => [...prev, url]);
    });

    if (file) fileReader.readAsDataURL(file);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files?.length; i++) {
        const file = files[i];
        if (file) {
          convertFileToBlob(file);
        }
      }
    }
  };

  return (
    <Button isIconOnly radius="full" size="sm" variant="flat">
      <label htmlFor="file">
        <Icon icon="mynaui:image" className="cursor-pointer" width={20} />
        <input
          type="file"
          onChange={onChange}
          multiple
          id="file"
          className="hidden"
        />
      </label>
    </Button>
  );
};

export default CustomInputFile;
