import { addToast } from "@heroui/react";

type ToastColor =
  | "success"
  | "warning"
  | "danger"
  | "default"
  | "primary"
  | "secondary"
  | "foreground";

const Toast = {
  success: (description: string, title = "Success") =>
    addToast({ title, description, color: "success" }),

  warning: (description: string, title = "Warning") =>
    addToast({ title, description, color: "warning" }),

  danger: (description: string, title = "Error") =>
    addToast({ title, description, color: "danger" }),

  info: (description: string, title = "Info") =>
    addToast({ title, description, color: "default" }),

  custom: (color: ToastColor, description: string, title = "") =>
    addToast({ title, description, color }),
};

export default Toast;
