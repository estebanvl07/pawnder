import React from "react";
import { useFilesContext } from "./context/FilesContext";
import Image from "next/image";
import { Button, useDisclosure } from "@heroui/react";
import { Close } from "../Icons";
import clsx from "clsx";

import { motion } from "framer-motion";
import ImageModal from "../Modal/ImageModal";

interface ImageView {
  src: string;
  index: number;
}

const ImageView = ({ src, index }: ImageView) => {
  const { files, setFiles } = useFilesContext();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const onDelete = () => {
    const newFiles = files.filter((file, i) => i !== index);
    setFiles(newFiles);
  };

  return (
    <>
      <ImageModal isOpen={isOpen} imageUrl={src} onClose={onClose} />
      <div
        className={clsx(
          "group relative h-72 w-[90rem] overflow-hidden rounded-lg border",
        )}
        onClick={onOpen}
      >
        <Button
          variant="flat"
          className="absolute right-4 top-4 z-10"
          onPress={onDelete}
          isIconOnly
          size="sm"
          radius="full"
        >
          <Close color="white" size={18} />
        </Button>
        <Image
          src={src}
          className={clsx(
            "h-full w-full object-cover opacity-100 transition-transform duration-300 group-hover:scale-110",
          )}
          width={1200}
          height={400}
          alt="upload image"
        />
      </div>
    </>
  );
};

export default ImageView;
