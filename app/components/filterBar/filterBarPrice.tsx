//import libraries
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
//import icons
import { Filter } from "lucide-react";

type FilterProps = {
  selected: number; 
  onSelect: (value: number) => void; 
  maxRange?: number; 
};

const FilterPrice = ({ selected, onSelect, maxRange = 100 }: FilterProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentMaxValue, setCurrentMaxValue] = useState(selected);

  useEffect(() => {
    setCurrentMaxValue(selected);
  }, [selected]);

 
  const applyCurrentValue = () => {
    onSelect(currentMaxValue);
  };

  return (
    <div className="shrink-0 relative">
      <button
        onClick={() => {
          if (open) {
            applyCurrentValue();
          }
          setOpen(!open);
        }}
        className="flex items-center gap-2 bg-[var(--color-accent)] text-white px-3 py-2 rounded-xl text-sm hover:brightness-110 transition hover:cursor-pointer h-full"
      >
        <Filter className="w-4 h-4" /> {t("marketplace.prices")}
      </button>

      {open && (
        <div
          className="absolute z-10 top-full right-0 mt-2 w-60 rounded-lg shadow-lg p-4 flex flex-col gap-3 text-sm"
          style={{
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
          }}
        >
          <label className="flex flex-col gap-1">
            Max: ${currentMaxValue}
            <input
              type="range"
              min="0"
              max={maxRange}
              value={currentMaxValue}
              onChange={(e) => setCurrentMaxValue(parseInt(e.target.value))}
              onMouseUp={applyCurrentValue}
              onTouchEnd={applyCurrentValue}
              className="w-full h-2 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default FilterPrice;
