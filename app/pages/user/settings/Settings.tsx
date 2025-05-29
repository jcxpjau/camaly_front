import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  User, Code, Key, Globe, CreditCard, FileText
} from "lucide-react";

import { PersonalSettings } from "~/components/settings/personalSettings";
import { ApiSettings } from "~/components/settings/apiSettings";
import { TokenSettings } from "~/components/settings/tokenSettings";
import { EnvironmentsSettings } from "~/components/settings/environmentsSettings";
import { PlansSettings } from "~/components/settings/plansSettings";
import { LogsSettings } from "~/components/settings/logsSettings";

export default function Settings() {
  const [selected, setSelected] = useState("personal");

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-10 mb-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 mx-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl text-[var(--color-text)] mb-4">Settings</h1>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-2xl">
            Manage your account preferences and settings
          </p>
        </motion.div>

 <div className="space-y-6 mb-6">
          <div className="grid w-full grid-cols-6 bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-sm rounded-lg overflow-hidden">
            <button
              onClick={() => setSelected("personal")}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all text-[var(--color-text)] ${
                selected === "personal" ? "bg-[#6366f1] text-white" : "text-[var(--color-text)] hover:bg-[var(--color-button-hover)]"
              }`}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </button>

            <button
              onClick={() => setSelected("api")}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all text-[var(--color-text)] ${
                selected === "api" ? "bg-[#6366f1] text-white" : "text-[var(--color-text)] hover:bg-[var(--color-button-hover)]"
              }`}
            >
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">API</span>
            </button>

            <button
              onClick={() => setSelected("tokens")}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all text-[var(--color-text)] ${
                selected === "tokens" ? "bg-[#6366f1] text-white" : "text-[var(--color-text)] hover:bg-[var(--color-button-hover)]"
              }`}
            >
              <Key className="h-4 w-4" />
              <span className="hidden sm:inline">Tokens</span>
            </button>

            <button
              onClick={() => setSelected("environments")}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all text-[var(--color-text)] ${
                selected === "environments" ? "bg-[#6366f1] text-white" : "text-[var(--color-text)] hover:bg-[var(--color-button-hover)]"
              }`}
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Environments</span>
            </button>

            <button
              onClick={() => setSelected("plans")}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all text-[var(--color-text)] ${
                selected === "plans" ? "bg-[#6366f1] text-white" : "text-[var(--color-text)] hover:bg-[var(--color-button-hover)]"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Plans</span>
            </button>

            <button
              onClick={() => setSelected("logs")}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all text-[var(--color-text)] ${
                selected === "logs" ? "bg-[#6366f1] text-white" : "text-[var(--color-text)] hover:bg-[var(--color-button-hover)]"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Logs</span>
            </button>
          </div>
        </div>

<main className="p-6 rounded-lg shadow-sm relative min-h-[300px]">
  <AnimatePresence mode="wait">
    {selected === "personal" && (
      <motion.div
        key="personal"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <PersonalSettings />
      </motion.div>
    )}
    {selected === "api" && (
      <motion.div
        key="api"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <ApiSettings />
      </motion.div>
    )}
    {selected === "tokens" && (
      <motion.div
        key="tokens"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <TokenSettings />
      </motion.div>
    )}
    {selected === "environments" && (
      <motion.div
        key="environments"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <EnvironmentsSettings />
      </motion.div>
    )}
    {selected === "plans" && (
      <motion.div
        key="plans"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <PlansSettings />
      </motion.div>
    )}
    {selected === "logs" && (
      <motion.div
        key="logs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <LogsSettings />
      </motion.div>
    )}
  </AnimatePresence>
</main>

      </div>
    </div>
  );
}
