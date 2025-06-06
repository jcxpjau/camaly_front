import React, { useState } from "react";
import ButtonSettings from "../settings/buttonSettings";

export function PersonalityAgents() {
  const [formal, setFormal] = useState(false);

  return (
    <section  className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-card-text)]">Personalidade do Agente</h2>
        <p className="text-sm text-[var(--color-card-subtext)]">
          Defina o tom de voz e características de personalidade
        </p>
      </header>

      <div className="space-y-4">
        {/* Tom de Voz */}
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-[var(--color-label-text)]">
            Tom de Voz
          </label>
          <select
            id="tone"
            className="mt-2 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)] py-2 px-3 text-sm shadow-sm text-[var(--color-text-default)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
            defaultValue=""
          >
            <option value="" disabled>Selecione o tom</option>
            <option value="friendly">Amigável</option>
            <option value="professional">Profissional</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
          </select>
        </div>

        {/* Características de Personalidade */}
        <div>
          <label htmlFor="personality" className="block text-sm font-medium text-[var(--color-label-text)]">
            Características de Personalidade
          </label>
          <textarea
            id="personality"
            placeholder="Descreva como o agente deve se comunicar, seu estilo e características únicas..."
            className="mt-2 w-full min-h-[150px] rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)] px-3 py-2 text-sm shadow-sm text-[var(--color-text-default)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
          />
        </div>

        {/* Estilo de Linguagem */}
        <div>
          <label htmlFor="language-style" className="block text-sm font-medium text-[var(--color-label-text)] mb-2">
            Estilo de Linguagem
          </label>
          <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <button
                                id="formal"
                                type="button"
                                role="switch"
                                aria-checked={formal}
                                onClick={() => setFormal(!formal)}
                                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${formal ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-muted)]'
                                    }`}
                            >
                                <span
                                    className={`inline-block w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 transform ${formal ? 'translate-x-6' : 'translate-x-0.5'
                                        }`}
                                />
                            </button>
                            <label htmlFor="formal" className="text-sm select-none" style={{ color: "var(--color-card-text)" }}>
                                Linguagem Formal
                            </label>
                        </div>
                    </div>  
          </div>
        </div>
      </div>
    </section>
  );
}
