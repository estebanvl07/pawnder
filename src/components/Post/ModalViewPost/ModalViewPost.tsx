import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  User,
} from "@heroui/react";
import React, { useState } from "react";
import Post from "../Post";
import Comments from "../Comments";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import SideContent from "./SideContent";
import { Close, DoubleArrowBack, DoubleArrowForward } from "~/components/Icons";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useResize } from "~/hooks/useResize";
import clsx from "clsx";
import { PostIncludes } from "../types/post";

interface ModalViewProps {
  isOpen: boolean;
  defaultImage?: number;
  onClose: () => void;
  post: PostIncludes;
}

const ModalViewPost = ({
  isOpen,
  onClose,
  defaultImage = 0,
  post,
}: ModalViewProps) => {
  const [showSideContent, setShowSideContent] = useState(true);

  const { images } = post;

  const { isDesktop } = useResize();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" backdrop="opaque">
      <ModalContent className="bg-transparent font-montserrat">
        {(onClose) => (
          <>
            <ModalBody className="flex flex-row items-center gap-0 bg-black/60 p-0">
              <motion.div
                layout
                className="relative flex h-screen flex-grow items-center justify-center"
              >
                <div
                  className={clsx(
                    "absolute top-0 z-10 flex w-full items-center justify-between p-3 py-3 md:p-8 md:py-8",
                  )}
                >
                  <Button
                    className="bg-transparent"
                    onPress={onClose}
                    isIconOnly
                    radius="full"
                  >
                    <Close color="white" />
                  </Button>
                  {isDesktop && (
                    <Button
                      className="bg-transparent"
                      isIconOnly
                      radius="full"
                      onPress={() => setShowSideContent(!showSideContent)}
                    >
                      {showSideContent ? (
                        <DoubleArrowForward color="white" />
                      ) : (
                        <DoubleArrowBack color="white" />
                      )}
                    </Button>
                  )}
                </div>

                <div className={clsx("w-screen md:w-[calc(100vw-25rem)]")}>
                  <Swiper
                    defaultValue={defaultImage}
                    centeredSlides
                    centeredSlidesBounds
                    spaceBetween={0}
                  >
                    {images &&
                      images?.length > 0 &&
                      images.map((image) => (
                        <SwiperSlide>
                          <div className="flex w-full items-center justify-center">
                            <Image
                              alt="Woman listing to music"
                              className="m-auto max-h-screen w-full object-contain md:m-2"
                              radius="none"
                              src={image.url}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </motion.div>

              {isDesktop && (
                <AnimatePresence>
                  {showSideContent && <SideContent post={post} />}
                </AnimatePresence>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalViewPost;
