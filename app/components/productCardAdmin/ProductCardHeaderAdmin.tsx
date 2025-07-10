// import libraries
import type { JSX } from "react";
import { Edit } from "lucide-react";

type ProductCardHeaderProps = {
  name: string;
  category: string;
};

const ProductCardHeader = ({ name, category }: ProductCardHeaderProps): JSX.Element => {
  return (
    <div className="flex items-start justify-between">
      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
        {name}
      </h3>
      <span
        className="
          inline-flex items-center
          rounded-full
          border border-transparent
          px-3 py-0.5
          text-xs font-semibold
          transition-colors
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
          bg-[hsl(210,10%,18%)]
          text-[hsl(210,40%,98%)]
          hover:bg-[hsl(210,10%,23%)]
        "
      >
        {category.toUpperCase()}
      </span>
    </div>
  );
};

export default ProductCardHeader;
