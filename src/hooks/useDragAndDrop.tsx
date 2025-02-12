import { ChangeEvent, useState } from "react";
import type { DragEventType } from "~/components/Input/types/File.types";

type DragZoneType = {
  isHover: boolean;
  url: string;
  file: File;
};

type DefaultValues = {
  url: string;
  file?: File;
};

export const useDragAndDrop = ({
  filesLength,
  defaultValues = [],
}: {
  filesLength: number;
  defaultValues?: DefaultValues[];
}) => {
  const [dragZones, setDragZones] = useState(
    [...Array<void>(filesLength)].map<DragZoneType>((_, index) => ({
      isHover: false,
      url: defaultValues[index]?.url || "",
      file: (defaultValues[index]?.file || null) as unknown as File,
    })),
  );

  const showImage = (file: File, index: number) => {
    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
      const url = fileReader.result!.toString();
      setOneDragZone(index, {
        url,
        file,
      });
    });
    if (file) fileReader.readAsDataURL(file);
  };

  const setOneDragZone = (index: number, value: Partial<DragZoneType>) => {
    setDragZones((dz) => [
      ...dz.slice(0, index),
      { ...dz[index]!, ...value },
      ...dz.slice(index + 1),
    ]);
  };

  // element selected
  const dragOver = (e: DragEventType, index: number) => {
    e.preventDefault();
    setOneDragZone(index, { isHover: true });
  };

  // exit zone of input
  const dragLeave = (e: DragEventType, index: number) => {
    e.preventDefault();
    setOneDragZone(index, { isHover: false });
  };

  // drop file
  const drop = (e: DragEventType, index: number) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]!;
    showImage(file, index);
  };

  const changeFile = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.item;
    if (file) {
      console.log(file);

      //   showImage(file, index);
    }
  };

  const deleteFile = (index: number) => {
    setOneDragZone(index, {
      url: "",
      file: null as unknown as File,
    });
  };

  return {
    dragZones,
    dragOver,
    dragLeave,
    drop,
    changeFile,
    deleteFile,
  };
};
