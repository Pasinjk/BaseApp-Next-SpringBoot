import React from "react";
import { Spinner } from "@heroui/spinner";

interface LoadingOverlayProps {
  loading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
      <Spinner variant="wave" color="default" size="md" />
    </div>
  );
};
