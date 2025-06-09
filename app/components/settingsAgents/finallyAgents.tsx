import React from "react";
import { Input } from "../input/input";
import { useAuth } from "~/context/auth/auth.hooks";
import { useCustomNavigate } from "~/hooks/useCustomNavigate";

export function FinallyAgents() {
  const navigate = useCustomNavigate();
  return (
    <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-card-text)]">Complete Setup</h2>
        <p className="text-sm text-[var(--color-card-subtext)]">
          Review and finalize your agent's configuration
        </p>
      </header>

      <div className="space-y-6">
        {/* Summary */}
        <div className="bg-[var(--color-bg-muted)] p-4 rounded-lg space-y-2">
          <h4 className="font-medium text-[var(--color-text-default)]">Configuration Summary</h4>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            ✓ Integrations configured<br />
            ✓ Instructions defined<br />
            ✓ Technical settings applied<br />
            ✓ Personality set
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
                        onClick={(e) => {
            navigate(e, "/user/socialmediaagent");
            }}
            className="flex-1 rounded-md bg-[var(--color-accent)] text-white py-2 px-4 text-sm font-medium hover:brightness-110 transition"
          >
            Save and Activate Agent
          </button>
          <button
            type="button"
            className="flex-1 rounded-md border border-[var(--color-border)] text-[var(--color-text-default)] py-2 px-4 text-sm font-medium hover:bg-[var(--color-bg-muted)] transition"
          >
            Save as Draft
          </button>
        </div>
      </div>
    </section>
  );
}
