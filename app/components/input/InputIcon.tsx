// inputIcon.tsx
import type { ElementType } from "react";
import type { InputStatus } from "./inputTypes";

interface InputFieldIconProps {
  icon: ElementType;
  status?: InputStatus;
}

export function InputIcon({ icon: Icon, status }: InputFieldIconProps) {
  const color = {
    error: "text-red-500",
    success: "text-green-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
    undefined: "text-white",
  };

  return <Icon className={`w-5 h-5 ${color[status ?? "undefined"]}`} />;
}
