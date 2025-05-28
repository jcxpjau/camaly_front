import type { ElementType } from "react";

interface ButtonSettingsProps {
  text: string;
  icon?: ElementType;
}

export default function ButtonSettings({text, icon: Icon} : ButtonSettingsProps){
    return(
    <button
    type="button"
    className="inline-flex items-center gap-2 rounded-md px-4 py-3 text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
    style={{ backgroundColor: "var(--color-accent)" }}
    >
    {Icon && (
        <Icon className="h-4 w-4" />
    )}
    {text}
    </button>
)
}