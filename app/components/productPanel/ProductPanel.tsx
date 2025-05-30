// import libraries
import { useState, Children, useMemo, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
//import icons
import { ChevronLeft, ChevronRight } from "lucide-react";

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

interface Props {
  children: React.ReactNode;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  paginate?: boolean;
  pageCount?: number;
  loading?: boolean;
}

const ProductPanel = ({
  children,
  itemsPerPage,
  currentPage,
  onPageChange,
  paginate = true,
  pageCount,
  loading,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const [direction, setDirection] = useState(1);
  const allChildren = useMemo(() => Children.toArray(children), [children]);
  const totalPages = paginate
    ? pageCount ?? Math.ceil(allChildren.length / itemsPerPage)
    : 1;

  const currentItems =
    paginate && pageCount === undefined
      ? allChildren.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : allChildren;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setDirection(page > currentPage ? 1 : -1);
      onPageChange(page);
    }
  };

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[var(--color-muted)]">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
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

      {paginate && totalPages > 1 && (
        <div className="flex justify-center mt-5">
          <div className="flex gap-2">
            <button
              className="text-sm px-3 py-1.5 rounded-lg hover:brightness-110 transition hover:cursor-pointer"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                style={{
                  backgroundColor:
                    currentPage === i + 1
                      ? "var(--color-accent)"
                      : "var(--color-bg-alt)",
                  color: currentPage === i + 1 ? "#fff" : "var(--color-text)",
                  border: "1px solid var(--color-border) ",
                }}
                className="text-sm px-3 py-1.5 rounded-lg hover:brightness-110 transition hover:cursor-pointer"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="text-sm px-3 py-1.5 rounded-lg hover:brightness-110 transition hover:cursor-pointer"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPanel;
