import type { JSX } from "react";

type ProductCardDescriptionProps = {
  text: string;
};

const ProductCardDescription = ({ text }: ProductCardDescriptionProps): JSX.Element => {
  return (
    <p
      className="text-sm line-clamp-3"
      style={{ color: "var(--color-card-subtext)" }}
    >
      {text}
    </p>
  );
};

export default ProductCardDescription;
