import React, { useState } from "react";
import { Code, Eye, EyeOff, Copy, Check } from "lucide-react";
import { Input } from "../input/input";
import ButtonSettings from "./buttonSettings";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export function ApiSettings() {
  const { t } = useTranslation();
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiLogs, setApiLogs] = useState(false);
  const [checked, setChecked] = useState(false);

  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');

  return (
    <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Code className="h-5 w-5" />
          {t("settings.apiSettings.title")}
        </h2>
        <p className="text-sm text-[var(--color-card-subtext)]">
          {t("settings.apiSettings.description")}
        </p>
      </div>
      <form className="space-y-4">
        <div className="flex flex-col">
          <Input.Root label={t("settings.apiSettings.apiEndpoint")}>
            <Input.Content
              placeholder="https://api.example.com/v1"
              type="text"
              value={url}
              onChange={setUrl}
            />
          </Input.Root>
        </div>
        <div className="flex flex-row">
          <Input.Root label={t("settings.apiSettings.apiKey")}>
            <Input.Content
              placeholder="sk_live_xxxxxxxxxxxx"
              type="password"
              value={key}
              onChange={setKey}
            />
            <button
              type="button"
              aria-label={t("settings.apiSettings.copyApiKey")}
              className="rounded p-1 text-[var(--color-card-subtext)] hover:text-[var(--color-card-text)] transition"
              onClick={() => {
                navigator.clipboard.writeText(
                  (document.getElementById("apiKey") as HTMLInputElement)?.value || ""
                );
              }}
            >
              <Copy className="h-5 w-5" />
            </button>
          </Input.Root>
        </div>
        <div className="flex flex-col gap-5 items-center space-x-0 space-y-2 justify-between sm:flex-row sm:space-x-2 sm:space-y-0">
          <div className="flex flex-row items-center gap-1">
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

  <label
    htmlFor="enabled-logs"
    className="select-none cursor-pointer text-[var(--color-card-text)]"
  >
    {t("settings.apiSettings.enabledLogs")}
  </label>
</div>
          <ButtonSettings text={t("settings.apiSettings.saveChanges")} />
        </div>
      </form>
    </section>
  );
}
