import React from "react";
import { Key, Plus, Copy, Trash2 } from "lucide-react";

const tokens = [
  {
    id: "1",
    name: "Main Token",
    value: "abcd-1234-efgh-5678",
    created: "2024-01-01",
  },
  {
    id: "2",
    name: "Backup Token",
    value: "ijkl-9012-mnop-3456",
    created: "2024-02-10",
  },
];

export function TokenSettings() {
  return (
    <section
      className="space-y-6 p-6 rounded-lg"
      style={{
        color: "var(--color-card-text)",
      }}
    >
      <header>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Key className="h-5 w-5 text-[var(--color-icon-default)]" />
          Tokens and Secrets
        </h2>
        <p className="text-sm" style={{ color: "var(--color-card-subtext)" }}>
          Manage your access tokens and secret keys.
        </p>
      </header>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Active Tokens</h3>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            <Plus className="h-4 w-4" />
            New Token
          </button>
        </div>

        <div className="space-y-3">
          {tokens.map((token) => (
            <div
              key={token.id}
              className="flex items-center justify-between p-4 rounded-lg"
              style={{
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-bg-alt)",
              }}
            >
              <div>
                <div className="font-medium">{token.name}</div>
                <div className="text-sm" style={{ color: "var(--color-muted)" }}>
                  {token.value} • Created on {token.created}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded px-2 py-1 hover:brightness-105 transition"
                  style={{
                    border: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-button-bg)",
                  }}
                  aria-label="Copy token"
                  onClick={() => navigator.clipboard.writeText(token.value)}
                >
                  <Copy className="h-4 w-4 text-[var(--color-icon-default)]" />
                </button>
                <button
                  type="button"
                  className="rounded px-2 py-1 hover:brightness-105 transition"
                  style={{
                    border: "1px solid var(--color-border)",
                    backgroundColor: "var(--color-button-bg)",
                  }}
                  aria-label="Delete token"
                >
                  <Trash2 className="h-4 w-4 text-[var(--color-icon-error)]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
