import React from "react";

export function ConductAgents() {
  return (
    <section  className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-card-text)]">
          Configurações Gerais
        </h2>
        <p className="text-sm text-[var(--color-card-subtext)]">
          Configure os parâmetros técnicos e comportamentais do agente
        </p>
      </header>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="temperature" className="block text-sm font-medium text-[var(--color-label-text)]">
              Criatividade (Temperature)
            </label>
            <select
              id="temperature"
              className="mt-2 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)] py-2 px-3 text-sm shadow-sm text-[var(--color-text-default)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
              defaultValue=""
            >
              <option value="" disabled>
                Selecione o nível
              </option>
              <option value="low">Baixa (0.2)</option>
              <option value="medium">Média (0.7)</option>
              <option value="high">Alta (1.0)</option>
            </select>
          </div>

          <div>
            <label htmlFor="model" className="block text-sm font-medium text-[var(--color-label-text)]">
              Modelo de IA
            </label>
            <select
              id="model"
              className="mt-2 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)] py-2 px-3 text-sm shadow-sm text-[var(--color-text-default)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
              defaultValue=""
            >
              <option value="" disabled>
                Selecione o modelo
              </option>
              <option value="gpt4">GPT-4</option>
              <option value="gpt3.5">GPT-3.5 Turbo</option>
              <option value="claude">Claude 3</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-[var(--color-label-text)]">Modo de Debug</label>
              <p className="text-sm text-[var(--color-muted)]">
                Exibe informações detalhadas durante execução
              </p>
            </div>
            <input
              type="checkbox"
              className="h-5 w-9 rounded-full bg-[var(--color-button-bg)] checked:bg-[var(--color-accent)] focus:outline-none cursor-pointer transition-colors"
              aria-checked="false"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-[var(--color-label-text)]">Aprendizado Contínuo</label>
              <p className="text-sm text-[var(--color-muted)]">
                Permite que o agente aprenda com interações
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-9 rounded-full bg-[var(--color-button-bg)] checked:bg-[var(--color-accent)] focus:outline-none cursor-pointer transition-colors"
              aria-checked="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
