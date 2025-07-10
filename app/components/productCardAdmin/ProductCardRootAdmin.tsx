import type { ReactNode, JSX } from "react";
import { motion } from "framer-motion";

interface ProductCardRootProps {
  children: ReactNode;
}

const ProductRoot = ({ children }: ProductCardRootProps): JSX.Element => {
  return (
    <motion.div
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
  className="group rounded-2xl p-6 shadow-xl flex flex-col justify-start place transition overflow-y-auto min-h-[300px]"
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

export default ProductRoot;