import React from "react";
import { Key, Plus, Copy, Trash2 } from "lucide-react";
import ButtonSettings from "./buttonSettings";
import { useTranslation } from "react-i18next";

const tokens = [
  {
    id: "1",
    name: "Main Token",
    value: "abcd-1234-efgh-5678",
    created: "2024-01-01",
  },
  {
    id: "2",
    name: "Backup Token",
    value: "ijkl-9012-mnop-3456",
    created: "2024-02-10",
  },
];

export function TokenSettings() {
  const { t } = useTranslation();

  return (
    <section  className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <header>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Key className="h-5 w-5 text-[var(--color-icon-default)]" />
          {t("settings.tokenSettings.title")}
        </h2>
        <p className="text-sm text-[var(--color-card-subtext)]">
          {t("settings.tokenSettings.description")}
        </p>
      </header>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{t("settings.tokenSettings.activeTokensTitle")}</h3>
          <ButtonSettings text={t("settings.tokenSettings.buttons.newToken")} icon={Plus} />
        </div>
        <div className="space-y-3">
          {tokens.map((token) => (
            <div
              key={token.id}
              className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-bg-alt)] border border-[var(--color-border)]"
            >
              <div>
                <div className="font-medium">{token.name}</div>
                <div className="text-sm text-[var(--color-muted)]">
                  {token.value} • {t("settings.tokenSettings.token.createdOn")} {token.created}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded px-2 py-1 border border-[var(--color-border)] bg-[var(--color-button-bg)] hover:bg-[var(--color-button-hover)] transition"
                  aria-label={t("settings.tokenSettings.buttons.copyTokenAriaLabel")}
                  onClick={() => navigator.clipboard.writeText(token.value)}
                >
                  <Copy className="h-4 w-4 text-[var(--color-icon-default)]" />
                </button>
                <button
                  type="button"
                  className="rounded px-2 py-1 border border-[var(--color-border)] bg-[var(--color-button-bg)] hover:bg-[var(--color-button-hover)] transition"
                  aria-label={t("settings.tokenSettings.buttons.deleteTokenAriaLabel")}
                >
                  <Trash2 className="h-4 w-4 text-[var(--color-icon-error)]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
