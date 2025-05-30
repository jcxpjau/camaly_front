// PopupRoot.tsx
import type { ReactNode } from "react";
import { X } from "lucide-react";
import "./popUpAction.css";

type RootProps = {
  children: ReactNode;
  onClose: () => void;
};

const PopupRoot = ({ children, onClose }: RootProps) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto">
      <div className="relative bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl px-8 py-10 w-[40vw] h-[30vh] flex flex-col">

        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupRoot;
