// import libraries
import type { JSX } from "react";

// define props
type ProductCardImageProps = {
  provider: "google" | "meta" | "microsoft" | "other";
  active: boolean;
};

// component
const ProductCardImage = ({ provider, active }: ProductCardImageProps): JSX.Element => {
  const image = {
    google: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop",
    meta: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    microsoft: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    other: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=400&h=300&fit=crop",
  }[provider];

  const statusStyle = active
    ? "bg-green-500/20 text-green-400 border-green-500/30"
    : "bg-red-500/20 text-red-400 border-red-500/30";

  return (
    <div className="relative">
      <img
        src={image}
        alt={provider}
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

// export
export default ProductCardImage;
