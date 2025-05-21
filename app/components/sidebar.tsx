import { useState } from "react";
import {
  CirclePlus,
  MessageCircleMore,
  Bot,
  ChartPie,
  Sun,
  Moon,
  X,
} from "lucide-react";

type SidebarProps = {
  isMobile?: boolean;          // Se é dispositivo móvel (opcional)
  onClose?: () => void;        // Função para fechar sidebar no mobile (opcional)
  isOpen?: boolean;            // Controla se o sidebar está aberto (opcional)
};

export default function Sidebar({ isMobile = false, onClose, isOpen = true }: SidebarProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<"BR" | "EN">("BR");

  // Define as classes base dependendo se for mobile ou desktop
  const baseClasses = isMobile
    ? `fixed z-50 top-0 left-0 h-full w-64 bg-[#2A2A2A] p-4 text-white border-r border-[#353535] flex flex-col justify-between`
    : `hidden md:flex flex-col justify-between bg-[#2A2A2A] p-4 text-white border-r border-[#353535] w-64`;

  // Função para alternar idioma
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "BR" ? "EN" : "BR"));
  };

  return (
    <aside
      className={`
        ${baseClasses}
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} 
        ${isMobile ? "fixed" : isOpen ? "relative" : "absolute"} 
      `}
      style={{ pointerEvents: isMobile && !isOpen ? "none" : "auto" }}
    >
      <div>
        {/* Botão fechar só aparece no mobile */}
        {isMobile && (
          <button className="ml-auto mb-4" onClick={onClose}>
            <X className="w-6 h-6 text-white" />
          </button>
        )}

        <section className="mb-8">
          <h2 className="text-xs font-semibold mb-3 text-zinc-400 tracking-wide">NEWS!</h2>
          <button
            className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-white font-semibold shadow hover:brightness-110 transition"
            style={{
              background: `linear-gradient(90deg, rgb(164,183,244), rgb(188,172,252))`,
            }}
          >
            <span>New Agents</span>
            <CirclePlus className="w-5 h-5" />
          </button>
        </section>

        <section className="mb-8">
          <h2 className="text-xs font-semibold mb-3 text-zinc-400 tracking-wide">YOUR AGENTS</h2>
          <nav className="flex flex-col gap-3 text-white font-normal text-md">
            <a href="#" className="flex items-center gap-2 hover:text-indigo-400 transition">
              <MessageCircleMore className="w-5 h-5" />
              Ads Creator
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-indigo-400 transition">
              <Bot className="w-5 h-5" />
              Concierge
            </a>
          </nav>
        </section>

        <section>
          <h2 className="text-xs font-semibold mb-3 text-zinc-400 tracking-wide">YOUR STATS</h2>
          <nav className="flex flex-col gap-3 text-white font-normal text-md">
            <a href="#" className="flex items-center gap-2 hover:text-indigo-400 transition">
              <ChartPie className="w-5 h-5" />
              Stats
            </a>
          </nav>
        </section>
      </div>

      <div>
        {/* Controle de tema claro/escuro */}
        <div className="flex items-center justify-center mb-4 space-x-4">
          <div className="flex items-center space-x-2 p-1 bg-zinc-800 rounded-md">
            <Sun className={`w-5 h-5 ${!darkMode ? "text-indigo-300 fill-indigo-300" : "text-zinc-400"}`} />
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              darkMode ? "bg-indigo-500" : "bg-zinc-500"
            }`}
            aria-label="Toggle dark mode"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 transform ${
                darkMode ? "translate-x-6" : ""
              }`}
            />
          </button>
          <div className="flex items-center space-x-2 p-1 bg-zinc-800 rounded-md">
            <Moon className={`w-5 h-5 ${darkMode ? "text-indigo-300 fill-indigo-300" : "text-zinc-400"}`} />
          </div>

          {/* Toggle de idioma */}
          <button
            onClick={toggleLanguage}
            className="relative w-16 h-8 rounded-full bg-zinc-700 flex items-center cursor-pointer select-none"
            aria-label="Toggle language"
          >
            <div
              className={`absolute top-0.5 left-0.5 w-7 h-7 rounded-full bg-white shadow-md transition-transform duration-300 transform ${
                language === "EN" ? "translate-x-8" : ""
              }`}
            />
            <span
              className={`absolute left-2 top-1.5 text-xs font-semibold ${
                language === "BR" ? "text-indigo-500" : "text-zinc-400"
              }`}
            >
              BR
            </span>
            <span
              className={`absolute right-2 top-1.5 text-xs font-semibold ${
                language === "EN" ? "text-indigo-500" : "text-zinc-400"
              }`}
            >
              EN
            </span>
          </button>
        </div>

        {/* Barra de créditos */}
        <div className="p-3 rounded-lg border border-zinc-600 text-xs text-zinc-200">
          <p className="mb-2">100 de 2K de créditos</p>
          <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
            <div className="h-full bg-zinc-300 w-[5%]"></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
