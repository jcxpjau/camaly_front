import { useState, type Dispatch, type SetStateAction } from "react";

interface LogsFiltersProps {
  selectedArea: string;
  setSelectedArea: Dispatch<SetStateAction<string>>;
  selectedLevel: string;
  setSelectedLevel: Dispatch<SetStateAction<string>>;
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
  t: (key: string) => string;
}

export default function LogsFilters({
  selectedArea,
  setSelectedArea,
  selectedLevel,
  setSelectedLevel,
  selectedDate,
  setSelectedDate,
  t,
}: LogsFiltersProps) {
  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);

  const areas = [
    { value: "", label: t("settings.logsSettings.filters.allAreas") },
    { value: "login", label: t("settings.logsSettings.areas.login") },
    { value: "purchase", label: t("settings.logsSettings.areas.purchase") },
    { value: "tokens", label: t("settings.logsSettings.areas.tokens") },
    { value: "api", label: t("settings.logsSettings.areas.api") },
    { value: "plans", label: t("settings.logsSettings.areas.plans") },
  ];

  const levels = [
    { value: "", label: t("settings.logsSettings.filters.allLevels") },
    { value: "info", label: t("settings.logsSettings.levels.info") },
    { value: "success", label: t("settings.logsSettings.levels.success") },
    { value: "warning", label: t("settings.logsSettings.levels.warning") },
    { value: "error", label: t("settings.logsSettings.levels.error") },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4">
      <div className="relative inline-block text-left w-full md:w-auto">
        <button
          type="button"
          onClick={() => setIsAreaOpen(!isAreaOpen)}
          className="border rounded px-3 py-1 text-sm text-left min-w-[160px] w-full md:w-auto truncate"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-card-text)",
            backgroundColor: "var(--color-bg)",
          }}
        >
          {areas.find((a) => a.value === selectedArea)?.label || areas[0].label}
        </button>

        {isAreaOpen && (
          <ul className="absolute z-10 mt-1 min-w-[160px] bg-[var(--color-bg)] border rounded shadow-md">
            {areas.map((area) => (
              <li key={area.value}>
                <button
                  onClick={() => {
                    setSelectedArea(area.value);
                    setIsAreaOpen(false);
                  }}
                  className="block w-full text-left px-3 py-1 text-sm hover:bg-[var(--color-bg-alt)]"
                  style={{ color: "var(--color-card-text)" }}
                >
                  {area.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative inline-block text-left w-full md:w-auto">
        <button
          type="button"
          onClick={() => setIsLevelOpen(!isLevelOpen)}
          className="border rounded px-3 py-1 text-sm text-left min-w-[160px] w-full md:w-auto truncate"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-card-text)",
            backgroundColor: "var(--color-bg)",
          }}
        >
          {levels.find((l) => l.value === selectedLevel)?.label ||
            levels[0].label}
        </button>

        {isLevelOpen && (
          <ul className="absolute z-10 mt-1 min-w-[160px] bg-[var(--color-bg)] border rounded shadow-md">
            {levels.map((level) => (
              <li key={level.value}>
                <button
                  onClick={() => {
                    setSelectedLevel(level.value);
                    setIsLevelOpen(false);
                  }}
                  className="block w-full text-left px-3 py-1 text-sm hover:bg-[var(--color-bg-alt)]"
                  style={{ color: "var(--color-card-text)" }}
                >
                  {level.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="date"
        className="border rounded px-3 py-1 text-sm bg-transparent w-full md:w-auto"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-card-text)",
          backgroundColor: "var(--color-bg)",
        }}
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        placeholder={t("settings.logsSettings.filters.dateLabel")}
      />
    </div>
  );
}
