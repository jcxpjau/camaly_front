import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  User, Code, Key, Globe, CreditCard, FileText
} from "lucide-react";

import { useTranslation } from "react-i18next";

import { PersonalSettings } from "~/components/settings/personalSettings";
import { ApiSettings } from "~/components/settings/apiSettings";
import { TokenSettings } from "~/components/settings/tokenSettings";
import { EnvironmentsSettings } from "~/components/settings/environmentsSettings";
import { PlansSettings } from "~/components/settings/plansSettings";
import { LogsSettings } from "~/components/settings/logsSettings";

export default function Settings() {
  const { t } = useTranslation();

  const [selected, setSelected] = useState("personal");

  // Mapeamento para renderizar os componentes com a key
  const componentsMap = {
    personal: <PersonalSettings />,
    api: <ApiSettings />,
    tokens: <TokenSettings />,
    environments: <EnvironmentsSettings />,
    plans: <PlansSettings />,
    logs: <LogsSettings />,
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] px-6 py-10 mb-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 mx-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-3xl text-[var(--color-text)] mb-4">{t("settings.title")}</h1>
          <p className="text-[var(--color-muted)] text-lg leading-relaxed max-w-2xl">
            {t("settings.description")}
          </p>
        </motion.div>

        <div className="space-y-6 mb-6">
          <div className="grid w-full grid-cols-6 bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-sm rounded-lg overflow-hidden">
            {[
              { key: "personal", icon: User },
              { key: "api", icon: Code },
              { key: "tokens", icon: Key },
              { key: "environments", icon: Globe },
              { key: "plans", icon: CreditCard },
              { key: "logs", icon: FileText },
            ].map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all text-[var(--color-text)] ${
                  selected === key
                    ? "bg-[#6366f1] text-white"
                    : "text-[var(--color-text)] hover:bg-[var(--color-button-hover)]"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t(`settings.tabs.${key}`)}</span>
              </button>
            ))}
          </div>
        </div>

        <main className="p-6 rounded-lg shadow-sm relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {Object.entries(componentsMap).map(([key, Component]) =>
              key === selected ? (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {Component}
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
