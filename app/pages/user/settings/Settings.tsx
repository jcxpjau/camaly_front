import { useState } from "react";
import {
  User,
  Code,
  Key,
  Globe,
  CreditCard,
  FileText
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
    <div className="min-h-screen bg-[var(--color-bg)] p-6 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl text-[var(--color-text)] mb-2">Settings</h1>
          <p className="text-[var(--color-muted)]">Manage your account preferences and settings</p>
        </div>
        <div className="space-y-6 mb-6">
          <div className="grid w-full grid-cols-6 bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-sm rounded-lg overflow-hidden">
            <button
              onClick={() => setSelected("personal")}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all text-[var(--color-text)] ${
                selected === "personal" ? "bg-[var(--color-bg-alt)]" : "hover:bg-[var(--color-button-hover)]"
              }`}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </button>

            <button
              onClick={() => setSelected("api")}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all text-[var(--color-text)] ${
                selected === "api" ? "bg-[var(--color-bg-alt)]" : "hover:bg-[var(--color-button-hover)]"
              }`}
            >
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline">API</span>
            </button>

            <button
              onClick={() => setSelected("tokens")}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all text-[var(--color-text)] ${
                selected === "tokens" ? "bg-[var(--color-bg-alt)]" : "hover:bg-[var(--color-button-hover)]"
              }`}
            >
              <Key className="h-4 w-4" />
              <span className="hidden sm:inline">Tokens</span>
            </button>

            <button
              onClick={() => setSelected("environments")}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all text-[var(--color-text)] ${
                selected === "environments" ? "bg-[var(--color-bg-alt)]" : "hover:bg-[var(--color-button-hover)]"
              }`}
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Environments</span>
            </button>

            <button
              onClick={() => setSelected("plans")}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all text-[var(--color-text)] ${
                selected === "plans" ? "bg-[var(--color-bg-alt)]" : "hover:bg-[var(--color-button-hover)]"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Plans</span>
            </button>

            <button
              onClick={() => setSelected("logs")}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all text-[var(--color-text)] ${
                selected === "logs" ? "bg-[var(--color-bg-alt)]" : "hover:bg-[var(--color-button-hover)]"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Logs</span>
            </button>
          </div>
        </div>

        {/* Conteúdo das abas */}
        <main className="max-w-6xl mx-auto p-6  rounded-lg shadow-sm">
          {selected === "personal" && <PersonalSettings />}
          {selected === "api" && <ApiSettings />}
          {selected === "tokens" && <TokenSettings />}
          {selected === "environments" && <EnvironmentsSettings />}
          {selected === "plans" && <PlansSettings />}
          {selected === "logs" && <LogsSettings />}
        </main>
      </div>
    </div>
  );
}
