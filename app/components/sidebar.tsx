import { useEffect, useState } from "react";
import {
  CirclePlus,
  MessageCircleMore,
  Bot,
  ChartPie,
  Sun,
  Moon,
  X,
} from "lucide-react";

import { useTheme } from "../context/theme/theme.hooks"; // ajuste o caminho conforme seu projeto

type SidebarProps = {
  isMobile?: boolean;
  onClose?: () => void;
  isOpen?: boolean;
};

export default function Sidebar({
  isMobile = false,
  onClose,
  isOpen = true,
}: SidebarProps) {
  const { mode, toggleTheme } = useTheme();

  useEffect(() => {
    const html = document.documentElement;
    if (mode === "dark") {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [mode]);

  // Linguagem pode continuar local (ou você pode migrar para Redux depois)
  const [language, setLanguage] = useState<"BR" | "EN">("BR");
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "BR" ? "EN" : "BR"));
  };

  const isCollapsed = !isMobile && !isOpen;

  return (
    <aside
      className={`
        ${isMobile
          ? "fixed z-50 top-0 left-0 h-full w-64"
          : isCollapsed
          ? "w-20"
          : "w-64"}
        bg-[var(--color-bg)] text-[var(--color-text)] border-r border-[var(--color-border)] 
        p-4 flex flex-col justify-between
        transition-all duration-300 ease-in-out
        ${isMobile
          ? isOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
          : "relative"}
      `}
      style={{ pointerEvents: isMobile && !isOpen ? "none" : "auto" }}
    >
      <div>
        {isMobile && (
          <button className="ml-auto mb-4" onClick={onClose}>
            <X className="w-6 h-6 text-[var(--color-text)]" />
          </button>
        )}

        <section className="mb-8">
          {!isCollapsed && (
            <>
              <h2 className="text-xs font-semibold mb-3 text-[var(--color-muted)] tracking-wide">
                NEWS!
              </h2>
              <button
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg font-semibold shadow hover:brightness-110 transition text-white"
                style={{
                  background:
                    "linear-gradient(90deg, rgb(164,183,244), rgb(188,172,252))",
                }}
              >
                <span>New Agents</span>
                <CirclePlus className="w-5 h-5" />
              </button>
            </>
          )}
        </section>

        <section className="mb-8">
          {!isCollapsed && (
            <h2 className="text-xs font-semibold mb-3 text-[var(--color-muted)] tracking-wide">
              YOUR AGENTS
            </h2>
          )}

          {isCollapsed ? (
            <nav className="flex flex-col gap-15">
              <a
                href="#"
                className="flex items-center justify-center hover:text-[var(--color-accent)] hover:scale-105 transition rounded-lg"
              >
                <MessageCircleMore className="w-7 h-7" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center hover:text-[var(--color-accent)] hover:scale-105 transition rounded-lg"
              >
                <Bot className="w-7 h-7" />
              </a>
              <a
                href="#"
                className="flex items-center justify-center hover:text-[var(--color-accent)] hover:scale-105 transition rounded-lg"
              >
                <ChartPie className="w-7 h-7" />
              </a>
            </nav>
          ) : (
            <nav className="flex flex-col gap-3 font-normal text-xl">
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[var(--color-accent)] transition"
              >
                <MessageCircleMore className="w-6 h-6" />
                <span>Ads Creator</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-[var(--color-accent)] transition"
              >
                <Bot className="w-6 h-6" />
                <span>Concierge</span>
              </a>
            </nav>
          )}
        </section>

        <section>
          {!isCollapsed && (
            <>
              <h2 className="text-xs font-semibold mb-3 text-[var(--color-muted)] tracking-wide">
                YOUR STATS
              </h2>
              <nav className="flex flex-col gap-3 font-normal text-xl">
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-[var(--color-accent)] transition"
                >
                  <ChartPie className="w-6 h-6" />
                  <span>Stats</span>
                </a>
              </nav>
            </>
          )}
        </section>
      </div>

      <div>
        {!isCollapsed && (
          <>
            <div className="flex items-center justify-center mb-4 space-x-4">
              <div className="flex items-center space-x-2 p-1 bg-[var(--color-bg-alt)] rounded-md">
                <Sun
                  className={`w-5 h-5 ${
                    mode === "light"
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-muted)]"
                  }`}
                />
              </div>
              <button
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                  mode === "dark"
                    ? "bg-[var(--color-accent)]"
                    : "bg-[var(--color-muted)]"
                }`}
                aria-label="Toggle dark mode"
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 transform ${
                    mode === "dark" ? "translate-x-6" : ""
                  }`}
                />
              </button>
              <div className="flex items-center space-x-2 p-1 bg-[var(--color-bg-alt)] rounded-md">
                <Moon
                  className={`w-5 h-5 ${
                    mode === "dark"
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-muted)]"
                  }`}
                />
              </div>

              <button
                onClick={toggleLanguage}
                className="relative w-16 h-8 rounded-full bg-[var(--color-bg-alt)] flex items-center cursor-pointer select-none"
                aria-label="Toggle language"
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-7 h-7 rounded-full bg-white shadow-md transition-transform duration-300 transform ${
                    language === "EN" ? "translate-x-8" : ""
                  }`}
                />
                <span
                  className={`absolute left-2 top-1.5 text-xs font-semibold ${
                    language === "BR"
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-muted)]"
                  }`}
                >
                  BR
                </span>
                <span
                  className={`absolute right-2 top-1.5 text-xs font-semibold ${
                    language === "EN"
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-muted)]"
                  }`}
                >
                  EN
                </span>
              </button>
            </div>

            <div className="p-3 rounded-lg border border-[var(--color-border)] text-xs text-[var(--color-text)]">
              <p className="mb-2">100 de 2K de créditos</p>
              <div className="w-full h-2 bg-[var(--color-progress-bg)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-progress)] w-[5%]"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
