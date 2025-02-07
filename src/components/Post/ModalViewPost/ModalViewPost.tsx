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

const images = [
  "https://pbs.twimg.com/media/Gi8x2PaW8AAidOF?format=jpg&name=large",
  "https://pbs.twimg.com/media/Gi2Cu4daAAAbMoC?format=jpg&name=medium",
  "https://pbs.twimg.com/media/Gi2CE3RWcAAnlTZ?format=jpg&name=900x900",
];

interface ModalViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalViewPost = ({ isOpen, onClose }: ModalViewProps) => {
  const [showSideContent, setShowSideContent] = useState(true);

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
                <div className="absolute top-0 z-10 flex w-full items-center justify-between p-8 py-8">
                  <Button
                    className="bg-transparent"
                    onPress={onClose}
                    isIconOnly
                    radius="full"
                  >
                    <Close color="white" />
                  </Button>
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
                </div>
                <div className="w-[calc(100vw-25rem)]">
                  {/* image slider or video slider */}

                  <Swiper spaceBetween={50}>
                    {images.map((image) => {
                      return (
                        <SwiperSlide>
                          <div className="flex w-full items-center justify-center">
                            <Image
                              alt="Woman listing to music"
                              className="m-2 max-h-screen w-full object-contain"
                              radius="none"
                              src={image}
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </motion.div>
              <AnimatePresence>
                {showSideContent && <SideContent />}
              </AnimatePresence>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalViewPost;
