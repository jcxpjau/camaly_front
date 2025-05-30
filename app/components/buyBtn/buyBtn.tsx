//import libraries
import type { JSX } from "react";
//import icons
import { ShoppingCart } from "lucide-react";
//others
import api from "~/services/api";
import { useAuth } from "~/context/auth/auth.hooks";

type BuyBtnProps = {
  accentColor: string;
  hoverColor: string;
  productId: string;
};

const BuyBtn = ({
  accentColor,
  hoverColor,
  productId,
}: BuyBtnProps): JSX.Element => {
  const { user, token } = useAuth();
  const handleClick = async () => {
    try {
      await api.post(
        `purchases`,
        {
          userId: user._id,
          productId: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Erro ao fazer a compra:", error);
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
