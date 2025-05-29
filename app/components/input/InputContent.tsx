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

  const textColors = {
    error: "var(--color-text-error)",
    success: "var(--color-text-success)",
    warning: "var(--color-text-warning)",
    info: "var(--color-text-info)",
    undefined: "var(--color-text-default)",
  };


  const textColor = textColors[status ?? "undefined"];//Se o text color vier na chamada do componente ele atribui, caso contrário será undefined

  return (
    <div className="relative w-full flex items-center">
      <input
        type={isPassword && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          color: textColor,
          caretColor: textColor,
          backgroundColor: "transparent",
          paddingRight: "2rem",
        }}
        className="focus:outline-none w-full"
      />
      {isPassword && (//Somente se for do tipo password irá mostrar o olho
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-0 pr-1 text-[var(--color-card-subtext)] hover:text-[var(--color-card-text)] transition"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
}