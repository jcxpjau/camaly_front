//import libraries
import type {JSX } from "react";

type ProductImageProps = {
  image: string;
  title: string;
};

const ProductImage = ({ image, title }: ProductImageProps):JSX.Element => {
  return (
    <div className="flex justify-center p-4">
      <img src={image} alt={title} className="w-full max-w-[180px]" />
    </div>
  );
};

export default ProductImage;
