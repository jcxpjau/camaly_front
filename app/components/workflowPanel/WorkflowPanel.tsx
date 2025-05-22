import { useState, useMemo } from 'react';
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

export default function WorkflowPanel({ workflows, searchTerm }: Props) {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

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
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 min-h-1">
        {currentWorkflows.map((workflow, idx) => (
          <WorkflowCard
            key={idx}
            title={workflow.title}
            description={workflow.description}
            icon={workflow.icon}
            price={workflow.price}
          />
        ))}
      </div>

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
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
