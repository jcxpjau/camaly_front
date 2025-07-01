import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export function ConductAgents() {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);

  return (
    <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-card-text)]">
          General Settings
        </h2>
        <p className="text-sm text-[var(--color-card-subtext)]">
          Configure the technical and behavioral parameters of the agent
        </p>
      </header>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="temperature" className="block text-sm font-medium text-[var(--color-label-text)]">
              Creativity (Temperature)
            </label>
            <select
              id="temperature"
              className="mt-2 w-full appearance-none rounded-md border border-[var(--color-border)] bg-[var(--select-bg)] text-[var(--select-text)] py-2 px-3 pr-8 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem_1rem]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='var(--select-text)' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
              }}
              defaultValue=""
            >
              <option value="" disabled>
                Select level
              </option>
              <option value="low">Low (0.2)</option>
              <option value="medium">Medium (0.7)</option>
              <option value="high">High (1.0)</option>
            </select>
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-[var(--color-label-text)]">
              AI Model
            </label>
            <select
              id="model"
              className="mt-2 w-full appearance-none rounded-md border border-[var(--color-border)] bg-[var(--select-bg)] text-[var(--select-text)] py-2 px-3 pr-8 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem_1rem]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' fill='var(--select-text)' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
              }}
              defaultValue=""
            >
            <option value="" disabled>
              Select model
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
              <label className="block text-sm font-medium text-[var(--color-label-text)]">Debug Mode</label>
              <p className="text-sm text-[var(--color-muted)]">
                Shows detailed information during execution
              </p>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setChecked(!checked)}
              role="checkbox"
              aria-checked={checked}
              tabIndex={0}
            >
              <motion.div
                className="w-5 h-5 rounded-[4px] border flex items-center justify-center"
                initial={false}
                animate={{
                  backgroundColor: checked ? "#bcacfc" : "transparent",
                  borderColor: "#bcacfc",
                }}
                transition={{ duration: 0.2 }}
              >
                <AnimatePresence>
                  {checked && (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-[var(--color-label-text)]">Continuous Learning</label>
              <p className="text-sm text-[var(--color-muted)]">
                Allows the agent to learn from interactions
              </p>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setChecked2(!checked2)}
              role="checkbox"
              aria-checked={checked2}
              tabIndex={0}
            >
              <motion.div
                className="w-5 h-5 rounded-[4px] border flex items-center justify-center"
                initial={false}
                animate={{
                  backgroundColor: checked2 ? "#bcacfc" : "transparent",
                  borderColor: "#bcacfc",
                }}
                transition={{ duration: 0.2 }}
              >
                <AnimatePresence>
                  {checked2 && (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}