import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export function ConductAgents() {
    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);

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
        backgroundColor: checked ? "#bcacfc" : "transparent", // var(--color-accent)
        borderColor: "#bcacfc", // sempre mesma cor da borda para consistência
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
              <label className="block text-sm font-medium text-[var(--color-label-text)]">Aprendizado Contínuo</label>
              <p className="text-sm text-[var(--color-muted)]">
                Permite que o agente aprenda com interações
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
        backgroundColor: checked2 ? "#bcacfc" : "transparent", // var(--color-accent)
        borderColor: "#bcacfc", // sempre mesma cor da borda para consistência
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
