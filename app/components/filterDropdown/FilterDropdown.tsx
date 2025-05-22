// src/components/FilterDropdown.tsx
import { useState } from 'react';
import { Filter } from 'lucide-react';

const options = ['All', 'Under $20', '$20 - $40', 'Over $40'];

export default function FilterDropdown() {
  const [selected, setSelected] = useState('All');
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-purple-600 px-3 py-2 rounded-xl text-sm hover:bg-purple-700"
      >
        <Filter className="w-4 h-4" /> Filter
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg text-sm text-gray-800">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                selected === option ? 'bg-gray-200 font-semibold' : ''
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
