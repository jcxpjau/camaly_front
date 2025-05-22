import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WorkflowCard from '../workflowCards/WorkflowCards';

interface Workflow {
  title: string;
  description: string;
  icon: React.ReactElement;
  price: string;
}

interface Props {
  workflows: Workflow[];
  searchTerm: string;
}

// Define variants for the horizontal fade animation
const slideVariants = {
  initial: (direction: number) => ({ // Add 'direction' to control slide direction
    opacity: 0,
    x: direction > 0 ? 50 : -50, // Slide in from right (50) or left (-50)
  }),
  animate: {
    opacity: 1,
    x: 0, // End at original position
  },
  exit: (direction: number) => ({ // Add 'direction' to control slide direction
    opacity: 0,
    x: direction > 0 ? -50 : 50, // Slide out to left (-50) or right (50)
  }),
};

export default function WorkflowPanel({ workflows, searchTerm }: Props) {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for previous

  const filteredWorkflows = useMemo(() => {
    return workflows.filter(wf =>
      wf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wf.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, workflows]);

  const pageCount = Math.ceil(filteredWorkflows.length / itemsPerPage);

  const currentWorkflows = filteredWorkflows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      // Determine direction for animation
      setDirection(page > currentPage ? 1 : -1);
      setCurrentPage(page);
    }
  };

  return (
    // Adicione overflow-x-hidden no contêiner pai
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
          className="grid grid-cols-1 md:grid-cols- lg:grid-cols-4 gap-5 min-h-1"
        >
          {currentWorkflows.map((workflow, idx) => (
            <WorkflowCard
              key={idx}
              title={workflow.title}
              description={workflow.description}
              icon={workflow.icon}
              price={workflow.price}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-5">
        <div className="flex gap-2">
          <button
            style={{
              backgroundColor: 'var(--color-bg-alt)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
            }}
            className="text-sm px-3 py-1.5 rounded-lg hover:brightness-110 transition"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              style={{
                backgroundColor:
                  currentPage === i + 1 ? 'var(--color-accent)' : 'var(--color-bg-alt)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
              }}
              className="text-sm px-3 py-1.5 rounded-lg hover:brightness-110 transition"
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            style={{
              backgroundColor: 'var(--color-bg-alt)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-border)',
            }}
            className="text-sm px-3 py-1.5 rounded-lg hover:brightness-110 transition"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}