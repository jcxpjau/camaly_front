import type { JSX } from "react";

type ProductCardImageProps = {
  active: boolean;
  imageUrl?: string;
};

const DEFAULT_IMAGE = "https://avent7.com/images/logo.png";

const ProductCardImage = ({
  active,
  imageUrl,
}: ProductCardImageProps): JSX.Element => {
  const image = imageUrl?.trim() ? imageUrl : DEFAULT_IMAGE;

  const statusStyle = active
    ? "bg-green-500/20 text-green-400 border-green-500/30"
    : "bg-red-500/20 text-red-400 border-red-500/30";

  return (
    <div className="relative">
      <img
        src={image}
        className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
      />
      <div className="absolute top-3 right-3">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusStyle}`}
        >
          ● {active ? "Ativo" : "Inativo"}
        </span>
      </div>
    </div>
  );
};

export default ProductCardImage;
