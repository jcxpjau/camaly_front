import React, { useEffect, useState } from "react";
import {
  FaGoogle,
  FaTwitter,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { useAuth } from "~/context/auth/auth.hooks";
import api from "~/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { FaMeta } from "react-icons/fa6";
import { useSearchParams } from "react-router";

const loginOptions = [
  { id: "google", label: "Google", icon: <FaGoogle /> },
  { id: "meta", label: "Meta", icon: <FaMeta /> },
  { id: "twitter", label: "Twitter/X", icon: <FaTwitter /> },
  { id: "github", label: "GitHub", icon: <FaGithub /> },
  { id: "email", label: "Email/Password", icon: <FaEnvelope /> },
  { id: "phone", label: "Phone (SMS)", icon: <FaPhoneAlt /> },
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
  const [successProvider, setSuccessProvider] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const { user } = useAuth();
  
  const toggleLoginOption = (id: string) => {
    setEnabledLogins((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  async function LoginOauth(provider: string) {
    try {
      const stateObj = {
        provider,
        appUserId: user._id,
        agent: {
          name,
          id,
          category,
          avatar,
          messageCount,
        },
      };

      const encodedState = encodeURIComponent(JSON.stringify(stateObj));

      const res = await api.get(`/oauth/start?state=${encodedState}`);
      window.location.href = res.data.url;
    } catch (err) {
      console.error("Error starting OAuth:", err);
    }
  }

  useEffect(() => {
    const success = searchParams.get("success");
    if (success) {
      setSuccessProvider(success.charAt(0).toUpperCase() + success.slice(1));
      // remove da URL após 3s (opcional)
      setTimeout(() => {
        searchParams.delete("success");
        setSearchParams(searchParams);
      }, 3000);
    }
  }, [searchParams, setSearchParams]);
  
  return (
    <section className="space-y-6 rounded-lg" style={{ color: "var(--color-card-text)" }}>
      {successProvider && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="mb-4 flex items-center gap-2 rounded-md bg-green-100 px-4 py-2 text-sm text-green-800 dark:bg-green-800 dark:text-green-100"
      >
        <Check className="w-4 h-4" />
        <span>Connection with {successProvider} was successful!</span>
      </motion.div>
    )}
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-default)]">
          Integration Settings
        </h2>
        <p className="text-sm text-[var(--color-muted)]">
          Configure integrations and login options for your agent
        </p>
      </header>
      <div>
        <label className="text-base font-medium text-[var(--color-text-default)] block mb-1">
          Login Options
        </label>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          Select which authentication methods will be available
        </p>
        <div className="grid grid-cols-2 gap-4">
          {loginOptions.map(({ id, label, icon }) => {
            const checked = enabledLogins.includes(id);

            return (
              <label
                key={id}
                className="flex items-center space-x-2 cursor-pointer select-none"
                onClick={() => toggleLoginOption(id)}
                role="checkbox"
                aria-checked={checked}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    toggleLoginOption(id);
                  }
                }}
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
                <span className="text-sm text-[var(--color-text-default)] flex items-center gap-2">
                  {icon}
                  {label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {enabledLogins.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--color-text-default)]">
            Active OAuth Login Buttons
          </p>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {enabledLogins.map((id) => {
                const provider = loginOptions.find((o) => o.id === id);
                if (!provider) return null;
                return (
                  <motion.button
                    key={id}
                    type="button"
                    onClick={() => LoginOauth(id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
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
                    <span className="leading-none">Login with {provider.label}</span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      <div>
        <label
          htmlFor="webhook-url"
          className="text-sm font-medium text-[var(--color-text-default)] block mb-2"
        >
          Webhook URL (Optional)
        </label>
        <input
          id="webhook-url"
          type="text"
          placeholder="https://example.com/webhook"
          className="w-full rounded-md border border-gray-300 bg-white dark:bg-[var(--color-input-bg)] px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <p className="text-sm text-[var(--color-muted)] mt-1">
          URL to receive agent event notifications
        </p>
      </div>
    </section>
  );
}
