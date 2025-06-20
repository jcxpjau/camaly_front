import { useEffect, useState, useRef } from "react";
import {
    CirclePlus,
    MessageCircleMore,
    Bot,
    ChartPie,
    Sun,
    Moon,
    X,
    ShoppingBag,
    CircleUserRound,
    PersonStandingIcon,
    Settings
} from "lucide-react";
import type { RootState } from "../store";
import { useTheme } from "../context/theme/theme.hooks";
import { useLanguage } from "~/context/language/language.hooks";
import { useSideBar } from "~/context/theme/sidebar.hooks";
import useIsMobile from "~/hooks/useIsMobile";
import { useTranslation } from "react-i18next";
import { useCustomNavigate } from "~/hooks/useCustomNavigate";
import { useAuth } from "~/context/auth/auth.hooks";
import api from "~/services/api";

interface Purchase {
    _id: string;
    productId: string;
    name: string;
}

export default function Sidebar() {
    const {user} = useAuth();
    const { mode, toggleTheme } = useTheme();
    const { language, changeLanguage } = useLanguage();
    const isMobile = useIsMobile();
    const { isOpen, toggleSidebar, changeSidebar } = useSideBar();
    const { t } = useTranslation();
    const [purchases, setPurchases] = useState<any[]>([]);
    const navigate = useCustomNavigate();

    const isCollapsed = !isMobile && !isOpen;

    useEffect(() => {
        if (isMobile && isOpen) {
            changeSidebar(false);
        } else {
            changeSidebar(true);
        }
    }, [isMobile]);

    const [showContent, setShowContent] = useState(!isCollapsed);

    useEffect(() => {
        if (!isCollapsed) {
            const timer = setTimeout(() => setShowContent(true), 200);
            return () => clearTimeout(timer);
        } else {
            setShowContent(false);
        }
    }, [isCollapsed]);


    useEffect(() => {
        if (!user) {
            return;
        }
        const fetchProducts = async () => {
            try {
                const res = await api.get(`purchases/user/${user._id}`);
                const json = res.data;
                const mappedData: Purchase[] = json
                    .filter((item: { productId: null }) => item.productId !== null)
                    .map((item: any) => ({
                        _id: item._id,
                        productId: item.productId._id,
                        name: item.productId.name,
                    }));

                setPurchases(mappedData);
            } catch (err: any) {
                // /console.log(err);
            }
        };
        fetchProducts();
    }, [user]);


    return (
        <aside
            className={`
        ${isMobile ? `
            fixed z-50 top-0 left-0 h-full w-64
            transition-transform duration-500 ease-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            opacity-100
            p-4
        ` : `
            relative
            transition-all duration-500 ease-in-out
            ${isCollapsed ? "w-16 p-4" : "w-64 p-4"}
        `}
        bg-[var(--color-bg)] text-[var(--color-text)]
        border-r border-[var(--color-border)]
        flex flex-col justify-between
    `}
            style={{ willChange: "transform" }}
        >
            <div className="flex flex-col">
                {isMobile && (
                    <button className="ml-auto mb-4" onClick={toggleSidebar}>
                        <X className="w-6 h-6 text-[var(--color-text)]" />
                    </button>
                )}

                <section
                    className={`
                transition-opacity duration-300
                ${isCollapsed ? "opacity-0 pointer-events-none h-0 overflow-hidden" : "opacity-100"}
            `}
                >
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
                    <nav className="flex flex-col gap-3 mt-8 font-normal text-sm">
                       {purchases.map((purchase) => (
                        <button
                            className="flex items-center gap-2 hover:text-[var(--color-accent)] transition"
                            onClick={(e) => {
                            navigate(e, `/user/settingsagents/${purchase.productId}`);
                            }}
                            >
                                <Bot className="w-6 h-6" />
                                <span>{purchase.name}</span> 
                        </button>
                        ))}
                    </nav>
                </section>
                {isCollapsed && (
                    <nav className="flex flex-col h-50 gap-5">
                        <a
                            href="#"
                            onClick={(e) => navigate(e, "/user/marketplace")}
                            className="flex items-center w-full px-1 py-1 rounded-lg shadow justify-center hover:text-[var(--color-accent)] hover:scale-110 transition rounded-lg"
                            style={{
                                background: "linear-gradient(90deg, rgb(164,183,244), rgb(188,172,252))",
                                color: "white"
                            }}
                        >
                            <CirclePlus className="w-6 h-6" />
                        </a>
                        {purchases.map((purchase) => (
                            <button
                                className="flex items-center gap-2 hover:text-[var(--color-accent)] transition"
                                onClick={(e) => {
                                navigate(e, `/user/settingsagents/${purchase.productId}`);
                                }}
                                >
                                    <Bot className="w-6 h-6" />
                            </button>
                            ))}
                    </nav>
                )}
            </div>
            <div className="flex flex-col">
                {isCollapsed && (
                    <nav className="flex flex-col justify-end h-50 gap-5">
                        <a
                            href="#"
                            onClick={(e) => navigate(e, "/user/marketplace")}
                            className="flex items-center justify-center hover:text-[var(--color-accent)] hover:scale-110 transition-transform rounded-lg"
                        >
                            <ShoppingBag className="w-6 h-6" />
                        </a>
                        <a
                            href="#"
                            onClick={(e) => navigate(e, "/user/reports")}
                            className="flex items-center justify-center hover:text-[var(--color-accent)] hover:scale-110 transition-transform rounded-lg"
                        >
                            <ChartPie className="w-6 h-6" />
                        </a>
                        <a
                            href="#"
                            onClick={(e) => navigate(e, "/user/settings")}
                            className="flex items-center justify-center hover:text-[var(--color-accent)] hover:scale-110 transition-transform rounded-lg"
                        >
                            <Settings className="w-6 h-6" />
                        </a>
                    </nav>
                )}
                {showContent && (
                    <>
                        <nav className="flex flex-col gap-3 mb-8 font-normal text-sm">
                            <a href="#" onClick={(e) => navigate(e, "/user/marketplace")} className="flex items-center gap-2 hover:text-[var(--color-accent)] transition">
                                <ShoppingBag className="w-6 h-6" />
                                <span>{t('Marketplace')}</span>
                            </a>
                            <a href="#" onClick={(e) => navigate(e, "/user/reports")} className="flex items-center gap-2 hover:text-[var(--color-accent)] transition">
                                <ChartPie className="w-6 h-6" />
                                <span>{t('Reports')}</span>
                            </a>
                            {isMobile &&
                                <a href="#" onClick={(e) => navigate(e, "/user/settings")} className="flex items-center gap-2 hover:text-[var(--color-accent)] transition">
                                    <CircleUserRound className="w-6 h-6" />
                                    <span>{t('Profile')}</span>
                                </a>
                            }
                        </nav>
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
                                onClick={() => changeLanguage(language == "pt" ? "en" : "pt")}
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
                                >
                                    EN
                                </span>
                            </button>
                        </div>
                        <div className="p-3 rounded-lg border border-[var(--color-border)] text-xs text-[var(--color-text)]">
                            <p className="mb-2">100 / 2K {t('credits')}</p>
                            <div className="w-full h-2 bg-[var(--color-progress-bg)] rounded-full overflow-hidden">
                                <div className="h-full bg-[var(--color-progress)] w-[5%]" />
                            </div>
                        </div>
                    </>
                )}
            </div>

        </aside>
    );
}
