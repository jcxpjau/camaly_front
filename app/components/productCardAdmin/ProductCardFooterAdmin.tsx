import type { JSX } from "react";
import { Settings } from "lucide-react";

type ProductCardFooterProps = {
  price: number;
  onEdit?: () => void;
};

const ProductCardFooter = ({ price, onEdit }: ProductCardFooterProps): JSX.Element => {
  return (
    <div className="flex items-center justify-between pt-3 border-t border-border">
      <div className="text-lg font-bold text-primary">$ {price.toFixed(2)}</div>
      <button className="flex items-center px-3 py-1.5 text-sm border border-border rounded-md hover:bg-primary hover:text-primary-foreground transition"
      onClick={onEdit}>
        <Settings className="w-4 h-4 mr-1" />
        Editar
      </button>
    </div>
  );
};

export default ProductCardFooter;
