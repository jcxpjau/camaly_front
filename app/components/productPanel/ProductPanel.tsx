// import libraries
import { useState, Children, useMemo, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
//import icons
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  children: React.ReactNode;
  itemsPerPage?: number;
}

const slideVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
  }),
};

const ProductPanel = ({ children, itemsPerPage = 4 }: Props): JSX.Element=> {
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1);

  const allChildren = useMemo(() => Children.toArray(children), [children]);

  const pageCount = Math.ceil(allChildren.length / itemsPerPage);

  const currentItems = allChildren.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      setDirection(page > currentPage ? 1 : -1);
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentPage}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={direction}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full"
        >
          {currentItems}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-5">
        <div className="flex gap-2">
          <button
            style={{
              backgroundColor: "var(--color-bg-alt)",
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
            }}
            className="text-sm px-3 py-1.5 rounded-lg hover:brightness-110 transition"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft color="var(--color-text)"/>
          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              style={{
                backgroundColor:
                  currentPage === i + 1
                    ? "var(--color-accent)"
                    : "var(--color-bg-alt)",
                color: currentPage === i + 1 ? "#fff" : "var(--color-text)",
                border: "1px solid var(--color-border)",
              }}
              className="text-sm px-3 py-1.5 rounded-lg hover:brightness-110 transition"
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            style={{
              backgroundColor: "var(--color-bg-alt)",
              border: "1px solid var(--color-border)",
            }}
            className="text-sm px-3 py-1.5 rounded-lg hover:brightness-110 transition"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            <ChevronRight color="var(--color-text)"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPanel