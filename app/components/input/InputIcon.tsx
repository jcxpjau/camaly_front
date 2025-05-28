import type { ElementType } from "react";
import type { InputStatus } from "./inputTypes";

interface InputFieldIconProps {
  icon: ElementType;
  status?: InputStatus;
}

export function InputIcon({ icon: Icon, status }: InputFieldIconProps) {
  const colors = {
    error: "var(--color-icon-error)",
    success: "var(--color-icon-success)",
    warning: "var(--color-icon-warning)",
    info: "var(--color-icon-info)",
    undefined: "var(--color-icon-default)",
  };

  const color = colors[status ?? "undefined"];

  return <Icon className="w-5 h-5" style={{ color }} />;
}