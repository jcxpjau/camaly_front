import React, { useState } from "react";
import { Code, Eye, EyeOff, Copy } from "lucide-react";

export function ApiSettings() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiLogs, setApiLogs] = useState(false);

  return (
    <section
      className="space-y-6 p-6 rounded-lg"
      style={{
        color: "var(--color-card-text)",
      }}
    >
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Code className="h-5 w-5" />
          API Settings
        </h2>
        <p
          className="text-sm"
          style={{ color: "var(--color-card-subtext)" }}
        >
          Configure your API keys and endpoints.
        </p>
      </div>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="apiEndpoint"
            className="mb-1 text-sm font-medium"
            style={{ color: "var(--color-label-text)" }}
          >
            API Endpoint
          </label>
          <input
            id="apiEndpoint"
            type="url"
            placeholder="https://api.example.com/v1"
            className="rounded-md px-3 py-2 focus:outline-none focus:ring-2"
            style={{
              backgroundColor: "var(--color-bg-input)",
              border: "1px solid var(--color-border-input)",
              color: "var(--color-text-default)",
            }}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="apiKey"
            className="mb-1 text-sm font-medium"
            style={{ color: "var(--color-label-text)" }}
          >
            API Key
          </label>
          <div className="flex gap-2 items-center">
            <input
              id="apiKey"
              type={showApiKey ? "text" : "password"}
              placeholder="sk_live_xxxxxxxxxxxx"
              className="flex-1 rounded-md px-3 py-2 focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "var(--color-bg-input)",
                border: "1px solid var(--color-border-input)",
                color: "var(--color-text-default)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              aria-label={showApiKey ? "Hide API key" : "Show API key"}
              className="rounded p-1 transition"
              style={{
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-button-bg)",
              }}
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            <button
              type="button"
              aria-label="Copy API key"
              className="rounded p-1 transition"
              style={{
                border: "1px solid var(--color-border)",
                backgroundColor: "var(--color-button-bg)",
              }}
              onClick={() => {
                navigator.clipboard.writeText(
                  (document.getElementById("apiKey") as HTMLInputElement)?.value || ""
                );
              }}
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input
            id="apiLogs"
            type="checkbox"
            checked={apiLogs}
            onChange={() => setApiLogs(!apiLogs)}
            className="h-5 w-5 rounded focus:ring-2"
            style={{
              border: "1px solid var(--color-border-input)",
              backgroundColor: "var(--color-bg-input)",
              accentColor: "var(--color-accent)",
            }}
          />
          <label
            htmlFor="apiLogs"
            className="text-sm select-none"
            style={{ color: "var(--color-card-text)" }}
          >
            Enable API Logs
          </label>
        </div>
        <button
          type="submit"
          className="inline-block rounded-md px-6 py-2 focus:outline-none focus:ring-2"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "#fff",
          }}
        >
          Save Settings
        </button>
      </form>
    </section>
  );
}
