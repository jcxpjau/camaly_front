import type { InputStatus } from "./inputTypes";

interface InputNotifyProps {
  message: string;
  status?: InputStatus;
}

export function InputNotify({ message, status }: InputNotifyProps) {
  const textColors = {
    error: "var(--color-text-error)",
    success: "var(--color-text-success)",
    warning: "var(--color-text-warning)",
    info: "var(--color-text-info)",
    undefined: "var(--color-text-default)",
  };

  const color = textColors[status ?? "undefined"];

  return (
    <span className="text-sm" style={{ color }}>
      {message}
    </span>
  );
}