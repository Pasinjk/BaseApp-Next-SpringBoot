"use client";
// TODO forget password button and modal

import React from "react";
import {
  Input,
  Form,
  Button,
  addToast,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
} from "@heroui/react";
import axiosInstance from "@/utils/axios";
import { LoadingOverlay } from "@/components/loadingOverlay";
import { useLoading } from "@/hooks/useLoading";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const { loading, withLoading } = useLoading();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchUser = async (formData: Object) => {
    const response = await axiosInstance.post("/auth/login", formData);
    return response.data;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));

    withLoading(async () => {
      try {
        await fetchUser(formData);
        router.push("/");
        addToast({
          title: "Login success",
          color: "success",
          description: "Welcome!",
        });
      } catch (error) {
        addToast({
          title: "Login Failed",
          color: "danger",
          description: "Username or password is incorrect.",
        });
        console.log("error", error);
      }
    });
  };

  const sentForgetPassword = async () => {};

  return (
    <div className="flex items-center justify-center h-dvh relative">
      <LoadingOverlay loading={loading} />
      <Form
        className={`shadow-md rounded-xl px-12 py-10 flex flex-col gap-4 w-1/5 ${
          loading ? "opacity-50" : ""
        }`}
        onSubmit={onSubmit}
      >
        <p className="text-2xl font-bold">Welcome to Login</p>
        <div className="flex items-baseline gap-2 w-full">
          <FaUser />
          <Input
            className="w-full"
            isRequired
            label="Username"
            type="text"
            size="md"
            name="username"
            errorMessage="Username is required"
          />
        </div>
        <div className="w-full">
          <div className="flex items-baseline gap-2">
            <FaLock />
            <Input
              className="w-full"
              isRequired
              label="Password"
              type="password"
              size="md"
              name="password"
              errorMessage="Password is required"
            />
          </div>
          <div className="flex justify-end pt-1">
            <p
              onClick={onOpen}
              className="text-xs text-blue-600 hover:underline cursor-pointer"
            >
              Forget password
            </p>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <Button
            size="md"
            variant="solid"
            color="primary"
            type="submit"
            disabled={loading}
          >
            Submit
          </Button>
        </div>
      </Form>
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
                  <Input label="Username" size="md" />
                  <Input label="Email" size="md" />
                  <Textarea
                    label="Detail"
                    disableAutosize
                    disableAnimation
                    labelPlacement="inside"
                    placeholder="Please enter your problem"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  onSubmit={sentForgetPassword}
                >
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
