import type { ReactNode } from "react";
import { InputNotify } from "./InputNotify";
import type { InputStatus } from "./inputTypes";

interface InputFieldRootProps {
  children: ReactNode;
  status?: InputStatus;
  message?: string;
  label?: string;
}

export function InputRoot({ children, status, message, label }: InputFieldRootProps) {
  const borderColors = {
    error: "var(--color-error)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    info: "var(--color-info)",
    undefined: "var(--color-border-input)",
  };
  const borderColor = borderColors[status ?? "undefined"];

  const labelColor = "var(--color-label-text)";

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label 
          className="text-sm pl-1" 
          style={{ color: labelColor }}
        >
          {label}
        </label>
      )}
      <div
        className="flex items-center gap-3 bg-[var(--color-bg-input)] rounded-md px-4 py-3 border"
        style={{ borderColor }}
      >
        {children}
      </div>

      {status && message && (
        <InputNotify message={message} status={status} />
      )}
    </div>
  );
}
