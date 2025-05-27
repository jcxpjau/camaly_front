import type { InputStatus } from "./inputTypes";

interface InputNotifyProps {
  message: string;
  status?: InputStatus;
}

export function InputNotify({ message, status }: InputNotifyProps) {
  const textColor = {
    error: "text-red-300",
    success: "text-green-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
    undefined: "text-white",
  };

  return (
    <span className={`text-sm ${textColor[status ?? "undefined"]}`}>
      {message}
    </span>
  );
}
