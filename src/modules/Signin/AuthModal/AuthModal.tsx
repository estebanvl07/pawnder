import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
  Tab,
  Tabs,
} from "@heroui/react";
import React from "react";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";

interface ModProps extends Omit<ModalProps, "children"> {}

const AuthModal = ({ ...props }: ModProps) => {
  return (
    <Modal size="lg" {...props}>
      <ModalContent className="font-montserrat">
        {(onClose) => (
          <>
            <ModalHeader>
              <h2 className="text-xl font-semibold -tracking-wide">Pawnder</h2>
            </ModalHeader>
            {/* <ModalBody className="flex flex-col items-center justify-center -tracking-wide"> */}
            {/* <SignInWithGoogle /> */}
            <div className="w-full">
              <Tabs
                classNames={
                  {
                    // base: "w-full",
                    // tabList: "w-full",
                    // tabContent: "w-full border",
                  }
                }
              >
                <Tab title="Iniciar sesión" className="w-full">
                  {/* <LoginForm /> */}
                </Tab>
                <Tab title="Registrarme" className="w-full">
                  {/* <SignUpForm /> */}
                </Tab>
              </Tabs>
            </div>
            {/* </ModalBody> */}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
