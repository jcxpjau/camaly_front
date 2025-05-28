import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const textColor = {
    error: "text-red-300 placeholder-red-300",
    success: "text-green-400 placeholder-green-400",
    warning: "text-yellow-400 placeholder-yellow-400",
    info: "text-blue-400 placeholder-blue-400",
    undefined: "text-white placeholder-white/60",
  };

  return (
    <div className="relative w-full flex items-center">
      <input
        type={isPassword && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-transparent focus:outline-none w-full pr-8 ${textColor[status ?? "undefined"]}`}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-0 pr-1 text-[var(--color-card-subtext)] hover:text-[var(--color-card-text)] transition"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
}
