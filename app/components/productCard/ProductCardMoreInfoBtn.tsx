// import libraries
import { motion } from "framer-motion";
import type { JSX } from "react";
// import icons
import { CircleArrowRight } from "lucide-react";

const MoreInfoButton = (): JSX.Element=> {
  return (
    <motion.button
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="rounded-full flex justify-end w-full"
    >
      <CircleArrowRight size={32} color="var(--color-text)" strokeWidth={0.75} />
    </motion.button>
  );
}

export default MoreInfoButton