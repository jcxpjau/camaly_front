import React from "react";
import { ListChecks } from "lucide-react";

export function LogsSettings() {
  const logs = [
    { id: "1", message: "User logged in", timestamp: "2025-05-27 10:00" },
    { id: "2", message: "API key rotated", timestamp: "2025-05-27 11:30" },
    { id: "3", message: "Password changed", timestamp: "2025-05-27 12:00" },
  ];

  return (
    <section
      className="space-y-6 p-6 rounded-lg"
      style={{
        color: "var(--color-card-text)",
      }}
    >
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
        className="max-h-96 overflow-y-auto border rounded-md p-4"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-bg-alt)",
        }}
      >
        <ul className="space-y-3">
          {logs.map((log) => (
            <li key={log.id} className="flex justify-between text-sm">
              <span>{log.message}</span>
              <time style={{ color: "var(--color-subdued-text)" }}>
                {log.timestamp}
              </time>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
