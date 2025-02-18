import { Image, Modal, ModalBody, ModalContent } from "@heroui/react";
import clsx from "clsx";
import React from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  imageUrl: string;
}

const ImageModal = ({
  isOpen,
  onClose,
  className,
  imageUrl,
}: ImageModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" backdrop="blur">
      <ModalContent className="flex items-center justify-center bg-black/70">
        {(onClose) => (
          <ModalBody className="flex items-center justify-center">
            <Image
              src={imageUrl}
              className={clsx("max-w-[50rem] rounded-2xl", className)}
            />
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
