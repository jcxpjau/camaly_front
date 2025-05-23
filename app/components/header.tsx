import {
    ArrowLeftToLine,
    ArrowRightToLine,
    Search,
    CircleHelp,
    CircleUserRound,
    Menu,
    LogOut,
    Settings,
    User,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Logo from "../assets/imgs/Logo_Camaly.png";
import LogoAlt from "../assets/imgs/Logo_Camaly(1).png";
import { useSideBar } from "~/context/theme/sidebar.hooks";
import { useNavigate } from "react-router";

export default function Header() {
    const { isOpen, toggleSidebar } = useSideBar();
    const [showSearchMobile, setShowSearchMobile] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearchMobile(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowProfileMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 bg-[var(--color-bg)] text-[var(--color-text)] border-b border-[var(--color-border)] shadow w-full relative">
            <div className="flex items-center gap-2">
                <img
                    src={isOpen ? Logo : LogoAlt}
                    alt="Camaly"
                    className="hidden sm:block h-6 w-auto sm:h-7 md:h-8 max-w-[120px]"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate( "/user/home" )}
                />
                <button
                    onClick={toggleSidebar}
                    className="block sm:hidden p-2 rounded-md hover:bg-[var(--color-bg-alt)]"
                >
                    <Menu className="w-5 h-5 text-[var(--color-muted)]" />
                </button>
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-md hover:bg-[var(--color-bg-alt)] transition-colors cursor-pointer hidden sm:block"
                >
                    {isOpen ? (
                        <ArrowLeftToLine className="w-5 h-5 text-[var(--color-muted)]" />
                    ) : (
                        <ArrowRightToLine className="w-5 h-5 text-[var(--color-muted)]" />
                    )}
                </button>
            </div>

            {!showSearchMobile && (
                <div className="absolute left-1/2 -translate-x-1/2 sm:hidden">
                    <img src={LogoAlt} alt="Camaly" className="h-6 w-auto" />
                </div>
            )}

            <div className="flex-1 max-w-xl mx-6 relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted)]" />
                <input
                    type="text"
                    placeholder="Search & find new products..."
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-[var(--color-bg-alt)] text-[var(--color-text)] placeholder-[var(--color-muted)] border border-[var(--color-border)] outline-none"
                />
            </div>

            <div className="flex items-center space-x-4">
                <div ref={searchRef} className="sm:hidden relative flex items-center justify-end">
                    <button
                        className="p-2 rounded-full hover:bg-[var(--color-bg-alt)] z-10"
                        onClick={() => setShowSearchMobile(true)}
                    >
                        <Search className="w-5 h-5 text-[var(--color-muted)]" />
                    </button>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={`absolute right-0 top-1/2 -translate-y-1/2 bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-muted)] rounded-md px-3 py-1 transition-all duration-300 ease-in-out ${showSearchMobile ? "w-66 opacity-100" : "w-0 opacity-0"}`}
                        style={{ zIndex: 5 }}
                    />
                </div>

                <button className="rounded-full p-2 hover:bg-[var(--color-bg-alt)] hidden sm:block">
                    <CircleHelp className="w-6 h-6 text-[var(--color-muted)]" />
                </button>

                {/* Profile + Submenu */}
                <div className="relative hidden sm:block" ref={profileRef}>
                    <button
                        onClick={() => setShowProfileMenu((prev) => !prev)}
                        className="p-2 rounded-full hover:bg-[var(--color-bg-alt)] transition"
                    >
                        <CircleUserRound className="w-6 h-6 text-[var(--color-muted)]" />
                    </button>
                    <AnimatePresence>
                        {showProfileMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-48 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-md shadow-lg z-50"
                            >
                                <ul className="py-1 text-sm text-[var(--color-text)]">
                                    <li>
                                        <a href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--color-bg)]">
                                            <User className="w-4 h-4" /> My Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--color-bg)]">
                                            <Settings className="w-4 h-4" /> Settings
                                        </a>
                                    </li>
                                    <li>
                                        <button className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-[var(--color-bg)]">
                                            <LogOut className="w-4 h-4" /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
