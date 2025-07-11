import { ChevronLeft, ChevronRight, ListChecks } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LogsFilters from "./logsFilters";

const levelColors = {
  info: "#3498db", // azul
  success: "#2ecc71", // verde
  warn: "#f1c40f", // amarelo
  error: "#e74c3c", // vermelho
};

export function LogsSettings() {
  const { t } = useTranslation();
  const logs = [
    {
      id: "1",
      datetime: "2025-06-14 12:28:04",
      level: "info",
      area: "tokens",
      msg: "tokenUpdated",
    },
    {
      id: "2",
      datetime: "2025-06-24 03:15:17",
      level: "success",
      area: "purchase",
      msg: "purchaseSuccessfull",
    },
    {
      id: "3",
      datetime: "2025-06-26 16:27:47",
      level: "error",
      area: "api",
      msg: "apiFail",
    },
    {
      id: "4",
      datetime: "2025-06-28 21:59:01",
      level: "warning",
      area: "plans",
      msg: "paymentWarning",
    },
    {
      id: "5",
      datetime: "2025-06-20 11:30:52",
      level: "success",
      area: "login",
      msg: "loginSuccessfull",
    },
  ];
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [filteredLogs, setFilteredLogs] = useState(logs);

  useEffect(() => {
    const result = logs.filter((log) => {
      const matchesArea = selectedArea ? log.area === selectedArea : true;
      const matchesLevel = selectedLevel ? log.level === selectedLevel : true;
      const matchesDate = selectedDate
        ? log.datetime.startsWith(selectedDate)
        : true;

      return matchesArea && matchesLevel && matchesDate;
    });

    setFilteredLogs(result);
  }, [logs, selectedArea, selectedLevel, selectedDate]);

  return (
    <section
      className="space-y-6 rounded-lg"
      style={{ color: "var(--color-card-text)" }}
    >
      <header>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <ListChecks className="h-5 w-5 text-[var(--color-icon-default)]" />
          {t("settings.logsSettings.title")}
        </h2>
        <p className="text-sm" style={{ color: "var(--color-card-subtext)" }}>
          {t("settings.logsSettings.description")}
        </p>
      </header>
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <LogsFilters
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          t={t}
        />
      </div>
      <div
        className="border rounded-md p-4 space-y-2"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-bg-alt)",
        }}
      >
        <div
          className="hidden md:flex items-center gap-4 px-3 pb-2 border-b text-xs font-semibold text-slate-500 uppercase"
          style={{ borderColor: "var(--color-border)" }}
        >
          <span className="w-40">
            {t(`settings.logsSettings.logHeader.datetime`)}
          </span>
          <span className="w-24">
            {t(`settings.logsSettings.logHeader.level`)}
          </span>
          <span className="flex-1">
            {t(`settings.logsSettings.logHeader.msg`)}
          </span>
          <span className="w-24">
            {t(`settings.logsSettings.logHeader.area`)}
          </span>
        </div>

        <div className="max-h-96 overflow-y-auto space-y-2">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-3 border rounded-lg font-mono text-sm break-words"
              style={{ borderColor: "var(--color-border)" }}
            >
              <span className="text-slate-500 w-full md:w-40">
                {log.datetime}
              </span>

              <span
                className="px-2 py-0.5 rounded border w-fit text-center text-xs md:text-sm"
                style={{
                  borderColor: `var(--color-${log.level.toLowerCase()})`,
                  color: `var(--color-text-${log.level.toLowerCase()})`,
                }}
              >
                {t(`settings.logsSettings.levels.${log.level}`)}
              </span>

              <span className="flex-1 break-words">
                {t(`settings.logsSettings.messages.${log.msg}`)}
              </span>

              <span className="px-2 py-0.5 rounded border w-fit text-center text-xs md:text-sm">
                {t(`settings.logsSettings.areas.${log.area}`)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-4">
          <button className="px-3 py-1 rounded border text-xs md:text-sm hover:bg-slate-100 dark:hover:bg-slate-700">
            <ChevronLeft />
          </button>
          <button className="px-3 py-1 rounded border text-xs md:text-sm bg-slate-200 dark:bg-slate-700">
            1
          </button>
          <button className="px-3 py-1 rounded border text-xs md:text-sm hover:bg-slate-100 dark:hover:bg-slate-700">
            2
          </button>
          <button className="px-3 py-1 rounded border text-xs md:text-sm hover:bg-slate-100 dark:hover:bg-slate-700">
            3
          </button>
          <button className="px-3 py-1 rounded border text-xs md:text-sm hover:bg-slate-100 dark:hover:bg-slate-700">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
