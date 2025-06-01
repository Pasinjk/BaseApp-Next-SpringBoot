"use client";
// TODO forget password button and modal
// TODO Middleware redirect to login page if not logged in
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
  useDisclosure,
  Textarea,
  PressEvent,
} from "@heroui/react";
import axiosInstance from "@/utils/axios";
import { LoadingOverlay } from "@/components/loadingOverlay";
import { useLoading } from "@/hooks/useLoading";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { userStore } from "@/stores/user.store";
import Toast from "@/components/toast";

export default function LoginPage() {
  const setUser = userStore((state) => state.setUser);
  const router = useRouter();
  const { loading, withLoading } = useLoading();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [forget, setForget] = useState({ email: "", username: "", detail: "" });

  const fetchUser = async (formData: Object) => {
    const response = await axiosInstance.post("/auth/login", formData);
    setUser(response.data);
    return response.data;
  };

  const fetchForgetPassword = async (forget: Object) => {
    const response = await axiosInstance.post("/auth/forgetPassword", forget);
    return response.data;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    withLoading(async () => {
      try {
        await fetchUser(formData);
        router.push("/");
        Toast("success", "Login success", "Welcome!");
      } catch (error) {
        Toast("danger", "Login Failed", "Username or password is incorrect.");
        console.log("error", error);
      }
    });
  };

  const sentForgetPassword = async (e: PressEvent, onClose: () => void) => {
    // TODO input validation blank
    console.log(forget);

    try {
      await fetchForgetPassword(forget);
      Toast("success", "Success", "Give us some time to check your request");
      setForget({ email: "", username: "", detail: "" });
      onClose();
    } catch (error) {
      Toast("danger", "Failed", "Please check your input");
    }
  };

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
        </div>{" "}
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
                {" "}
                <ModalHeader className="flex flex-col gap-1 text-2xl font-bold">
                  Forget Password
                </ModalHeader>
                <ModalBody>
                  <div className="flex flex-col gap-4 px-4">
                    <Input
                      label="Username"
                      size="sm"
                      onChange={(e) => {
                        setForget({ ...forget, username: e.target.value });
                      }}
                    />
                    <Input
                      label="Email"
                      size="sm"
                      onChange={(e) => {
                        setForget({ ...forget, email: e.target.value });
                      }}
                    />
                    <Textarea
                      label="Detail"
                      disableAutosize
                      disableAnimation
                      labelPlacement="inside"
                      placeholder="Please enter your problem"
                      onChange={(e) => {
                        setForget({ ...forget, detail: e.target.value });
                      }}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={(e) => sentForgetPassword(e, onClose)}
                  >
                    Send
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Form>
    </div>
  );
}
