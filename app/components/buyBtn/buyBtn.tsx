//import libraries
import type { JSX } from "react";
//import icons
import { ShoppingCart } from "lucide-react";
//others
import api from "~/services/api";

type BuyBtnProps = {
  accentColor: string;
  hoverColor: string;
  productId: string;
  onPurchaseSuccess?: (alreadyInCart: boolean) => void;
};

const BuyBtn = ({
  accentColor,
  hoverColor,
  productId,
  onPurchaseSuccess,
}: BuyBtnProps): JSX.Element => {

  const handleClick = async () => {
    try {
      await api.post("cart", { productId });
      onPurchaseSuccess?.(true);
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data?.message === "Produto já está no carrinho.") {
          onPurchaseSuccess?.(false);
        } else {
          console.error("Erro API:", status, data?.message);
        }
      } else {
        console.error("Erro inesperado:", error);
      }
    }
  };


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
      onClick={handleClick}
    >
      <ShoppingCart size={16} />
    </button>
  );
};

export default BuyBtn;
