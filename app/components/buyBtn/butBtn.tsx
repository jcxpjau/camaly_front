import { ShoppingCart } from "lucide-react";
import type { JSX } from "react";

const BuyBtn = (): JSX.Element => {
  return (
    <button
      className="hover:cursor-pointer flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition bg-[var(--color-accent)] text-white"
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "#977efc";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "var(--color-accent)";
      }}
    >
      <ShoppingCart size={16} />
    </button>
  );
};

export default BuyBtn;
