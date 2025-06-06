import React from "react";

export function InstructionsAgents() {
  return (
    <section  className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-card-text)]">
          Instruções do Agente
        </h2>
        <p className="text-sm text-[var(--color-card-subtext)]">
          Defina o comportamento e as instruções principais para o seu agente IA
        </p>
      </header>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="instructions"
            className="block text-sm font-medium text-[var(--color-label-text)]"
          >
            Instruções Principais
          </label>
          <textarea
            id="instructions"
            placeholder="Descreva como o agente deve se comportar, suas responsabilidades e diretrizes principais..."
            className="min-h-[200px] mt-2 w-full rounded-md border p-2 text-sm shadow-sm outline-none bg-[var(--color-bg-input)] border-[var(--color-border-input)] text-[var(--color-text-default)] placeholder-[var(--color-placeholder-default)] focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
          />
        </div>

        <div>
          <label
            htmlFor="context"
            className="block text-sm font-medium text-[var(--color-label-text)]"
          >
            Contexto Adicional
          </label>
          <textarea
            id="context"
            placeholder="Adicione informações de contexto relevantes para o agente..."
            className="min-h-[100px] mt-2 w-full rounded-md border p-2 text-sm shadow-sm outline-none bg-[var(--color-bg-input)] border-[var(--color-border-input)] text-[var(--color-text-default)] placeholder-[var(--color-placeholder-default)] focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
          />
        </div>
      </div>
    </section>
  );
}
