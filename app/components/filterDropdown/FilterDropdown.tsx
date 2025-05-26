// import libraries
import { useState } from 'react';
import type { JSX } from 'react';
// import icons
import { Filter } from 'lucide-react';

type FilterOption = 'All' | 'Under $20' | '$20 - $40' | 'Over $40';

const options: FilterOption[] = ['All', 'Under $20', '$20 - $40', 'Over $40'];

const FilterDropdown = (): JSX.Element => {
  const [selected, setSelected] = useState<FilterOption>('All');
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-[var(--color-accent)] text-white px-3 py-2 rounded-xl text-sm hover:brightness-110 transition"
      >
        <Filter className="w-4 h-4" /> Filter
      </button>

      {open && (
        <div
          className="absolute z-10 mt-2 w-48 rounded-lg shadow-lg text-sm"
          style={{
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
          }}
        >
          {options.map((option: FilterOption) => (
            <div
              key={option}
              onClick={() => {
                setSelected(option);
              }}
              style={{
                backgroundColor: selected === option ? '#bcacfc' : 'transparent',
                fontWeight: selected === option ? 600 : 400,
                color: selected == option? 'black':'var(--color-text)'
              }}
              className="cursor-pointer px-4 py-2 hover:bg-[var(--color-bg-alt)] transition"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;