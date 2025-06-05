import React, { useState } from "react";
import {
  FaGoogle,
  FaFacebookF,
  FaTwitter,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { useAuth } from "~/context/auth/auth.hooks";

const loginOptions = [
  { id: "google", label: "Google", icon: <FaGoogle /> },
  { id: "facebook", label: "Facebook", icon: <FaFacebookF /> },
  { id: "twitter", label: "Twitter/X", icon: <FaTwitter /> },
  { id: "github", label: "GitHub", icon: <FaGithub /> },
  { id: "email", label: "Email/Senha", icon: <FaEnvelope /> },
  { id: "phone", label: "Telefone (SMS)", icon: <FaPhoneAlt /> },
];
interface SettingsAgentsTokensProps {
  name: string;
  id: string;
  category: string;
  avatar?: string;
  messageCount: number;
}

export function SettingsAgentsTokens({
  name,
  id,
  category,
  avatar,
  messageCount,
}: SettingsAgentsTokensProps) {
  
  const [enabledLogins, setEnabledLogins] = useState<string[]>(["google", "email"]);
  const {user} = useAuth();
  

  const toggleLoginOption = (id: string) => {
    setEnabledLogins((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

    // Função chamada ao clicar no botão de login
  function LoginOauth(provider: string) {
    
    const stateObj = {
      provider: provider,
      appUserId: user._id,
      clientId: '397816616441-u7trmpd70rgimduoatbqsjan466uehvk.apps.googleusercontent.com',
      clientSecret: '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',
      redirectUri: 'http://localhost:3000/oauth/callback',
      agent: {
        name,
        id,
        category,
        avatar,
        messageCount,
      },
      };
      const encodedState = encodeURIComponent(JSON.stringify(stateObj));
      fetch(`http://localhost:3000/oauth/start?state=${encodedState}`)
      .then(res => res.json())
      .then(({ url }) => {
        window.location.href = url;  // redireciona o navegador para o Google OAuth
      })
      .catch(console.error);
  }

  return (
    <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-default)]">
          Configurações de Integração
        </h2>
        <p className="text-sm text-[var(--color-muted)]">
          Configure as integrações e opções de login para o seu agente
        </p>
      </header>

      {/* Opções de Login */}
      <div>
        <label className="text-base font-medium text-[var(--color-text-default)] block mb-1">
          Opções de Login
        </label>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Selecione quais métodos de autenticação estarão disponíveis
        </p>
        <div className="grid grid-cols-2 gap-4">
          {loginOptions.map(({ id, label }) => (
            <label key={id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={enabledLogins.includes(id)}
                onChange={() => toggleLoginOption(id)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-[var(--color-text-default)]">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Botões OAuth estilizados igual ButtonSettings */}
      {enabledLogins.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--color-text-default)]">
            Botões de Login OAuth Ativos
          </p>
          <div className="flex flex-wrap gap-2">
            {enabledLogins.map((id) => {
              const provider = loginOptions.find((o) => o.id === id);
              if (!provider) return null;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => LoginOauth(id)}
                  className="
                    inline-flex items-center gap-2
                    rounded-md
                    px-3 py-2
                    text-white
                    text-sm
                    hover:brightness-110
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]
                    bg-[var(--color-accent)]
                    sm:px-6 sm:py-3 sm:text-base
                  "
                >
                  <span className="flex items-center justify-center h-5 w-5 sm:h-5 sm:w-5">
                    {provider.icon}
                  </span>
                  <span className="leading-none">Login com {provider.label}</span>
                </button>

              );
            })}
          </div>
        </div>
      )}

      {/* Webhook */}
      <div>
        <label
          htmlFor="webhook-url"
          className="text-sm font-medium text-[var(--color-text-default)] block mb-2"
        >
          URL de Webhook (Opcional)
        </label>
        <input
          id="webhook-url"
          type="text"
          placeholder="https://example.com/webhook"
          className="w-full rounded-md border border-gray-300 bg-white dark:bg-[var(--color-input-bg)] px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <p className="text-sm text-[var(--color-muted)] mt-1">
          URL para receber notificações de eventos do agente
        </p>
      </div>
    </section>
  );
}
