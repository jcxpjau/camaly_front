// import libraries
import { motion } from "framer-motion";
import type { JSX } from "react";
// import icons
import { CircleArrowRight } from "lucide-react";

type MoreInfoButtonProps = {
  onClick?: () => void;
};

const MoreInfoButton = ({ onClick }: MoreInfoButtonProps): JSX.Element=> {
  return (
    <motion.button
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="rounded-full flex justify-end w-full hover:cursor-pointer"
      onClick={onClick}
    >
      <CircleArrowRight size={32} color="var(--color-text)" strokeWidth={0.75} />
    </motion.button>
  );
}

export default MoreInfoButton