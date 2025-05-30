import { ShoppingCart } from "lucide-react";
import type { JSX } from "react";

type BuyBtnProps = {
  accentColor: string;
  hoverColor: string;
};

const BuyBtn = ({ accentColor, hoverColor }: BuyBtnProps): JSX.Element => {
  return (
    <button
      className="hover:cursor-pointer flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition text-white"
      style={{ backgroundColor: accentColor }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = hoverColor;
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = accentColor;
      }}
    >
      <ShoppingCart size={16} />
    </button>
  );
};

export default BuyBtn;
