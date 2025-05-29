import React from "react";
import { ListChecks } from "lucide-react";

export function LogsSettings() {
  const logs = [
    { id: "1", time: "14:32:15", level: "INFO", message: "Usuário logado com sucesso", ip: "192.168.1.100" },
    { id: "2", time: "14:30:22", level: "ERROR", message: "Falha na autenticação da API", ip: "192.168.1.100" },
    { id: "3", time: "14:28:45", level: "INFO", message: "Token de acesso renovado", ip: "192.168.1.100" },
    { id: "4", time: "14:25:12", level: "WARN", message: "Limite de requisições próximo", ip: "192.168.1.100" },
    { id: "5", time: "14:22:33", level: "INFO", message: "Backup automático concluído", ip: "Sistema" },
  ];

  return (
    <section  className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <header>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <ListChecks className="h-5 w-5 text-[var(--color-icon-default)]" />
          Activity Logs
        </h2>
        <p className="text-sm" style={{ color: "var(--color-card-subtext)" }}>
          Review recent account activity.
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
            className="flex items-center gap-4 p-3 border rounded-lg font-mono text-sm"
            style={{ borderColor: "var(--color-border)" }}
          >
            <span className="text-slate-500">{log.time}</span>
            <span
              className={`px-2 py-0.5 rounded border border                 ${
                  log.level === "INFO"
                    ? "border border-[var(--color-info)] text-[var(--color-text-info)]"
                    : log.level === "ERROR"
                    ? "border border-[var(--color-error)] text-[var(--color-text-error)]"
                    : "border border-[var(--color-warning)] text-[var(--color-text-warning)]"
                }`}
            >
              {log.level}
            </span>
            <span className="flex-1">{log.message}</span>
            <span className="text-slate-500">{log.ip}</span>
          </div>
        ))}
      </div>
    </section>
  );
}