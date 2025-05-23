import { useEffect, useState, useRef } from "react";
import {
    CirclePlus,
    MessageCircleMore,
    Bot,
    ChartPie,
    Sun,
    Moon,
    X,
} from "lucide-react";
import type { RootState } from "../store";
import { useTheme } from "../context/theme/theme.hooks";
import { useLanguage } from "~/context/language/language.hooks";
import { useSideBar } from "~/context/theme/sidebar.hooks";
import useIsMobile from "~/hooks/useIsMobile";
import { useTranslation } from "react-i18next";
import { useCustomNavigate } from "~/hooks/useCustomNavigate";



export default function Sidebar() {
    const { mode, toggleTheme } = useTheme();
    const { language, changeLanguage } = useLanguage();
    const isMobile = useIsMobile();
    const { isOpen, toggleSidebar } = useSideBar();
    const { t } = useTranslation();
    const navigate = useCustomNavigate();

    const isCollapsed = !isMobile && !isOpen;

    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        if (isMobile && isOpen) {
            toggleSidebar();
        }
    }, [isMobile]);

    return (
        <aside
            className={`
      /* Mobile (<=768px) */
      ${isMobile ? `
        fixed z-50 top-0 left-0 h-full w-64
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
        p-4
      ` : `
      
      /* Desktop (>768px) */
        relative
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-10 p-1.5" : "w-64 p-4"}
      `}

      /* Estilos comuns */
      bg-[var(--color-bg)] text-[var(--color-text)]
      border-r border-[var(--color-border)]
      flex flex-col justify-between
    `}
            style={{ pointerEvents: isMobile && !isOpen ? "none" : "auto" }}
        >
            <div>
                {isMobile && (
                    <button className="ml-auto mb-4" onClick={toggleSidebar}>
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
                                    background: "linear-gradient(90deg, rgb(164,183,244), rgb(188,172,252))",
                                }}
                                onClick={(e) => navigate(e, '/user/marketplace')}
                            >
                                <span>{t('agent')}</span>
                                <CirclePlus className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </section>
                <section className="mb-8">
                    {!isCollapsed && (
                        <h2 className="text-xs font-semibold mb-3 text-[var(--color-muted)] tracking-wide">
                            {t('your-agents')}
                        </h2>
                    )}
                    {isCollapsed ? (
                        <nav className="flex flex-col gap-5">
                            <a
                                href="#"
                                onClick={(e) => navigate(e, "/user/marketplace")}
                                className="flex items-center justify-center hover:text-[var(--color-accent)] hover:scale-110 transition-transform rounded-lg"
                            >
                                <MessageCircleMore className="w-10 h-10" />
                            </a>
                            <a
                                href="#"
                                onClick={(e) => navigate(e, "/user/home")}
                                className="flex items-center justify-center hover:text-[var(--color-accent)] hover:scale-110 transition-transform rounded-lg"
                            >
                                <Bot className="w-10 h-10" />
                            </a>
                            <a
                                href="#"
                                onClick={(e) => navigate(e, "/user/concierge")}
                                className="flex items-center justify-center hover:text-[var(--color-accent)] hover:scale-110 transition-transform rounded-lg"
                            >
                                <ChartPie className="w-10 h-10" />
                            </a>
                        </nav>
                    ) : (
                        <nav className="flex flex-col gap-3 font-normal text-sm">
                            <a href="#" onClick={(e) => navigate(e, "/user/marketplace")} className="flex items-center gap-2 hover:text-[var(--color-accent)] transition">
                                <MessageCircleMore className="w-6 h-6" />
                                <span>{t("creator")}</span>
                            </a>
                            <a href="#" onClick={(e) => navigate(e, "/user/home")} className="flex items-center gap-2 hover:text-[var(--color-accent)] transition">
                                <Bot className="w-6 h-6" />
                                <span>{t('concierge')}</span>
                            </a>
                        </nav>
                    )}
                </section>
                {!isCollapsed && (
                    <section>
                        <h2 className="text-xs font-semibold mb-3 text-[var(--color-muted)] tracking-wide">
                            {t('your-stats')}
                        </h2>
                        <nav className="flex flex-col gap-3 font-normal text-sm">
                            <a href="#" onClick={(e) => navigate(e, "/user/concierge")} className="flex items-center gap-2 hover:text-[var(--color-accent)] transition">
                                <ChartPie className="w-6 h-6" />
                                <span>{t('stats')}</span>
                            </a>
                        </nav>
                    </section>
                )}
            </div>
            {!isCollapsed && (
                <div>
                    <div className="flex items-center justify-center mb-4 gap-4">
                        <div className="flex items-center gap-2">
                            <Sun className={`w-5 h-5 ${mode === "light" ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"}`} />
                            <button
                                onClick={toggleTheme}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-300 flex items-center ${mode === "dark" ? "bg-[var(--color-accent)]" : "bg-[var(--color-muted)]"
                                    }`}
                                aria-label="Toggle dark mode"
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 transform ${mode === "dark" ? "translate-x-6" : ""
                                        }`}
                                />
                            </button>
                            <Moon className={`w-5 h-5 ${mode === "dark" ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"}`} />
                        </div>
                        <button
                            onClick={() => changeLanguage((language == 'pt') ? 'en' : 'pt')}
                            className="relative w-20 h-8 rounded-full bg-[var(--color-bg-alt)] flex items-center justify-between px-2"
                            aria-label="Toggle language"
                        >
                            <div
                                className={`absolute top-0.5 left-0.5 w-7 h-7 rounded-full bg-white shadow-md transition-transform duration-300 transform ${language === "en" ? "translate-x-[3.125rem]" : ""
                                    }`}
                            />
                            <span
                                className={`z-10 text-xs font-semibold ${language === "pt" ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"
                                    }`}
                            >
                                BR
                            </span>
                            <span
                                className={`z-10 text-xs translate-x-0.5 font-semibold ${language === "en" ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"
                                    }`}
                            >EN
                            </span>
                        </button>
                    </div>
                    <div className="p-3 rounded-lg border border-[var(--color-border)] text-xs text-[var(--color-text)]">
                        <p className="mb-2">100 / 2K {t('credits')}</p>
                        <div className="w-full h-2 bg-[var(--color-progress-bg)] rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--color-progress)] w-[5%]" />
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}
