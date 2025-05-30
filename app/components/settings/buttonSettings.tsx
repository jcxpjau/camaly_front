import type { ElementType } from "react";

interface ButtonSettingsProps {
  text: string;
  icon?: ElementType;
  type?: "button" | "submit" | "reset";
}

export default function ButtonSettings({ text, icon: Icon, type = "button" }: ButtonSettingsProps) {
  return (
    <button
      type={type}
      className="
        inline-flex items-center gap-2
        rounded-md
        px-3 py-2
        text-white
        text-sm
        hover:brightness-110
        focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]
        bg-[var(--color-accent)]
        sm:px-6 sm:py-3 sm:text-base
      "
    >
      {Icon && <Icon className="h-4 w-4 sm:h-5 sm:w-5" />}
      {text}
    </button>
  );
}
