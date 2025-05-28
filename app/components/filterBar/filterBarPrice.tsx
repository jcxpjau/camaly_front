import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { useTranslation } from "react-i18next";

type FilterProps = {
  selected: number; // Now only a single number for max price
  onSelect: (value: number) => void; // Emits a single number
  maxRange?: number; // Optional prop to define the max value of the slider
};

const FilterPrice = ({ selected, onSelect, maxRange = 100 }: FilterProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentMaxValue, setCurrentMaxValue] = useState(selected);

  // Sincroniza valor interno quando 'selected' muda no pai
  useEffect(() => {
    setCurrentMaxValue(selected);
  }, [selected]);

  // Aplica o valor ao pai quando o slider muda ou o popover fecha
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
        className="flex items-center gap-2 bg-[var(--color-accent)] text-white px-3 py-2 rounded-xl text-sm hover:brightness-110 transition"
      >
        <Filter className="w-4 h-4" /> {t("marketplace.prices")}
      </button>

      {open && (
        <div
          className="absolute z-10 mt-2 w-60 rounded-lg shadow-lg p-4 flex flex-col gap-3 text-sm"
          style={{
            backgroundColor: "var(--color-bg)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
          }}
        >
          <label className="flex flex-col gap-1">
            Max Price: ${currentMaxValue}
            <input
              type="range"
              min="0"
              max={maxRange} // Use the maxRange prop for the slider's upper limit
              value={currentMaxValue}
              onChange={(e) => setCurrentMaxValue(parseInt(e.target.value))}
              onMouseUp={applyCurrentValue} // Apply when done dragging (for better UX)
              onTouchEnd={applyCurrentValue} // For touch devices
              className="w-full h-2 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default FilterPrice;
