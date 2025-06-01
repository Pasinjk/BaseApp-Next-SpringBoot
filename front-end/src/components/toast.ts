import { addToast } from "@heroui/react";

export default function Toast(
  color:
    | "success"
    | "warning"
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "foreground",
  title: string,
  description: string
) {
  addToast({
    title: title,
    description: description,
    color: color,
  });
}
