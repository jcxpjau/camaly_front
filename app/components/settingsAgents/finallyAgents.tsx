import React from "react";

export function FinallyAgents() {
  return (
    <section  className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-card-text)]">Finalizar Configuração</h2>
        <p className="text-sm text-[var(--color-card-subtext)]">
          Revise e finalize a configuração do seu agente
        </p>
      </header>

      <div className="space-y-6">
        {/* Resumo */}
        <div className="bg-[var(--color-bg-muted)] p-4 rounded-lg space-y-2">
          <h4 className="font-medium text-[var(--color-text-default)]">Resumo da Configuração</h4>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            ✓ Integrações configuradas<br />
            ✓ Instruções definidas<br />
            ✓ Configurações técnicas aplicadas<br />
            ✓ Personalidade configurada
          </p>
        </div>

        {/* Botões */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="flex-1 rounded-md bg-[var(--color-accent)] text-white py-2 px-4 text-sm font-medium hover:brightness-110 transition"
          >
            Salvar e Ativar Agente
          </button>
          <button
            type="button"
            className="flex-1 rounded-md border border-[var(--color-border)] text-[var(--color-text-default)] py-2 px-4 text-sm font-medium hover:bg-[var(--color-bg-muted)] transition"
          >
            Salvar como Rascunho
          </button>
        </div>
      </div>
    </section>
  );
}
