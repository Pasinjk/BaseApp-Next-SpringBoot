"use client";
import React from "react";
import {
  Input,
  Form,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  PressEvent,
} from "@heroui/react";
import { useState } from "react";
import Toast from "../toast";

interface ForgetPassModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function ForgetPassModal({
  isOpen,
  onOpenChange,
}: ForgetPassModalProps) {
  const [forget, setForget] = useState({ email: "", username: "", detail: "" });
  // const [forgetError, setForgetError] = useState({ email: "", username: "" });
  const [forgetError, setForgetError] = useState<{
    email?: string;
    username?: string;
  }>({});
  // TODO input validation blank
  const onSubmit = (e: PressEvent) => {
    console.log("--------");
  };

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-2xl font-bold">
              Forget Password
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4 px-4">
                <Input
                  label="Username"
                  size="sm"
                  onValueChange={(e) => {
                    // setForget({ ...forget, username: e.valueOf() });
                  }}
                  isRequired
                  type="text"
                  errorMessage="Username is required"
                />
                <Input
                  label="Email"
                  size="sm"
                  onValueChange={(e) => {
                    // setForget({ ...forget, email: e.valueOf() });
                  }}
                  isRequired
                  type="email"
                  errorMessage="Email is required"
                />
                <Textarea
                  label="Detail"
                  disableAutosize
                  disableAnimation
                  labelPlacement="inside"
                  placeholder="Please enter your problem"
                  onValueChange={(e) => {
                    // setForget({ ...forget, detail: e.valueOf() });
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onSubmit}>
                Send
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
