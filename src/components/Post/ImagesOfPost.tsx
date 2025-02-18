import { Image } from "@heroui/react";
import { Images } from "@prisma/client";
import clsx from "clsx";
import React from "react";

interface ImageOfPostProps {
  images: Images[];
  onClick?: (index: number) => void;
}

const ImagesOfPost = ({ images, onClick }: ImageOfPostProps) => {
  return (
    <div className={clsx("grid h-full grid-cols-2 grid-rows-2")}>
      {images.map((image, index) => (
        <div
          key={image.id}
          className={clsx("h-full w-full overflow-hidden", {
            "col-span-2 row-span-2": images.length === 1,
            "col-span-1 row-span-2": images.length === 2,
            "d col-span-1 row-span-2": images.length === 3 && index === 0,
            "col-span-1 row-span-1": images.length === 3 && index !== 0,
            "r col-span-1 row-span-1": images.length === 4 && index !== 0,
          })}
        >
          <Image
            alt="Imagen de post"
            onClick={() => onClick && onClick(index)}
            className={clsx(
              "h-full w-full cursor-pointer rounded-none object-fill",
            )}
            src={image.url}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesOfPost;
