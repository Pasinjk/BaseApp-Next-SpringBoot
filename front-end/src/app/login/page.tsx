"use client";
// TODO Middleware redirect to login page if not logged in
import React from "react";
import { Input, Form, Button, useDisclosure, PressEvent } from "@heroui/react";
import axiosInstance from "@/utils/axios";
import { LoadingOverlay } from "@/components/loadingOverlay";
import { useLoading } from "@/hooks/useLoading";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

import { userStore } from "@/stores/user.store";
import Toast from "@/components/toast";
import ForgetPassModal from "@/components/Modal/ForgetPass";

export default function LoginPage() {
  const setUser = userStore((state) => state.setUser);
  const router = useRouter();
  const { loading, withLoading } = useLoading();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchUser = async (formData: Object) => {
    const response = await axiosInstance.post("/auth/login", formData);
    setUser(response.data);
    return response.data;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    withLoading(async () => {
      try {
        await fetchUser(formData);
        router.push("/");
        Toast.success("Welcome!", "Login success");
      } catch (error) {
        Toast.danger("Username or password is incorrect.", "Login Failed");
        console.log("error", error);
      }
    });
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
      </Form>
      <ForgetPassModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
