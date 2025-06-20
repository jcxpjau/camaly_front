import React, { useEffect, useState, type JSX } from "react";
import { Key, Copy, Trash2, CheckCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaMeta } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import api from "~/services/api";

const providerIcons: Record<string, JSX.Element> = {
  google: <FcGoogle className="w-5 h-5" />,
  meta: <FaMeta className="w-5 h-5 text-[#1877F2]" />,
};

type Integration = {
  accessToken: string;
  refreshToken?: string;
  scopes: string[];
  status: string;
  _id: string;
};

type UserIntegrations = Record<string, Integration>;

export function TokenSettings() {
  const { t } = useTranslation();
  const [integrations, setIntegrations] = useState<UserIntegrations>({});

  useEffect(() => {
    const loadIntegrations = async () => {
      try {
        const { data } = await api.get("user-integrations");
        setIntegrations(data.data || {});
      } catch (error) {
        console.error("Erro ao carregar integrações:", error);
      }
    };
    loadIntegrations();
  }, []);
  async function DeleteIntegration(provider:string) {
    try {
      const { data } = await api.delete(`user-integrations/${provider}`);
    } catch (error) {
      
    }
  }
  return (
    <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <header>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Key className="h-5 w-5 text-[var(--color-icon-default)]" />
          {t("settings.tokenSettings.title")}
        </h2>
        <p className="text-sm text-[var(--color-card-subtext)]">
          {t("settings.tokenSettings.description")}
        </p>
      </header>
      <div className="space-y-3">
        <div className="space-y-3 mb-6">
          {Object.keys(integrations).length === 0 ? (
            <p className="text-sm text-[var(--color-muted)] italic">
              {t("settings.connectedAccounts.noIntegrations", "Nenhuma conta conectada no momento.")}
            </p>
          ) : (
            Object.entries(integrations).map(([provider, integration]) => (
              <div
                key={integration._id}
                className="flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    {providerIcons[provider] ?? <CheckCircle className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium capitalize">{provider}</span>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <p className="text-slate-300 text-sm">
                      {t("settingsAgents.flowSettings.connectAccountCheck", "Conta conectada com sucesso")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded px-2 py-1 bg-transparent hover:bg-[var(--color-button-hover)] transition"
                    aria-label={t("settings.connectedAccounts.deleteTokenAriaLabel", "Desconectar conta")}
                    onClick={() => DeleteIntegration(provider)}
                  >
                    <Trash2 className="h-4 w-4 text-[var(--color-icon-error)]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
