import React from 'react';
import './ProductCard.css';
import { CircleArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
}

const ProductCard = ({ title, description, image }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, ease: "easeInOut"  }}
      className="card rounded-lg overflow-hidden h-72 relative"
    >
      <div className="p-6 opacity-75">
        <h3 className="text-white text-2xl font-normal text-center mb-2">{title}</h3>
        <p className="text-white font-light text-xs text-left">{description}</p>
      </div>
      <div className="flex justify-center p-4">
        {/* <img src={image} alt={title} className="w-full max-w-[200px]" /> */}
      </div>
      <div className="absolute right-6 bottom-1">
        <motion.button
          whileHover={{ x: 6 }} // move 6px para a direita
          transition={{ type: 'spring', stiffness: 300 }}
          className="rounded-full"
        >
          <CircleArrowRight size={32} color="#fefefe" strokeWidth={0.75} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
