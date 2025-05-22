import {
    ArrowLeftToLine,
    ArrowRightToLine,
    Search,
    CircleHelp,
    CircleUserRound,
    Menu,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

import Logo from "../assets/imgs/Logo_Camaly.png";
import LogoAlt from "../assets/imgs/Logo_Camaly(1).png";
import { useSideBar } from "~/context/theme/sidebar.hooks";
import { useNavigate } from "react-router";

export default function Header() {
    const {isOpen, toggleSidebar } = useSideBar();
    const [showSearchMobile, setShowSearchMobile] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Fecha a busca da lupinha no mobile ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setShowSearchMobile(false);
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
                {/* Menu Hamburguer para mobile */}
                <button
                    onClick={toggleSidebar}
                    className="block sm:hidden p-2 rounded-md hover:bg-[var(--color-bg-alt)]"
                >
                    <Menu className="w-5 h-5 text-[var(--color-muted)]" />
                </button>
                {/*Setas do desktop para alterar o comportamento da sidebar*/}
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
            {/* Logo do mobile centralizada */}
            {!showSearchMobile && (
                <div className="absolute left-1/2 -translate-x-1/2 sm:hidden">
                    <img src={LogoAlt} alt="Camaly" className="h-6 w-auto" />
                </div>
            )}
            {/* Busca para desktop*/}
            <div className="flex-1 max-w-xl mx-6 relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted)]" />
                <input
                    type="text"
                    placeholder="Search & Find new products..."
                    className="w-full pl-10 pr-4 py-2 rounded-md bg-[var(--color-bg-alt)] text-[var(--color-text)] placeholder-[var(--color-muted)] border border-[var(--color-border)] outline-none"
                />
            </div>
            {/* Right: Mobile search + Desktop actions */}
            <div className="flex items-center space-x-4">
                {/* Mobile Search Expandable */}
                <div
                    ref={searchRef}
                    className="sm:hidden relative flex items-center justify-end"
                >
                    <button
                        className="p-2 rounded-full hover:bg-[var(--color-bg-alt)] z-10"
                        onClick={() => setShowSearchMobile(true)}
                    >
                        <Search className="w-5 h-5 text-[var(--color-muted)]" />
                    </button>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className={`absolute right-0 top-1/2 -translate-y-1/2 bg-[var(--color-bg-alt)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-muted)] rounded-md px-3 py-1 transition-all duration-300 ease-in-out ${showSearchMobile ? "w-66 opacity-100" : "w-0 opacity-0"
                            }`}
                        style={{ zIndex: 5 }}
                    />
                </div>
                <button className="rounded-full p-2 hover:bg-[var(--color-bg-alt)] hidden sm:block">
                    <CircleHelp className="w-6 h-6 text-[var(--color-muted)]" />
                </button>
                <div className="hidden sm:block">
                    <CircleUserRound className="w-6 h-6 text-[var(--color-muted)]" />
                </div>
            </div>
        </header>
    );
}
