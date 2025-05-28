import { useEffect, useRef, useState } from "react";
import { Filter } from "lucide-react";

type FilterProps = {
  selected: [number, number];
  onSelect: (value: [number, number]) => void;
};

const FilterPrice = ({ selected, onSelect }: FilterProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Estado interno string para permitir apagar e digitar
  const [minValue, setMinValue] = useState(selected[0].toString());
  const [maxValue, setMaxValue] = useState(selected[1].toString());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Aplica o filtro ao clicar fora (fechando dropdown)
        applyCurrentValues();
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [minValue, maxValue]);

  // Sincroniza valores internos quando selected muda no pai
  useEffect(() => {
    setMinValue(selected[0].toString());
    setMaxValue(selected[1].toString());
  }, [selected]);

  // Função para validar e aplicar valores ao pai
  const applyCurrentValues = () => {
    let minNum = parseInt(minValue);
    let maxNum = parseInt(maxValue);

    if (isNaN(minNum) || minNum < 0) minNum = 0;
    if (isNaN(maxNum) || maxNum < 0) maxNum = 0;

    if (minNum > maxNum) minNum = maxNum;

    setMinValue(minNum.toString());
    setMaxValue(maxNum.toString());

    onSelect([minNum, maxNum]);
  };

  // Handlers para onBlur dos inputs, aplicando filtro
  const onMinBlur = () => applyCurrentValues();
  const onMaxBlur = () => applyCurrentValues();

  return (
    <div className="shrink-0 relative" ref={dropdownRef}>
      <button
        onClick={() => {
          if (open) {
            applyCurrentValues(); // Aplica filtro antes de fechar
          }
          setOpen(!open);
        }}
        className="flex items-center gap-2 bg-[var(--color-accent)] text-white px-3 py-2 rounded-xl text-sm hover:brightness-110 transition"
      >
        <Filter className="w-4 h-4" /> Filter
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
            Min Price
            <input
              type="number"
              className="border rounded-md px-2 py-1 text-sm appearance-none"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              onBlur={onMinBlur}
              min={0}
              style={{ MozAppearance: "textfield" }}
            />
          </label>
          <label className="flex flex-col gap-1">
            Max Price
            <input
              type="number"
              className="border rounded-md px-2 py-1 text-sm appearance-none"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              onBlur={onMaxBlur}
              min={0}
              style={{ MozAppearance: "textfield" }}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default FilterPrice;
