import type { Route } from "../+types/root";
import Logo from "../assets/imgs/Logo_Camaly.png";
import LogoAlt from "../assets/imgs/Logo_Camaly(1).png";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Search,
  CircleHelp,
  CircleUserRound,
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

type HeaderProps = {
  toggleSidebar: () => void;// Função sem argumentos, usada para abrir/fechar o menu lateral
  sidebarVisible: boolean;// Valor booleano que indica se o sidebar está visível ou não
};


export default function Header({ toggleSidebar, sidebarVisible }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-5 bg-[#2A2A2A] text-white shadow border-b border-[#353535] w-full">
      <div className="flex items-center gap-2">
        {/* Logo principal troca dependendo do sidebarVisible */}
        <img
          src={sidebarVisible ? Logo : LogoAlt}
          alt="Camaly"
          className="hidden sm:block h-8 w-auto sm:h-10 md:h-12 max-w-[200px]"
        />

        {/* Logo alternativa clicável para mobile */}
        <button
          onClick={toggleSidebar}
          className="block sm:hidden"
        >
          <img
            src={LogoAlt}
            alt="Camaly Mobile"
            className="h-10 w-auto"
          />
        </button>

        {/* Botão para abrir/fechar sidebar no desktop */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer hidden sm:block"
        >
          {sidebarVisible ? (
            <ArrowLeftToLine className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
          ) : (
            <ArrowRightToLine className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
          )}
        </button>
      </div>
      
      {/* Resto do header (search, ícones) permanece igual */}
      <div className="flex-1 max-w-xl mx-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 dark:text-zinc-300" />
        <input
          type="text"
          placeholder="Search & Find new products..."
          className="w-full pl-10 pr-4 py-2 rounded-md bg-[#353535] text-white placeholder-gray-400 border border-zinc-700 outline-none"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="rounded-full p-2 hover:bg-zinc-800 hidden sm:block">
          <CircleHelp className="w-7 h-7 text-zinc-600 dark:text-zinc-300" />
        </button>
        <div>
          <CircleUserRound className="w-7 h-7 text-zinc-600 dark:text-zinc-300" />
        </div>
      </div>
    </header>
  );
}
