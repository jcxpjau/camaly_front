// import libraries
import type { ReactNode, JSX } from "react";
import { motion } from "framer-motion";
// import styling
import "./ProductCard.css";
type RootProps = {
  children: ReactNode;
};

const Root = ({ children }: RootProps): JSX.Element=> {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fluxCard rounded-2xl p-6 shadow-xl flex flex-col justify-start place transition h-[300px] overflow-y-hidden"
      style={{
        backgroundColor: "var(--color-bg-alt)",
        color: "var(--color-text)",
        border: "1px solid var(--color-border)",
      }}
    >
      {children}
    </motion.div>
  );
}

export default Root