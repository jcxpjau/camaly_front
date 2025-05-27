import type { InputStatus } from "./inputTypes";

interface InputFieldProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  status?: InputStatus;
}

export function InputContent({
  placeholder,
  type,
  value,
  onChange,
  status,
}: InputFieldProps) {
  const textColor = {
    error: "text-red-300 placeholder-red-300",
    success: "text-green-400 placeholder-green-400",
    warning: "text-yellow-400 placeholder-yellow-400",
    info: "text-blue-400 placeholder-blue-400",
    undefined: "text-white placeholder-white/60",
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-transparent focus:outline-none w-full ${textColor[status ?? "undefined"]}`}
    />
  );
}
