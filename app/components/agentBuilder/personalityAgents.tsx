import React, { useState } from "react";
import ButtonSettings from "../settings/buttonSettings";

export function PersonalityAgents() {
  const [formal, setFormal] = useState(false);

  return (
    <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-card-text)]">Agent Personality</h2>
        <p className="text-sm text-[var(--color-card-subtext)]">
          Define the tone of voice and personality traits
        </p>
      </header>
      <div className="space-y-4">
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-[var(--color-label-text)]">
            Tone of Voice
          </label>
          <select
            id="tone"
            className="mt-2 w-full appearance-none rounded-md border border-[var(--color-border)] bg-[var(--select-bg)] text-[var(--select-text)] py-2 px-3 pr-8 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem_1rem]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='var(--select-text)' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
            defaultValue=""
          >
            <option value="" disabled>Select tone</option>
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
          </select>
        </div>
        <div>
          <label htmlFor="personality" className="block text-sm font-medium text-[var(--color-label-text)]">
            Personality Traits
          </label>
          <textarea
            id="personality"
            placeholder="Describe how the agent should communicate, its style and unique traits..."
            className="mt-2 w-full min-h-[150px] rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)] px-3 py-2 text-sm shadow-sm text-[var(--color-text-default)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
          />
        </div>
        <div>
          <label htmlFor="language-style" className="block text-sm font-medium text-[var(--color-label-text)] mb-2">
            Language Style
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
                  className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
                    formal ? "bg-[var(--color-accent)]" : "bg-[var(--color-muted)]"
                  }`}
                >
                  <span
                    className={`inline-block w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 transform ${
                      formal ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <label htmlFor="formal" className="text-sm select-none" style={{ color: "var(--color-card-text)" }}>
                  Formal Language
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}