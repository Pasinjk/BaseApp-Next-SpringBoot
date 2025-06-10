"use client";
import React from "react";
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
} from "@heroui/react";
import { useState, useCallback } from "react";
import Toast from "../toast";
import axiosInstance from "@/utils/axios";
import { z, ZodError } from "zod";
import { forgetPasswordSchema } from "@/validation/loginPage";

interface ForgetPassModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function ForgetPassModal({
  isOpen,
  onOpenChange,
}: ForgetPassModalProps) {
  type ForgetData = z.infer<typeof forgetPasswordSchema>;
  const [forgetData, setForgetData] = useState<ForgetData>({
    email: "",
    username: "",
    detail: "",
  });

  const clearForgetData = useCallback(() => {
    setForgetData({ email: "", username: "", detail: "" });
    setValidationError(null);
  }, []);

  type FieldErrors = {
    [K in keyof ForgetData]?: string[];
  };

  const [validationError, setValidationError] = useState<FieldErrors | null>(
    null
  );

  const fetchForgetPassword = async (forgetData: Object) => {
    const response = await axiosInstance.post(
      "/auth/forgetPassword",
      forgetData
    );
    return response.data;
  };

  const validationCheck = (forgetData: object) => {
    try {
      forgetPasswordSchema.parse(forgetData);
      setValidationError(null);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationError(error.flatten().fieldErrors);
      }
      return false;
    }
  };

  const onSubmit = async () => {
    if (validationCheck(forgetData)) {
      await fetchForgetPassword(forgetData);
      Toast.success("Your request was sent to admin.", "Success");
      setForgetData({ email: "", username: "", detail: "" });
    }
  };

  const handleClose = useCallback(() => {
    clearForgetData();
    onOpenChange();
  }, [clearForgetData, onOpenChange]);

  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      onOpenChange={handleClose}
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
                  onValueChange={(value) => {
                    setForgetData({ ...forgetData, username: value });
                  }}
                  isRequired
                  type="text"
                  errorMessage={validationError?.username?.[0]}
                  isInvalid={!!validationError?.username}
                />
                <Input
                  label="Email"
                  size="sm"
                  onValueChange={(value) => {
                    setForgetData({ ...forgetData, email: value });
                  }}
                  isRequired
                  type="email"
                  errorMessage={validationError?.email?.[0]}
                  isInvalid={!!validationError?.email}
                />
                <Textarea
                  label="Detail"
                  disableAutosize
                  disableAnimation
                  labelPlacement="inside"
                  placeholder="Please enter your problem"
                  onValueChange={(value) => {
                    setForgetData({ ...forgetData, detail: value });
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
