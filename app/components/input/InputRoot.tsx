import type { ReactNode } from "react";
import { InputNotify } from "./InputNotify";
import type { InputStatus } from "./inputTypes";

interface InputFieldRootProps {
  children: ReactNode;
  status?: InputStatus;
  message?: string;
  label?: string;
  typeLogin?: boolean;
}

export function InputRoot({ children, status, message, label, typeLogin }: InputFieldRootProps) {
  const borderColors = {
    error: "var(--color-error)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    info: "var(--color-info)",
    undefined: "var(--color-border-input)",
  };

  // Se tem status e ele não for indefinido, usa a cor dele
  // Se não tem status e se for typeLogin, usar cor do tema escuro forçando
  const borderColor = status && status !== undefined
    ? borderColors[status]
    : typeLogin
    ? "transparent" // tema escuro
    : borderColors.undefined;

  const labelColor = "var(--color-label-text)";
  const backgroundColor = typeLogin ? "rgba(0,0,0,0.25)" : "var(--color-bg-input)";

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm pl-1" style={{ color: labelColor }}>
          {label}
        </label>
      )}
      <div
        className="flex items-center gap-3 rounded-md px-4 py-3 border"
        style={{ borderColor, backgroundColor }}
      >
        {children}
      </div>

      {status && message && (
        <InputNotify message={message} status={status} typeLogin={typeLogin} />
      )}
    </div>
  );
}
