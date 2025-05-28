import React from "react";
import { Globe, Plus } from "lucide-react";

export function EnvironmentsSettings() {
  const environments = [
    { name: "Production", url: "https://app.example.com", status: "active" },
    { name: "Staging", url: "https://staging.example.com", status: "inactive" },
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
          <Globe className="h-5 w-5 text-[var(--color-icon-default)]" />
          Environments
        </h2>
        <p className="text-sm" style={{ color: "var(--color-card-subtext)" }}>
          Manage your deployment environments.
        </p>
      </header>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Configured Environments</h3>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-white hover:brightness-110 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "var(--color-accent)",
              boxShadow: "0 0 0 2px var(--color-accent)",
            }}
          >
            <Plus className="h-4 w-4" />
            Add Environment
          </button>
        </div>

        <div className="space-y-3">
          {environments.map((env) => (
            <div
              key={env.name}
              className="flex items-center justify-between p-4 rounded-lg"
              style={{
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-bg-alt)",
              }}
            >
              <div>
                <div className="font-medium">{env.name}</div>
                <div className="text-sm" style={{ color: "var(--color-muted)" }}>
                  {env.url}
                </div>
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor:
                    env.status === "active"
                      ? "var(--color-badge-active-bg)"
                      : "var(--color-badge-inactive-bg)",
                  color:
                    env.status === "active"
                      ? "var(--color-badge-active-text)"
                      : "var(--color-badge-inactive-text)",
                }}
              >
                {env.status.charAt(0).toUpperCase() + env.status.slice(1)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
