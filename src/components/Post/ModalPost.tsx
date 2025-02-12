import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import React from "react";
import CreatePostForm, { type ICreatePostForm } from "./CreatePostForm";
import { useResize } from "~/hooks/useResize";
import { extend } from "ol/extent";

interface ModalPostProps extends ICreatePostForm {
  isOpen: boolean;
  onClose: () => void;
}

const ModalPost = ({ isOpen = true, onClose, ...props }: ModalPostProps) => {
  return (
    <ParentContent isOpen={isOpen} onClose={onClose}>
      <CreatePostForm {...props} />
    </ParentContent>
  );
};

interface ParentContent {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ParentContent = ({ children, isOpen, onClose }: ParentContent) => {
  const { isDesktop } = useResize();

  if (isDesktop) {
    return (
      <Modal isOpen={isOpen} placement="top" onClose={onClose} size="2xl">
        <ModalContent className="font-base font-montserrat -tracking-wider">
          {(onClose) => (
            <>
              <ModalHeader>Crear Post</ModalHeader>
              <ModalBody className="mb-2">{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Drawer size="full" placement="bottom" isOpen={isOpen} onClose={onClose}>
      <DrawerContent className="font-montserrat">
        {(onClose) => (
          <>
            <DrawerHeader>Crear Post</DrawerHeader>
            <DrawerBody>{children}</DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default ModalPost;
