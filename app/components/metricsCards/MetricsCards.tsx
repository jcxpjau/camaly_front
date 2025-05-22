import { motion } from 'framer-motion';

interface MetricsCardProps {
  title: string;
  description: string;
}

const MetricsCard = ({ title, description }: MetricsCardProps) => {
  return (
     <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, ease: "easeInOut"  }}
      className="bg-[#353535] place-self-center w-2xs rounded-lg p-3 transition-all hover:bg-purple-600"
    >
      <div className="flex flex-col text-white tracking-wide">
        <h3 className="text-lg font-semibold">
            {title}
            
        </h3>
        <p className="text-sm font-light mt-2">{description}</p>
      </div>
    </motion.div>
  );
};

export default MetricsCard;