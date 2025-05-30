import React from "react";
import { ListChecks } from "lucide-react";
import { useTranslation } from "react-i18next";

export function LogsSettings() {
  const { t } = useTranslation();
  const logs = [
    { id: "1", time: "14:32:15", level: t("settings.logsSettings.levels.info"), message: t("settings.logsSettings.messages.userLoggedIn"), ip: "192.168.1.100" },
    { id: "2", time: "14:30:22", level: t("settings.logsSettings.levels.error"), message: t("settings.logsSettings.messages.apiAuthFailed"), ip: "192.168.1.100" },
    { id: "3", time: "14:28:45", level: t("settings.logsSettings.levels.info"), message: t("settings.logsSettings.messages.tokenRefreshed"), ip: "192.168.1.100" },
    { id: "4", time: "14:25:12", level: t("settings.logsSettings.levels.warn"), message: t("settings.logsSettings.messages.rateLimitNear"), ip: "192.168.1.100" },
    { id: "5", time: "14:22:33", level: t("settings.logsSettings.levels.info"), message: t("settings.logsSettings.messages.backupCompleted"), ip: "Sistema" },
  ];

  return (
    <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <header>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <ListChecks className="h-5 w-5 text-[var(--color-icon-default)]" />
          {t("settings.logsSettings.title")}
        </h2>
        <p className="text-sm" style={{ color: "var(--color-card-subtext)" }}>
          {t("settings.logsSettings.description")}
        </p>
      </header>

      <div
        className="max-h-96 overflow-y-auto border rounded-md p-4 space-y-2"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-bg-alt)",
        }}
      >
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 p-3 border rounded-lg font-mono text-sm break-words"
            style={{ borderColor: "var(--color-border)" }}
          >
            <span className="text-slate-500 w-full md:w-auto">{log.time}</span>

            <span
              className={`px-2 py-0.5 rounded border w-fit text-center text-xs md:text-sm ${
                log.level === "INFO" || log.level === "INFORMAÇÃO"
                  ? "border-[var(--color-info)] text-[var(--color-text-info)]"
                  : log.level === "ERROR" || log.level === "ERRO"
                  ? "border-[var(--color-error)] text-[var(--color-text-error)]"
                  : "border-[var(--color-warning)] text-[var(--color-text-warning)]"
              }`}
            >
              {log.level}
            </span>

            <span className="flex-1 break-words">{log.message}</span>

            <span className="text-slate-500 w-full md:w-auto">{log.ip}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
