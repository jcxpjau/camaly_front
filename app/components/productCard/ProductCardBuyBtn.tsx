// import libraries
import type { JSX } from "react";
// import icons
import { ShoppingCart } from "lucide-react";

const BuyButton = (): JSX.Element => {
  return (
    <button
      className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition"
      style={{
        backgroundColor: "var(--color-accent)",
        color: "#fff",
      }}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "#977efc"; 
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-accent)";
      }}
    >
      <ShoppingCart size={16} />
    </button>
  );
};

export default BuyButton;
