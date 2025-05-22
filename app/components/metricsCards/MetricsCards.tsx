import { motion } from 'framer-motion';

interface MetricsCardProps {
  title: string;
  description: string;
}

const MetricsCard = ({ title, description }: MetricsCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="place-self-center w-2xs rounded-lg p-3 transition-all bg-[var(--color-bg-alt)] hover:bg-[#a4b7f4] group"
    >
      <div className="flex flex-col tracking-wide text-[var(--color-text)]">
        <h3 className="text-lg font-semibold">
          {title}
        </h3>
        <p className="text-sm font-light mt-2">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default MetricsCard;
