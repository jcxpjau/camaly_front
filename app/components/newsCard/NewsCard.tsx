import './NewsCard.css';
import { CircleArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
}

const NewsCard = ({ title, description, image }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="card rounded-lg overflow-hidden h-72 relative"
    >
      <div className="p-6 opacity-75">
        <h3 className="text-2xl font-normal text-center mb-2 text-[var(--color-text)]">
          {title}
        </h3>
        <p className="font-light text-xs text-center text-[var(--color-text)]">
          {description}
        </p>
      </div>
      <div className="flex justify-center p-4">
        <img src={image} alt={title} className="w-full max-w-[200px]" />
      </div>
      <div className="absolute right-3 bottom-1">
        <motion.button
          whileHover={{ x: 6 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="rounded-full"
        >
          <CircleArrowRight size={32} color="white" strokeWidth={0.75} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NewsCard;
