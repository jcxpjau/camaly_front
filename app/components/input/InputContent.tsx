import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { InputStatus } from "./inputTypes";

interface InputFieldProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  status?: InputStatus;
  typeLogin?: boolean; // para tema escuro
}

export function InputContent({
  placeholder,
  type,
  value,
  onChange,
  status,
  typeLogin,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const textColors = {
    error: "var(--color-text-error)",
    success: "var(--color-text-success)",
    warning: "var(--color-text-warning)",
    info: "var(--color-text-info)",
    undefined: typeLogin ? "#ffffff" : "var(--color-text-default)",
  };

  //Se tem status e ele for diferente de indefinido usa a cor do status se não pega a indefinida
  const textColor = status && status !== undefined ? textColors[status] : textColors.undefined;

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
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-0 pr-1 text-[var(--color-card-subtext)] hover:text-[var(--color-card-text)] transition"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
}
