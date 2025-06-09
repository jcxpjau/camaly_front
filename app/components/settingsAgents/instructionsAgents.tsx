import React from "react";

export function InstructionsAgents() {
  return (
    <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-card-text)]">
          Agent Instructions
        </h2>
        <p className="text-sm text-[var(--color-card-subtext)]">
          Define the main behavior and instructions for your AI agent
        </p>
      </header>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="instructions"
            className="block text-sm font-medium text-[var(--color-label-text)]"
          >
            Main Instructions
          </label>
          <textarea
            id="instructions"
            placeholder="Describe how the agent should behave, its responsibilities, and main guidelines..."
            className="min-h-[200px] mt-2 w-full rounded-md border p-2 text-sm shadow-sm outline-none bg-[var(--color-bg-input)] border-[var(--color-border-input)] text-[var(--color-text-default)] placeholder-[var(--color-placeholder-default)] focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
          />
        </div>

        <div>
          <label
            htmlFor="context"
            className="block text-sm font-medium text-[var(--color-label-text)]"
          >
            Additional Context
          </label>
          <textarea
            id="context"
            placeholder="Add relevant context information for the agent..."
            className="min-h-[100px] mt-2 w-full rounded-md border p-2 text-sm shadow-sm outline-none bg-[var(--color-bg-input)] border-[var(--color-border-input)] text-[var(--color-text-default)] placeholder-[var(--color-placeholder-default)] focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
          />
        </div>
      </div>
    </section>
  );
}
