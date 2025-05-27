import type { ReactNode } from "react";
import { InputNotify } from "./InputNotify";
import type { InputStatus } from "./inputTypes";

interface InputFieldRootProps {
  children: ReactNode;
  status?: InputStatus;
  message?: string;
}

export function InputRoot({ children, status, message }: InputFieldRootProps) {
  const borderColor = {
    error: "border-red-400",
    success: "border-green-500",
    warning: "border-yellow-500",
    info: "border-blue-500",
    undefined: "border-transparent",
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className={`flex items-center gap-3 bg-[var(--color-bg-input)] rounded-md px-4 py-2 border ${borderColor[status ?? "undefined"]}`}>
        {children}
      </div>

      {status && message && (
        <InputNotify message={message} status={status} />
      )}
    </div>
  );
}
