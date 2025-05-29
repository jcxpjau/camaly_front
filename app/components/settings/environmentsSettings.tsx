import React from "react";
import { Globe, Plus } from "lucide-react";
import ButtonSettings from "./buttonSettings";

export function EnvironmentsSettings() {
  const environments = [
    { name: "Production", url: "https://app.example.com", status: "Active" },
    { name: "Staging", url: "https://staging.example.com", status: "Inactive" },
    { name: "Buy", url: "https://staging.example.com", status: "Configuring" },
  ];

  return (
    <section  className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Globe className="h-5 w-5 text-[var(--color-icon-default)]" />
          Environments
        </h2>
        <p className="text-sm" style={{ color: "var(--color-card-subtext)" }}>
          Manage your deployment environments.
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Configured Environments</h3>
          <ButtonSettings text="Add Environment" icon={Plus}/>
        </div>

        <div className="space-y-3">
        {environments.map((environment) => (
          <div
            key={environment.name}
            className="flex items-center justify-between p-4 rounded-lg"
            style={{
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-bg-alt)",
            }}
          >
            <div className="min-w-0">
              <div className="font-medium truncate">{environment.name}</div>
              <div
                className="text-xs sm:text-sm truncate"
                style={{ color: "var(--color-muted)", maxWidth: "200px" }}
              >
                {environment.url}
              </div>
            </div>
            <div
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap
                ${
                  environment.status === "Active"
                    ? "border border-[var(--color-success)] text-[var(--color-text-success)]"
                    : environment.status === "Inactive"
                    ? "border border-[var(--color-error)] text-[var(--color-text-error)]"
                    : "border border-[var(--color-warning)] text-[var(--color-text-warning)]"
                }
              `}
            >
              {environment.status}
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
